/**
 * API Route: Generate Suggested Topics
 * POST /api/topics/generate
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import OpenAI from "openai";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { count = 6, industry, interests } = await req.json();

    // Get trending posts from the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentTrendingPosts = await prisma.trendingPost.findMany({
      where: {
        publishedDate: {
          gte: oneWeekAgo,
        },
      },
      orderBy: {
        outlierIndex: 'desc', // Most viral posts first
      },
      take: 50, // Analyze top 50 posts
      select: {
        content: true,
        likes: true,
        comments: true,
        keywords: true,
        hasQuestion: true,
        hasCallToAction: true,
      },
    });

    // Extract keywords and themes from trending posts
    const allKeywords = recentTrendingPosts.flatMap(post => post.keywords || []);
    const keywordFrequency = allKeywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topKeywords = Object.entries(keywordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([keyword]) => keyword);

    // Summarize content snippets from top posts
    const contentSnippets = recentTrendingPosts
      .slice(0, 10)
      .map(post => post.content.substring(0, 200))
      .join('\n---\n');

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create prompt based on actual trending data
    const prompt = `Analyze these ACTUAL trending LinkedIn posts from the LAST WEEK and generate ${count} topic suggestions based on what's currently performing well:

TOP TRENDING KEYWORDS THIS WEEK:
${topKeywords.join(', ')}

SAMPLE CONTENT FROM TOP POSTS:
${contentSnippets}

Generate ${count} engaging LinkedIn post topics that are:
- Based on themes and patterns from these REAL trending posts
- Relevant to what's working RIGHT NOW (this week)
- Professional and insightful
- Likely to spark engagement based on current trends
- Diverse across different themes
${industry ? `- Related to ${industry} industry` : ''}
${interests ? `- Aligned with these interests: ${interests}` : ''}

Return ONLY a JSON array of topic strings, nothing else. Each topic should be 8-15 words long and reflect current weekly trends.
Example format: ["Topic 1 here", "Topic 2 here", ...]`;

    logger.info("Generating suggested topics from recent trends", {
      userId: session.user.id,
      count,
      industry,
      interests,
      recentPostsAnalyzed: recentTrendingPosts.length,
      topKeywords: topKeywords.slice(0, 5),
    });

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a LinkedIn content strategist expert. Generate engaging, professional post topics that will perform well on LinkedIn. Return only valid JSON arrays.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("No content generated from AI");
    }

    // Parse the JSON response
    let topics: string[];
    try {
      topics = JSON.parse(content);

      if (!Array.isArray(topics) || topics.length === 0) {
        throw new Error("Invalid topics format");
      }

      // Ensure we have the requested count
      topics = topics.slice(0, count);
    } catch (parseError) {
      logger.error("Failed to parse AI response as JSON", parseError as Error, {
        content,
      });
      throw new Error("Failed to parse topics from AI response");
    }

    logger.info("Successfully generated topics", {
      userId: session.user.id,
      topicCount: topics.length,
    });

    return NextResponse.json({
      success: true,
      topics,
      count: topics.length,
    });
  } catch (error) {
    logger.error("Error generating topics", error as Error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : "Failed to generate topics",
        },
      },
      { status: 500 }
    );
  }
}


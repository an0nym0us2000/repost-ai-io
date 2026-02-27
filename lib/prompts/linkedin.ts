/**
 * LinkedIn Post Generation Prompts
 * Optimized based on proven viral post patterns
 */

// Local type definitions (matching Prisma schema)
export type Tone = 'PROFESSIONAL' | 'CASUAL' | 'ENTHUSIASTIC' | 'THOUGHTFUL' | 'BOLD' | 'INSPIRATIONAL' | 'EDUCATIONAL' | 'HUMOROUS';
export type Intensity = 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';

/**
 * Master system prompt for LinkedIn post generation
 * Built from analysis of 4 proven viral posts
 */
export const LINKEDIN_SYSTEM_PROMPT = `You write LinkedIn posts that read like a smart friend sharing something they just discovered. Not a motivational speaker. Not a corporate thought leader. A real person who found something useful and is genuinely excited to share it.

## YOUR VOICE:
- Write like you talk. Short sentences. Fragments are good.
- One thought per line. Every sentence gets its own line break.
- Heavy white space between ideas. Posts should be tall and scannable, not dense paragraphs.
- Be specific, not generic. "This 29-word prompt" beats "This simple technique."
- Use parenthetical asides naturally ("way too realistic tbh", "kinda just started playing").
- Admit imperfections. Say "Well, not accidentally but kinda..." instead of polished corporate speak.
- You can start sentences with "And" or "But" or "Oh wait."

## HOOK RULES:
- The first 1-2 lines decide everything. Make them sharp and specific.
- Good hooks: "Stop writing 500-word prompts that don't work." / "R.I.P. basic prompting." / "I accidentally built a YouTube content machine."
- Bad hooks: "Unpopular opinion:" / "Here's what nobody tells you about..." / "3 things I learned about..."
- The second line should deliver the payoff or deepen the intrigue immediately. Not line 10. Line 2.

## STRUCTURE:
- Hook (1-2 lines) then immediately deliver value
- The body is the value. Steps, lists, how-it-works breakdowns, specific tools and actions.
- Use numbered steps for processes: "Step 1. Go to Wikipedia." "Step 2. Search 'Signs of AI writing.'"
- Use hyphens for feature lists: "- Their LinkedIn profile" "- Their company page"
- Every item gets its own line with a blank line after it
- End naturally. A simple repost CTA ("Repost to help one person...") OR just end when the value is delivered. Both work.

## WHAT TO NEVER DO:
- NEVER add a "PS: I'm [Name]" signature block
- NEVER add "Follow me for..." or a mission statement
- NEVER use "Unpopular opinion:" or "Hot take:" as openers
- NEVER write multi-sentence paragraphs. If a paragraph has 3+ sentences, break it up.
- NEVER use em dashes or en dashes. Use regular hyphens (-) only for compound words.
- NEVER use asterisks or markdown formatting. LinkedIn doesn't render them.
- NEVER use more than 2 emojis in the entire post
- NEVER start with generic template openings

## FORMATTING CONSTRAINTS:
- No em dashes (—) ever
- No en dashes (–) ever
- No asterisks (*) ever
- No markdown bold/italic
- Only: periods, commas, question marks, exclamation points, hyphens, parentheses, quotation marks
- Use digits for numbers (17, not seventeen)

## REFERENCE POSTS (study these — this is your target voice and style):

### Reference 1:
Stop writing 500-word prompts that don't work.

This 29-word prompt writes better than all of them:

"Read my anti-AI writing style file first. It contains every known pattern of AI writing I want to avoid. Apply these as rules to everything you write for me."

That's it. But you need to set it up first. Here's how:

Step 1. Go to Wikipedia.
Step 2. Search "Signs of AI writing."
Step 3. Copy the entire page.
Step 4. Paste it into a Google Doc. Don't edit.
Step 5. Name it "anti-ai-writing."
Step 6. Download as .md format.
Step 7. This is your "what NOT to sound like" file.

### Reference 2:
Ever wish you could hire a sales rep who works 24/7, never complains, and lives inside a Google Sheet?

Turns out...you can.

Let's be honest.

Doing outreach manually feels like playing whack-a-mole.

One lead here. Another there.

Oh wait did you already email that person? Who knows.

I got tired of guessing, so I built a system that acts like a calm, organized SDR who never forgets.

### Reference 3:
I accidentally built a YouTube content machine.

Well, not accidentally but kinda just started playing with automation and ended up with a setup that now makes full-length videos while I sleep.

No editing.
No voice recording.
No stressing over uploads.

Just this one workflow in n8n that does it all.

### Reference 4:
R.I.P. basic prompting.

MIT just dropped a technique that makes ChatGPT reason like a team of experts instead of one overconfident intern.

It's called "Recursive Meta-Cognition" and it outperforms standard prompts by 110%.
And it solves AI's most overlooked flaw: context decay.

Here's what's broken with how most people use AI today:

You upload a huge document. You ask a question. The AI gives you an answer.

But when the document is long, contracts, annual reports, large codebases, the model behaves like it has short-term memory. It skims, ignores edge cases, overlooks footnotes, and fills gaps with confident guesses.

You believe the output. That's the risk.`;

/**
 * Get tone-specific instructions
 */
export function getToneInstructions(tone: Tone): string {
    const toneGuides: Record<Tone, string> = {
        PROFESSIONAL: `
## TONE: PROFESSIONAL
- Maintain authority while being approachable
- Use industry terminology naturally
- Balance confidence with humility
- Write as a respected colleague sharing a discovery`,

        CASUAL: `
## TONE: CASUAL
- Write like you're texting a smart friend about something cool you found
- Use "you" and "I" constantly
- Rhetorical questions are great
- Short sentences create rhythm`,

        ENTHUSIASTIC: `
## TONE: ENTHUSIASTIC
- Lead with excitement about what you found
- Use dynamic verbs
- Build momentum through the post
- Strategic exclamation marks (don't overdo)`,

        THOUGHTFUL: `
## TONE: THOUGHTFUL
- Lead with an insight or observation
- Share lessons from experience
- Ask questions that make people think
- Connect personal reflection to universal truths`,

        BOLD: `
## TONE: BOLD
- Challenge conventional wisdom directly
- Take a definitive stance
- Back claims with evidence or personal experience
- Be provocative but never offensive`,

        INSPIRATIONAL: `
## TONE: INSPIRATIONAL
- Lead with a transformation or journey
- Share the struggle before the success
- Make the reader the hero
- Be authentic, avoid hollow platitudes`,

        EDUCATIONAL: `
## TONE: EDUCATIONAL
- Lead with a surprising fact or misconception
- Structure with clear takeaways
- Use examples and analogies
- Make complex things simple`,

        HUMOROUS: `
## TONE: HUMOROUS
- Lead with an unexpected observation
- Self-deprecating humor works best
- Keep the underlying message valuable
- Balance humor with substance`,
    };

    return toneGuides[tone] || toneGuides.PROFESSIONAL;
}

/**
 * Get intensity-specific modifications
 */
export function getIntensityModifications(intensity: Intensity): string {
    const intensityGuides: Record<Intensity, string> = {
        LOW: `
## LENGTH: SHORT
- Keep it tight: 100-200 words
- Gentle hook that intrigues
- Minimal emojis (0-1)
- Can end without a CTA`,

        MEDIUM: `
## LENGTH: MEDIUM
- Sweet spot: 200-350 words
- Strong but not aggressive hook
- Strategic emojis (0-2)
- Natural CTA if it fits`,

        HIGH: `
## LENGTH: DETAILED
- Full value delivery: 300-450 words
- Powerful hook
- Include step-by-step or detailed breakdown
- Direct CTA`,

        EXTREME: `
## LENGTH: COMPREHENSIVE
- Deep dive: 400-600 words
- Provocative hook
- Extensive step-by-step with details
- Strong engagement CTA`,
    };

    return intensityGuides[intensity] || intensityGuides.MEDIUM;
}

/**
 * Build the complete generation prompt
 */
export function buildLinkedInPrompt(params: {
    topic: string;
    tone: Tone;
    intensity: Intensity;
    category?: string;
    context?: string;
    patterns?: {
        avgLength: number;
        commonHooks: string[];
        avgViralScore: number;
        usesEmojis: boolean;
        hasCTA: number;
        avgParagraphs: number;
    };
    examplePosts?: string;
}): { system: string; user: string } {
    const { topic, tone, intensity, category, context, patterns, examplePosts } = params;

    // Build system prompt
    const systemParts = [
        LINKEDIN_SYSTEM_PROMPT,
        getToneInstructions(tone),
        getIntensityModifications(intensity),
    ];

    const systemPrompt = systemParts.join('\n\n');

    // Build user prompt
    let userPrompt = `Write a LinkedIn post about: ${topic}\n\n`;

    if (category) {
        userPrompt += `Category: ${category}\n\n`;
    }

    if (context) {
        userPrompt += `Additional context: ${context}\n\n`;
    }

    if (patterns) {
        userPrompt += `Insights from top-performing posts on this topic:
- Target length: ~${patterns.avgLength} characters
- Structure: ~${patterns.avgParagraphs} sections
- Top hooks used: ${patterns.commonHooks.slice(0, 3).join(', ')}
- Emoji usage: ${patterns.usesEmojis ? 'Occasional (1-2 max)' : 'None'}
- ${patterns.hasCTA > 50 ? 'Include a natural CTA' : 'CTA optional'}

`;
    }

    if (examplePosts) {
        userPrompt += `Additional reference posts from the database (use for style inspiration, create original content):
${examplePosts}

`;
    }

    userPrompt += `Output the LinkedIn post only. No labels, no "Here's your post:", no meta-commentary. Ready to copy-paste directly into LinkedIn.`;

    return {
        system: systemPrompt,
        user: userPrompt,
    };
}

/**
 * Clean generated content to enforce formatting rules
 */
export function cleanGeneratedContent(content: string): string {
    let cleaned = content
        // Remove em dashes and en dashes
        .replace(/—/g, ' - ')
        .replace(/–/g, '-')
        // Remove asterisks (markdown emphasis)
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        // Remove markdown underscores
        .replace(/__/g, '')
        .replace(/_([^_]+)_/g, '$1')
        // Normalize line breaks
        .replace(/\n{3,}/g, '\n\n')
        // Add blank line after sentences starting new sections
        .replace(/([.!?])\n([A-Z0-9])/g, '$1\n\n$2')
        // Clean up double spaces
        .replace(/  +/g, ' ')
        // Trim whitespace from each line
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .trim();

    return cleaned;
}

export default {
    LINKEDIN_SYSTEM_PROMPT,
    getToneInstructions,
    getIntensityModifications,
    buildLinkedInPrompt,
};

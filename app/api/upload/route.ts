/**
 * File Upload API
 * POST /api/upload - Upload file to Supabase Storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware/auth';
import { formatErrorResponse } from '@/lib/errors';
import { uploadFile } from '@/lib/supabase';
import { extractTextFromFile } from '@/lib/extractors';

// File upload security configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  documents: ['application/pdf', 'text/plain', 'text/csv', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  media: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'],
} as const;

/**
 * Validate file upload security
 */
function validateFileUpload(file: File, folder: string): { valid: boolean; error?: string } {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Validate file size is not zero
  if (file.size === 0) {
    return {
      valid: false,
      error: 'File is empty',
    };
  }

  // Validate folder type
  const folderKey = folder as keyof typeof ALLOWED_TYPES;
  if (!ALLOWED_TYPES[folderKey]) {
    return {
      valid: false,
      error: `Invalid folder type. Allowed: ${Object.keys(ALLOWED_TYPES).join(', ')}`,
    };
  }

  // Validate file type
  const allowedTypes = ALLOWED_TYPES[folderKey];
  if (!allowedTypes.includes(file.type as any)) {
    return {
      valid: false,
      error: `Invalid file type for ${folder}. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  // Validate file name (prevent path traversal and malicious names)
  const fileName = file.name;
  if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
    return {
      valid: false,
      error: 'Invalid file name',
    };
  }

  // Validate file extension matches MIME type
  const fileExt = fileName.split('.').pop()?.toLowerCase();
  const mimeTypeMap: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
    'image/svg+xml': ['svg'],
    'application/pdf': ['pdf'],
    'text/plain': ['txt'],
    'text/csv': ['csv'],
    'video/mp4': ['mp4'],
    'video/webm': ['webm'],
    'video/quicktime': ['mov'],
    'application/msword': ['doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  };

  const expectedExtensions = mimeTypeMap[file.type];
  if (expectedExtensions && fileExt && !expectedExtensions.includes(fileExt)) {
    return {
      valid: false,
      error: 'File extension does not match file type',
    };
  }

  return { valid: true };
}

/**
 * POST /api/upload - Upload file
 */
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const formData = await req.formData();

    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'media';
    const extractText = formData.get('extractText') === 'true';

    if (!file) {
      return NextResponse.json(
        {
          error: {
            message: 'No file provided',
            code: 'VALIDATION_ERROR',
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    // Validate file upload
    const validation = validateFileUpload(file, folder);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: {
            message: validation.error,
            code: 'VALIDATION_ERROR',
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    // Upload to Supabase
    const url = await uploadFile(
      file,
      user.id,
      folder as 'images' | 'documents' | 'media'
    );

    // Extract text if requested
    let extractedText: string | undefined;
    if (extractText) {
      try {
        const result = await extractTextFromFile(file);
        extractedText = result.text;
      } catch (error) {
        // Don't fail upload if extraction fails
        console.error('Text extraction failed:', error);
      }
    }

    return NextResponse.json({
      url,
      extractedText,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}

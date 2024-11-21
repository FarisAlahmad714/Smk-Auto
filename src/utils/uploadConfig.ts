// src/utils/uploadConfig.ts
import { mkdir, stat } from 'fs/promises';
import { join } from 'path';

export async function ensureUploadDir() {
  const uploadDir = join(process.cwd(), 'public/uploads');
  try {
    await stat(uploadDir);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }
  return uploadDir;
}

export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
}
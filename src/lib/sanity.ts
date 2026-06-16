import { createClient, type SanityClient } from '@sanity/client';

/**
 * Write-capable Sanity client — lazily created so the build doesn't fail
 * when env vars are absent. Used server-side only (API routes).
 *
 * Reads NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET to stay
 * consistent with how the yejzila app sets these values in .env.local.
 */
let _client: SanityClient | null = null;

export function getSanityWriteClient(): SanityClient {
  if (_client) return _client;

  // Support both prefixed (NEXT_PUBLIC_*) and plain env var names
  const projectId =
    process.env.SANITY_PROJECT_ID ??
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  const dataset =
    process.env.SANITY_DATASET ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    'production';

  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) {
    throw new Error(
      'Missing Sanity project ID. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local'
    );
  }
  if (!token) {
    throw new Error(
      'Missing Sanity write token. Set SANITY_API_WRITE_TOKEN in .env.local'
    );
  }

  _client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  });

  return _client;
}

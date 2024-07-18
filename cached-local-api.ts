import { buildCachedPayload } from '@payload-enchants/cached-local-api';
import { revalidateTag, unstable_cache } from 'next/cache';

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
    // collections list to cache
    collections: [
        {
            slug: 'jobs',
        },
        {
            slug: 'organizations',
        }
    ],
    // Log when revalidation runs or operation cache HIT / SKIP
    loggerDebug: true,
    revalidateTag,
    options: {},
    unstable_cache,
    /*
        Temporarily enable the simple cache strategy
        TODO: Update when a fix is released for this issue:
        https://github.com/r1tsuu/payload-enchants/issues/86
    */
    useSimpleCacheStrategy: true,
});

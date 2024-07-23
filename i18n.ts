import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
    const locale = 'cs';

    return {
        locale,
        messages: (await import(`./src/app/(app)/_translations/${locale}.json`)).default
    };
});
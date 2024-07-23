import cs from './src/app/(app)/_translations/cs.json'

type Messages = typeof cs;

declare global {
    // Use type safe message keys with `next-intl`
    interface IntlMessages extends Messages { }
}
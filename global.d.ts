// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cs } from './src/app/(app)/_translations/cs'

type Messages = typeof cs

declare global {
    // Use type safe message keys with `next-intl`
    type IntlMessages = Messages
}

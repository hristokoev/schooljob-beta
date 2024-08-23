import type { Access } from 'payload'

import { checkRole } from '@/payload/access'

const SA_A_Limit: Access = async ({ req, req: { user } }) => {
    if (user) {
        if (checkRole('super-admin', user) || checkRole('admin', user)) {
            const { totalDocs } = await req.payload.count({ collection: 'memberships' })

            return totalDocs < 3
        }
    }

    return false
}

export { SA_A_Limit }

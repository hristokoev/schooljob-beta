import { type Field } from 'payload'

import { SA } from '@/payload/access'
import { ArchivedCell } from './cell'

export const archived: Field = {
    name: 'archived',
    type: 'checkbox',
    defaultValue: false,
    admin: {
        components: {
            Cell: ArchivedCell
        }
    }
}

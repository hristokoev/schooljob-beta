import { type Field } from 'payload'

import { ArchivedCell } from './cell'

export const archived: Field = {
    name: 'archived',
    type: 'checkbox',
    defaultValue: false,
    admin: {
        hidden: true,
        components: {
            Cell: ArchivedCell
        }
    }
}

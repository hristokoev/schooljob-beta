import { type Field } from 'payload'

import { ArchivedCell } from './cell'
import { ArchivedField } from './field'

export const archived: Field = {
    name: 'archived',
    type: 'checkbox',
    defaultValue: false,
    admin: {
        components: {
            Field: ArchivedField,
            Cell: ArchivedCell
        }
    }
}

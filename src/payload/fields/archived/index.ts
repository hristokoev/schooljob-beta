import { type Field } from 'payload'

export const archived: Field = {
    name: 'archived',
    label: {
        en: 'Archive',
        cs: 'Archivovat',
    },
    type: 'checkbox',
    defaultValue: false,
    admin: {
        components: {
            Cell: 'src/payload/fields/archived/cell.tsx#ArchivedCell',
            Field: 'src/payload/fields/archived/field.tsx#ArchivedField',
        }
    }
}

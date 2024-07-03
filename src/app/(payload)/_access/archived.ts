import { FieldAccess } from 'payload'

const ARCHIVED: FieldAccess = ({ doc }) => {
    return doc?.archived ? false : true
}

export { ARCHIVED }
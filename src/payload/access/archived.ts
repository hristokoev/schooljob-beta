import { FieldAccess } from 'payload'

const ARCHIVED: FieldAccess = ({ doc }) => {
    return true
    return doc?.archived ? false : true
}

export { ARCHIVED }

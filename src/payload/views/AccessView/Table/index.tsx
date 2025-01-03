import { FieldPermissions } from 'payload'
import React from 'react'

interface PermissionTableProps {
  fields: {
    [fieldName: string]: FieldPermissions
  }
  layout?: 'fixed' | 'auto'
}

const PermissionTable: React.FC<PermissionTableProps> = ({ fields, layout }) => {
  const hasCreate = Object.values(fields).some(field => field.create !== undefined)

  return (
    <table className="table" style={{ tableLayout: layout, width: '100%' }}>
      <thead>
        <tr>
          <td>Field</td>
          {hasCreate && <td>Create</td>}
          <td>Read</td>
          <td>Update</td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(fields).map(([fieldName, field]) => (
          <React.Fragment key={fieldName}>
            <tr>
              <td>{fieldName}</td>
              {field.create && <td>{field.create.permission ? '✅' : '❌'}</td>}
              <td>{field.read.permission ? '✅' : '❌'}</td>
              <td>{field.update.permission ? '✅' : '❌'}</td>
            </tr>
            {field.fields && (
              <tr style={{ background: 'none' }}>
                <td>
                  <PermissionTable fields={field.fields} layout="auto" />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default PermissionTable

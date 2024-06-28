import * as React from 'react'

export const StatusSelectComponentCell: React.FC<{
  cellData: string
}> = ({ cellData }) => {
  return <div className={`status ${cellData}`}>{cellData}</div>
}

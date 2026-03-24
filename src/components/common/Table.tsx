import type { ReactNode } from 'react'
import './Table.css'

interface Column {
    key: string
    label: string
    render?: (value: any, row: any) => ReactNode
}

interface TableProps {
    columns: Column[]
    data: any[]
    onRowClick?: (row: any) => void
}

const Table = ({ columns, data, onRowClick }: TableProps) => {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className={onRowClick ? 'table-row-clickable' : ''}
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
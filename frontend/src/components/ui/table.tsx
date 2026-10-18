import type { ReactNode } from 'react'

export function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0D0D0D]">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-border bg-white/5">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={`${index}-${cellIndex}`} className="px-4 py-3 text-text-primary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import type { ReactElement, ReactNode } from 'react';

type ReferenceTableColumn<Row> = {
  key: string;
  label: string;
  render: (row: Row) => ReactNode;
};

export function ReferenceTable<Row>({ columns, rows }: { columns: ReferenceTableColumn<Row>[]; rows: Row[] }): ReactElement {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[var(--site-border)] bg-[var(--site-surface)]">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-[var(--site-surface-muted)] text-[var(--site-text)]">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-[var(--site-border)] align-top text-[var(--site-text-muted)]">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 leading-7">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { ReferenceTableColumn };
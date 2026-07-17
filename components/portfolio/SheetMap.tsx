import type { SheetMapEntry } from '@/lib/portfolio/multiEntityFpaContent';

type SheetMapProps = {
  title: string;
  sheets: SheetMapEntry[];
};

export default function SheetMap({ title, sheets }: SheetMapProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-primary-black">{title}</h3>
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-primary-black">Tab</th>
              <th className="px-4 py-3 text-sm font-semibold text-primary-black">Description</th>
            </tr>
          </thead>
          <tbody>
            {sheets.map((sheet, index) => (
              <tr
                key={sheet.name}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 align-top font-semibold text-primary-blue whitespace-nowrap">
                  {sheet.name}
                </td>
                <td className="px-4 py-3 align-top text-gray-700">{sheet.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

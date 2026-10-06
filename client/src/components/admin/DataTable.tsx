import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  customActions?: (item: T) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  sortConfig?: { key: string; direction: 'asc' | 'desc' };
  onSort?: (key: string) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onEdit,
  onDelete,
  onView,
  customActions,
  isLoading = false,
  emptyMessage = 'No data available',
  pagination,
  sortConfig,
  onSort,
}: DataTableProps<T>) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="card overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-[#EAE2D7] dark:bg-stone-800 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="card p-12 text-center">
        <MoreHorizontal className="w-12 h-12 mx-auto text-[#D6D3D1] dark:text-[#3F3F46] mb-4" aria-hidden="true" />
        <p className="text-[#57534E] dark:text-[#A8A29E]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="grid">
          <thead className="bg-[#FAF7F2] dark:bg-[#19191E]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-4 py-3 text-left text-xs font-semibold text-[#57534E] dark:text-[#A8A29E] uppercase tracking-wider ${column.className || ''}`}
                  style={{ width: column.width }}
                >
                  {column.sortable && onSort ? (
                    <button
                      onClick={() => onSort(column.key)}
                      className="flex items-center gap-1 hover:text-[#8B6508] dark:hover:text-[#F3E5AB] transition-colors"
                    >
                      {column.header}
                      {sortConfig?.key === column.key && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {(onEdit || onDelete || onView || customActions) && (
                <th scope="col" className="px-4 py-3 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE2D7] dark:divide-stone-800">
            {data.map((item, index) => {
              const key = keyExtractor(item);
              const isHovered = hoveredRow === key;
              return (
                <motion.tr
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onMouseEnter={() => setHoveredRow(key)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`transition-colors ${isHovered ? 'bg-[#FAF7F2] dark:bg-[#19191E]' : ''}`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={`px-4 py-4 ${column.className || ''}`}>
                      {column.render ? column.render(item, index) : (item as any)[column.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete || onView || customActions) && (
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <button onClick={() => onView(item)} className="p-2 rounded-lg text-[#57534E] dark:text-[#A8A29E] hover:bg-[#EAE2D7] dark:hover:bg-stone-800 hover:text-[#8B6508] dark:hover:text-[#F3E5AB] transition-colors" aria-label="View">
                            <MoreHorizontal className="w-4 h-4 rotate-90" aria-hidden="true" />
                          </button>
                        )}
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="p-2 rounded-lg text-[#8B6508] dark:text-[#F3E5AB] hover:bg-amber-500/10 dark:hover:bg-amber-400/10 transition-colors" aria-label="Edit">
                            <ChevronRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(item)} className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Delete">
                            <motion.div className="w-4 h-4 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.div>
                          </button>
                        )}
                        {customActions && customActions(item)}
                      </div>
                    </td>
                  )}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-4 py-3 border-t border-[#EAE2D7] dark:border-stone-800 flex items-center justify-between">
          <div className="text-sm text-[#57534E] dark:text-[#A8A29E]">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg text-[#57534E] dark:text-[#A8A29E] hover:bg-[#EAE2D7] dark:hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5]">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-lg text-[#57534E] dark:text-[#A8A29E] hover:bg-[#EAE2D7] dark:hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
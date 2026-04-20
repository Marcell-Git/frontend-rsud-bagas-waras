import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

/**
 * Pagination Component for Admin Dashboard
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback when a page is clicked
 * @param {number} props.totalItems - Total items across all pages
 * @param {number} props.itemsPerPage - Items displayed per page
 */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems,
  itemsPerPage = 10 
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-8 py-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        Menampilkan <span className="text-slate-900 border-b border-teal-500/30">{startItem}</span> - <span className="text-slate-900 border-b border-teal-500/30">{endItem}</span> dari <span className="text-slate-900">{totalItems}</span> Data
      </div>

      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Halaman Pertama"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Prev Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all mr-2"
          title="Halaman Sebelumnya"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition-all border
              ${
                currentPage === page
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "bg-white border-slate-100 text-slate-400 hover:border-teal-500 hover:text-teal-600 shadow-sm"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all ml-2"
          title="Halaman Berikutnya"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Halaman Terakhir"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

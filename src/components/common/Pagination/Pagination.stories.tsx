/**
 * Pagination Component Stories
 * Demonstrates all variants, sizes, states, and ARIA configurations
 */
import { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export const Default = () => (
  <div className="flex flex-wrap gap-2">
    <Pagination value={1} selected />
    <Pagination value={2} />
    <Pagination value={3} />
    <Pagination value={4} />
  </div>
);

export const Variants = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3">Contained Variant</h3>
      <div className="flex flex-wrap gap-2">
        <Pagination value={1} variant="contained" selected />
        <Pagination value={2} variant="contained" />
        <Pagination value={3} variant="contained" />
        <Pagination value={4} variant="contained" disabled />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Outlined Variant</h3>
      <div className="flex flex-wrap gap-2">
        <Pagination value={1} variant="outlined" selected />
        <Pagination value={2} variant="outlined" />
        <Pagination value={3} variant="outlined" />
        <Pagination value={4} variant="outlined" disabled />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Text Variant</h3>
      <div className="flex flex-wrap gap-2">
        <Pagination value={1} variant="text" selected />
        <Pagination value={2} variant="text" />
        <Pagination value={3} variant="text" />
        <Pagination value={4} variant="text" disabled />
      </div>
    </div>
  </div>
);

export const Sizes = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3">Small Size</h3>
      <div className="flex flex-wrap gap-2">
        <Pagination value={1} size="small" selected />
        <Pagination value={2} size="small" />
        <Pagination value={3} size="small" />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Medium Size</h3>
      <div className="flex flex-wrap gap-2">
        <Pagination value={1} size="medium" selected />
        <Pagination value={2} size="medium" />
        <Pagination value={3} size="medium" />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Large Size</h3>
      <div className="flex flex-wrap gap-2">
        <Pagination value={1} size="large" selected />
        <Pagination value={2} size="large" />
        <Pagination value={3} size="large" />
      </div>
    </div>
  </div>
);

export const States = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3">Selected State</h3>
      <div className="flex gap-2">
        <Pagination value={1} selected variant="contained" />
        <Pagination value={2} selected variant="outlined" />
        <Pagination value={3} selected variant="text" />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Disabled State</h3>
      <div className="flex gap-2">
        <Pagination value={1} disabled variant="contained" />
        <Pagination value={2} disabled variant="outlined" />
        <Pagination value={3} disabled variant="text" />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Disabled + Selected</h3>
      <div className="flex gap-2">
        <Pagination value={1} disabled selected variant="contained" />
        <Pagination value={2} disabled selected variant="outlined" />
        <Pagination value={3} disabled selected variant="text" />
      </div>
    </div>
  </div>
);

export const InteractivePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Current Page: {currentPage}</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Pagination
              key={page}
              value={page}
              selected={page === currentPage}
              onClick={() => setCurrentPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">With Previous/Next</h3>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Pagination
              key={page}
              value={page}
              selected={page === currentPage}
              onClick={() => setCurrentPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            />
          ))}

          <button
            className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export const WithAriaAttributes = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3">Pagination with ARIA Labels</h3>
      <nav aria-label="Pagination Navigation">
        <div className="flex flex-wrap gap-2">
          <Pagination
            value={1}
            selected
            aria-current="page"
            aria-label="Page 1 (Current)"
            aria-controls="results-section"
          />
          <Pagination value={2} aria-label="Page 2" aria-controls="results-section" />
          <Pagination value={3} aria-label="Page 3" aria-controls="results-section" />
          <Pagination
            value={4}
            disabled
            aria-disabled={true}
            aria-label="Page 4 (disabled)"
          />
        </div>
      </nav>
      <div id="results-section" className="mt-4 p-4 bg-gray-100 rounded">
        Results for page 1
      </div>
    </div>
  </div>
);

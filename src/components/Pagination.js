import './Pagination.css';
import React from 'react';

const Pagination = ({ currentPage, onNext, onPrevious }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={currentPage === 0}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React from 'react';
import './LoadMoreButton.scss';

const LoadMoreButton = ({ loadMore, loading, }) => {
  if (loading) {
    return <h3 className='loading-message'>Loading Safe Havens...</h3>;
  }

  // Render the "Load More" button if not loading
  return (
    <button className="loadMoreBtn" onClick={loadMore}>
      <h3 className='loadMoreBtn-text'>
        LOAD MORE SHELTERS
      </h3>
    </button>
  );
};

export default LoadMoreButton;

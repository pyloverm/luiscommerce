import { useEffect, useState } from 'react';
import React from 'react';
function LoadMoreButton({ onClick }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!mounted) return;

    setIsLoading(true);
    onClick().then(() => setIsLoading(false));

    return () => {
      mounted = false;
    };
  }, [onClick]);

  return (
    <button
      className={`load-more-button ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
    >
      Load More
    </button>
  );
}

export default LoadMoreButton
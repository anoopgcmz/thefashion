import React from 'react';

interface SearchIconProps {
  onClick: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={onClick}
        className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchIcon;
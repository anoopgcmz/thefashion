import React from 'react';
import DressFormResult from './DressFormResult';

interface Suggestion {
  top: string;
  bottom: string;
  shoes: string;
  watch: string;
  belt: string;
  goggles: string;
  jewelry: string;
}

interface DressFormResultsProps {
  suggestions: Suggestion[];
}

const DressFormResults: React.FC<DressFormResultsProps> = ({ suggestions }) => {
  return (
    <div className="suggestions-list">
      {suggestions.map((suggestion, index) => (
        <DressFormResult key={index} suggestion={suggestion} />
      ))}
    </div>
  );
};

export default DressFormResults;

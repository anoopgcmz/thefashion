import React, { useState, useEffect } from 'react';
import { imageSearch } from '../../pages/api/imageSearch'; 

interface Suggestion {
  top: string;
  bottom: string;
  shoes: string;
  watch: string;
  belt: string;
  goggles: string;
  jewelry: string;
}

interface DressFormResultProps {
  suggestion: Suggestion;
}

const DressFormResult: React.FC<DressFormResultProps> = ({ suggestion }) => {
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (suggestion) {
        const SuggestionString = JSON.stringify(suggestion);
        // const theImage = await imageSearch(SuggestionString);
       // setGeneratedImage(theImage); // Set the base64 image string directly
        setLoading(false); 
      }
    };

    fetchImageUrls();
  }, [suggestion]);

  return (
    <div className="shadow-lg p-8 m-4 rounded-lg flex flex-col md:flex-row bg-[#ffffff]">
      <div className="w-full md:w-1/2 pr-4">
        <div className="item mb-4">
          <h3 className="text-lg font-semibold text-[#333333]">Top:</h3>
          <p className="text-[#333333]">{suggestion.top}</p>
        </div>
        <div className="item mb-4">
          <h3 className="text-lg font-semibold text-[#333333]">Bottom:</h3>
          <p className="text-[#333333]">{suggestion.bottom}</p>
        </div>
        <div className="item mb-4">
          <h3 className="text-lg font-semibold text-[#333333]">Shoes:</h3>
          <p className="text-[#333333]">{suggestion.shoes}</p>
        </div>
        <div className="item mb-4">
          <h3 className="text-lg font-semibold text-[#333333]">Watch:</h3>
          <p className="text-[#333333]">{suggestion.watch}</p>
        </div>
        <div className="item mb-4">
          <h3 className="text-lg font-semibold text-[#333333]">Belt:</h3>
          <p className="text-[#333333]">{suggestion.belt}</p>
        </div>
        {suggestion.goggles && (
          <div className="item mb-4">
            <h3 className="text-lg font-semibold text-[#333333]">Goggles:</h3>
            <p className="text-[#333333]">{suggestion.goggles}</p>
          </div>
        )}
        <div className="item mb-4">
          <h3 className="text-lg font-semibold text-[#333333]">Jewelry:</h3>
          <p className="text-[#333333]">{suggestion.jewelry}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center border-t md:border-t-0 md:border-l border-gray-300 pt-4 md:pt-0 md:pl-4">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="animate-pulse bg-gray-300 w-full h-64 rounded-lg"></div>
          </div>
        ) : (
          <img
            src={`data:image/png;base64,${generatedImage}`}
            alt={suggestion.top}
            className="max-w-full max-h-full rounded-lg shadow-md"
          />
        )}
      </div>
    </div>
  );
};

export default DressFormResult;

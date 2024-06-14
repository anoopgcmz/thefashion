import React, { useState, ChangeEvent, FormEvent } from 'react';
import chroma from 'chroma-js';

const bodyShapes: string[] = ["Hourglass", "Pear", "Apple", "Rectangle", "Inverted Triangle"];
const occasions: string[] = ["Work", "Casual", "Formal", "Party", "Vacation"];
const seasons: string[] = ["Spring", "Summer", "Fall (Autumn)", "Winter", "Monsoon"];
const genderAgeGroups: string[] = ["Male", "Female"];

function filterColorsByLightness(colors: string[], minLightness: number, maxLightness: number): string[] {
  return colors.filter(color => {
    const lightness = chroma(color).get('hsl.l');
    return lightness >= minLightness && lightness <= maxLightness;
  });
}

interface FormData {
  skinTone: string;
  hairColor: string;
  eyeColor: string;
  bodyShape: string;
  occasion: string;
  season: string;
  genderAgeGroup: string;
}

interface DressFormProps {
  onSubmit: (formData: FormData) => void;
}

const DressForm: React.FC<DressFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    skinTone: '',
    hairColor: '#000000',
    eyeColor: '#000000',
    bodyShape: '',
    occasion: '',
    season: '',
    genderAgeGroup: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const colors: string[] = ['#ffceb4', '#e1ac96', '#b48a78', '#87675a', '#3c2e28'];
  const minLightness: number = 0.1;
  const maxLightness: number = 1.0;
  const brownColors: string[] = filterColorsByLightness(colors, minLightness, maxLightness);

  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setFormData({ ...formData, skinTone: color });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<FormData> = {};

    if (!formData.skinTone) validationErrors.skinTone = 'Please select a skin tone.';
    if (!formData.bodyShape) validationErrors.bodyShape = 'Please select your body shape.';
    if (!formData.occasion) validationErrors.occasion = 'Please select an occasion.';
    if (!formData.season) validationErrors.season = 'Please select a season.';
    if (!formData.genderAgeGroup) validationErrors.genderAgeGroup = 'Please select your gender/age group.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-transparent shadow-lg rounded-lg p-6 bg-[#ffffff]">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#333333]">Identify Your Skin Tone</h2>
            <div className="flex flex-wrap">
              {brownColors.map((color, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full m-1 cursor-pointer ${selectedColor === color ? 'border-4 border-gray-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
            {errors.skinTone && <p className="text-red-500 mt-2">{errors.skinTone}</p>}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4 text-[#333333]">Hair and Eye Color</h2>
            <div className="mb-4">
              <label className="block mb-2 text-[#333333]">Hair Color</label>
              <input
                type="color"
                name="hairColor"
                value={formData.hairColor}
                onChange={handleChange}
                className="w-12 h-12 rounded-md border border-gray-300"
              />
            </div>
            <div>
              <label className="block mb-2 text-[#333333]">Eye Color</label>
              <input
                type="color"
                name="eyeColor"
                value={formData.eyeColor}
                onChange={handleChange}
                className="w-12 h-12 rounded-md border border-gray-300"
              />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4 text-[#333333]">Body Shape</h2>
            <select name="bodyShape" value={formData.bodyShape} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300">
              <option value="" disabled>Select your body shape</option>
              {bodyShapes.map(shape => (
                <option key={shape} value={shape}>{shape}</option>
              ))}
            </select>
            {errors.bodyShape && <p className="text-red-500 mt-2">{errors.bodyShape}</p>}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4 text-[#333333]">Occasion</h2>
            <select name="occasion" value={formData.occasion} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300">
              <option value="" disabled>Select the occasion</option>
              {occasions.map(occasion => (
                <option key={occasion} value={occasion}>{occasion}</option>
              ))}
            </select>
            {errors.occasion && <p className="text-red-500 mt-2">{errors.occasion}</p>}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4 text-[#333333]">Season</h2>
            <select name="season" value={formData.season} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300">
              <option value="" disabled>Select the season</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
            {errors.season && <p className="text-red-500 mt-2">{errors.season}</p>}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4 text-[#333333]">Gender and Age Group</h2>
            <select name="genderAgeGroup" value={formData.genderAgeGroup} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300">
              <option value="" disabled>Select your gender/age group</option>
              {genderAgeGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            {errors.genderAgeGroup && <p className="text-red-500 mt-2">{errors.genderAgeGroup}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DressForm;

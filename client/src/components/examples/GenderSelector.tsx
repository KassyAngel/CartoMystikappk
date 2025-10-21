import { useState } from 'react';
import GenderSelector from '../GenderSelector';

export default function GenderSelectorExample() {
  const [selectedGender, setSelectedGender] = useState('');
  
  const genderOptions = [
    { value: 'homme', label: 'Homme', icon: '♂' },
    { value: 'femme', label: 'Féminin', icon: '♀' },
    { value: 'autre', label: 'Autre', icon: '⚥' }
  ];
  
  return (
    <div className="p-8 space-y-6">
      <GenderSelector 
        value={selectedGender}
        onChange={setSelectedGender}
        options={genderOptions}
      />
      <p className="text-white/60 text-center">Sélectionné: {selectedGender}</p>
    </div>
  );
}
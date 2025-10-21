import { useState } from 'react';
import MysticalSelect from '../MysticalSelect';

export default function MysticalSelectExample() {
  const [selectedMonth, setSelectedMonth] = useState('');
  
  const months = [
    { value: '1', label: 'Janvier' },
    { value: '2', label: 'Février' },
    { value: '3', label: 'Mars' },
    { value: '4', label: 'Avril' },
    { value: '5', label: 'Mai' },
    { value: '6', label: 'Juin' },
  ];
  
  return (
    <div className="p-8 space-y-4">
      <MysticalSelect 
        placeholder="Mois"
        value={selectedMonth}
        onChange={setSelectedMonth}
        options={months}
        data-testid="select-month"
      />
      <p className="text-white/60 text-center">Sélectionné: {selectedMonth}</p>
    </div>
  );
}
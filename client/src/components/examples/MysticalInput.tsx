import { useState } from 'react';
import MysticalInput from '../MysticalInput';

export default function MysticalInputExample() {
  const [name, setName] = useState('');
  
  return (
    <div className="p-8 space-y-4">
      <MysticalInput 
        placeholder="Entrez votre nom"
        value={name}
        onChange={setName}
        maxLength={30}
        data-testid="input-name"
      />
      <p className="text-white/60 text-center">Valeur: {name}</p>
    </div>
  );
}
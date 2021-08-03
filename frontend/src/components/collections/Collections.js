import { useEffect, useState } from 'react';
import address from './nfts.js';
import './Collections.css';
// TEMPORARY USE ENV VARIABLE

const Collections = () => {
  const [token, setToken] = useState('Stoner Cats');

  useEffect(() => {
    console.log(address['Stoner Cats']);
  });

  const handleButton = (event) => {
    console.log(event);
    setToken('Stoner Cats');
  };
  return (
    <nav className="collectionsNav">
      <button onClick={handleButton}></button>
      <div>{token}</div>
      <button></button>
    </nav>
  );
};

export default Collections;

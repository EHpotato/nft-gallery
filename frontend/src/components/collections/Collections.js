import './Collections.css';
import Addresses from '../Addresses';
// TEMPORARY USE ENV VARIABLE

const Collections = ({ props }) => {
  const { collection, setCollection, setIndex } = props;

  const handlePrevious = () => {
    const prev = (collection - 1) % Addresses.length;
    setCollection(prev);
    setIndex(0);
  };
  const handleNext = () => {
    const next = (collection + 1) % Addresses.length;
    setCollection(next);
    setIndex(0);
  };
  return (
    <nav className="collectionsNav">
      <button onClick={handlePrevious}>prev</button>
      <div>{Addresses[collection][0]}</div>
      <button onClick={handleNext}>next</button>
    </nav>
  );
};

export default Collections;

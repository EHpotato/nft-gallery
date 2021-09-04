import './Collections.css';
import addresses from '../addresses';
// TEMPORARY USE ENV VARIABLE

const Collections = ({ props }) => {
  const { collection, setCollection, setIndex } = props;

  const handlePrevious = () => {
    const prev = (collection - 1) % addresses.length;
    setCollection(prev);
    setIndex(0);
  };
  const handleNext = () => {
    const next = (collection + 1) % addresses.length;
    setCollection(next);
    setIndex(0);
  };
  return (
    <nav className="collectionsNav">
      <button onClick={handlePrevious}>prev</button>
      <div>{addresses[collection][0]}</div>
      <button onClick={handleNext}>next</button>
    </nav>
  );
};

export default Collections;

import './Collections.css';
// TEMPORARY USE ENV VARIABLE

const Collections = ({ props }) => {
  const { collection, setCollection } = props;
  const handleButton = (event) => {
    console.log(event);
    setCollection('Collection Name Here');
  };
  return (
    <nav className="collectionsNav">
      <button onClick={handleButton}></button>
      <div>{collection}</div>
      <button></button>
    </nav>
  );
};

export default Collections;

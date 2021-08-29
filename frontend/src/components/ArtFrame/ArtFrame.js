const ArtFrame = ({ data, index, page }) => {
  const displayImage = (data) => {
    if (data.status === 'rejected') {
      return (
        <div>
          <p>Unable to Load</p>
          <img src="../palceholder.png" alt="unkown" height="auto" />
        </div>
      );
    } else {
      return (
        <div style={{ width: '70%', margin: 'auto' }}>
          <p>{data.value.data.name}</p>
          <img
            src={data.value.data.image}
            alt={data.value.data.name}
            width="50%"
            height="15%"
          />
        </div>
      );
    }
  };
  console.log(index);
  console.log(page);
  return displayImage(data);
};

export default ArtFrame;

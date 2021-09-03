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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minWidth: 0,
          }}
        >
          <p
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: '28px',
            }}
          >
            {data.value.data.name}
          </p>
          <img
            src={data.value.data.image}
            alt={data.value.data.name}
            style={{
              flex: '1 1 auto',
            }}
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

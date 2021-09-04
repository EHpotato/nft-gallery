import fallBack from '../../placeholder.png';

const ArtFrame = ({ data }) => {
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
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallBack;
            }}
            style={{
              flex: '1 1 auto',
            }}
          />
        </div>
      );
    }
  };
  return displayImage(data);
};

export default ArtFrame;

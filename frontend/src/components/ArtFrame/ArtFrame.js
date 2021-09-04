import { useEffect, useState } from 'react';
import fallBack from '../../placeholder.png';
import placeholder from '../../loading.gif';

const ArtFrame = ({ data }) => {
  const [loaded, setLoad] = useState(false);
  const [display, setDisplay] = useState('none');
  // const [src, setSource] = useState(false);

  const handleImageLoad = () => {
    setLoad(true);
    setDisplay('');
  };

  useEffect(() => {
    setLoad(false);
    setDisplay('none');
  }, [data]);
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
          {!loaded && (
            <img
              src={placeholder}
              alt="placeholder"
              style={{ flex: '1 1 auto' }}
            />
          )}
          <img
            src={data.value.data.image}
            alt={data.value.data.name}
            onLoad={handleImageLoad}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallBack;
            }}
            style={{
              display: display,
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

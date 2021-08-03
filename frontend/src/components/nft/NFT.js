import { useEffect } from 'react';
import Collections from '../collections/Collections';

const dev_url = 'https://go.fission.app/json/3/image.jpg';

const NFT = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <Collections />
      {/* TODO: Might have to create separate component for images */}
      <div>
        <p>Name of piece | (I) icon</p>
        <img src={dev_url} alt="cat" width="100%" height="auto"></img>
      </div>
    </div>
  );
};

export default NFT;

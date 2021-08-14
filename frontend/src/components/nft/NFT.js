import { useCallback, useEffect, useState } from 'react';
import Collections from '../collections/Collections';
import address from '../collections/nfts.js';
import axios from 'axios';

const dev_url = 'https://go.fission.app/json/3/image.jpg';
const api_get = 'http://localhost:3010/';

const NFT = () => {
  const [collection, setCollection] = useState('Stoner Cats');
  const [index, setIndex] = useState(1);
  const [data, setData] = useState([]);

  const getFeed = async (i, c) => {
    const addr = address[c];
    const url = `${api_get}${addr}`;
    console.log(url);
    const data = await axios
      .get(url, {
        data: JSON.stringify({ tokenID: 10000 }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('here');
        console.log(response);
        console.log(response.data.data);
        return [response.data.data, response.data.data, response.data.data];
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.message);
        return [];
      });
    setData(data);
  };
  const g = useCallback(() => {
    return getFeed(index, collection);
  }, [index, collection]);

  useEffect(() => {
    g();
  }, [g]);
  return (
    <div>
      <Collections props={{ collection, setCollection, setIndex }} />
      {/* TODO: Might have to create separate component for images */}
      <div className="art-container">
        <p>Name of piece | (I) icon</p>
        <img src={dev_url} alt="cat" width="100%" height="auto"></img>
        {data.map((entry, i) => {
          return (
            <div id={i}>
              <img
                src={entry.image}
                alt={entry.name}
                width="100%"
                height="auto"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NFT;

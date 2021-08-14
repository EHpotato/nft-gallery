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
    const url = `${api_get}${addr}/${i}`;
    console.log(url);
    const data = await axios
      .get(url)
      .then((response) => {
        console.log('here');
        console.log(response.data);
        return response.data;
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
        {data.map((entry, i) => {
          if (entry.status === 'rejected') {
            return (
              <div>
                <img src={dev_url} alt={i} height="auto"></img>
              </div>
            );
          }
          return (
            <div id={i}>
              <img
                src={entry.value.data.image}
                alt={entry.value.data.name}
                width="50%"
                height="10%"
              ></img>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          setIndex(index + 1);
          document.documentElement.scrollTop = 0;
        }}
      >
        next
      </button>
    </div>
  );
};

export default NFT;

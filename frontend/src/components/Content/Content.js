import { useCallback, useEffect, useState } from 'react';
import ArtFrame from '../ArtFrame/ArtFrame';
import Collections from '../Collections/Collections';
import address from '../Addresses.js';
import axios from 'axios';
import './Content.css';

// const dev_url = 'https://go.fission.app/json/3/image.jpg';
const api_get = 'http://localhost:3010/';

const Content = () => {
  const [collection, setCollection] = useState('Stoner Cats');
  const [page, setIndex] = useState(1);
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
    return getFeed(page, collection);
  }, [page, collection]);

  useEffect(() => {
    g();
  }, [g]);
  return (
    <div>
      <Collections props={{ collection, setCollection, setIndex }} />
      <div className="arts-container">
        {data.map((entry, i) => {
          return <ArtFrame data={entry} index={i} page={page} />;
        })}
      </div>
      <button
        onClick={() => {
          setIndex(page - 1);
          document.documentElement.scrolltop = 0;
        }}
        disabled={page === 1}
      >
        prev
      </button>
      <button
        onClick={() => {
          setIndex(page + 1);
          document.documentElement.scrollTop = 0;
        }}
      >
        next
      </button>
    </div>
  );
};

export default Content;

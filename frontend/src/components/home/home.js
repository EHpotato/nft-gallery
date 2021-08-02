import './home.css';
import NFT from '../nft/NFT';

const Home = () => {
  return (
    <div className="container">
      <header>HEADER</header>
      <nav>
        <div>Option 1</div>
        <div>Option 2</div>
      </nav>
      <main className="main">
        <NFT />
      </main>
      <aside></aside>
    </div>
  );
};

export default Home;

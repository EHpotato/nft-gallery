import './Home.css';
import Content from '../Content/Content';

const Home = () => {
  return (
    <div className="container">
      <header>
        <p style={{ marginLeft: '25px' }}>NFT Gallery</p>
      </header>
      <nav>
        <div>Option 1</div>
        <div>Option 2</div>
      </nav>
      <main className="main">
        <Content />
      </main>
    </div>
  );
};

export default Home;

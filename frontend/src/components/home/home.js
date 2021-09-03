import './home.css';
import Content from '../Content/Content';

const Home = () => {
  return (
    <div className="container">
      <header>HEADER</header>
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

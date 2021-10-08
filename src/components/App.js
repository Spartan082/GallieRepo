import '../styles/App.scss';
import Navigation from "./Navigation";
import Cards from "./Cards";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <div className="container">
          <Cards />
        </div>
      </main>
    </div>
  );
}

export default App;

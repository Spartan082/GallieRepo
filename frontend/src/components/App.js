import '../styles/App.scss';
import Navigation from "./Navigation";
import Posts from "./Posts";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <div className="container">
          <Posts />
        </div>
      </main>
    </div>
  );
}

export default App;

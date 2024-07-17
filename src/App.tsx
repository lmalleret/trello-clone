import "./App.scss";
import AppBar from "./components/app-bar/AppBar";
import BoardBar from "./components/board-bar/BoardBar";
import BoardContent from "./components/board-content/BoardContent";

function App() {
  return (
    <>
      <div className="trello-app-container">
        <AppBar />
        <BoardBar />
        <BoardContent />
      </div>
    </>
  );
}

export default App;

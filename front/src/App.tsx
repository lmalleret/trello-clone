import "./App.scss";
import AppBar from "./components/app-bar/AppBar";
import BoardBar from "./components/board-bar/BoardBar";
import BoardContent from "./components/board-content/BoardContent";
import { BoardProvider } from "./contexts/boardContext";

function App() {
  return (
    <>
      <BoardProvider>
        <div className="trello-app-container">
          <AppBar />
          <BoardBar />
          <BoardContent />
        </div>
      </BoardProvider>
    </>
  );
}

export default App;

import Flow from "./pages/Flow";
import "./App.css";
import { GlobalDock } from "./components/Dock/Dock";

function App() {
  return (
    <div className="App">
      <Flow></Flow>
      <GlobalDock/>
    </div>
  );
}

export default App;

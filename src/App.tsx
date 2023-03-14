import { CanvasProvider } from "./contexts/CanvasContext";
import Canvas from "./components/Canvas";

function App() {
  return (
    <CanvasProvider>
      <Canvas />
    </CanvasProvider>
  )
}

export default App;

import {
  createTheme,
  ButtonGroup,
  Button,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import { MdRedo, MdUndo } from "react-icons/md";

type DivOnClickHandle = React.MouseEventHandler<HTMLDivElement> | undefined;
interface IMarks {
  x: number;
  y: number;
  active: boolean;
}

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [marks, setMarks] = useState<IMarks[]>([]);
  const activeMarks = marks.filter((mark) => mark.active);

  const markWithPoint: DivOnClickHandle = (e) => {
    const [x, y] = [e.clientX, e.clientY];
    setMarks((prev) => [{ x, y, active: true }, ...prev]);
  };
  function changeTheFirstMark(active: boolean) {
    setMarks((prev) => {
      const lastElementInactiveIndex = prev.findIndex(
        (mark) => mark.active === active
      );
      if (lastElementInactiveIndex !== -1) {
        const newMarks = [...prev];
        newMarks[lastElementInactiveIndex].active = !active;
        return newMarks;
      }
      return prev;
    });
  }
  function redo() {
    changeTheFirstMark(false);
  }
  function undo() {
    changeTheFirstMark(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <ButtonGroup variant="contained" color="primary" className="btn-group">
          <Button startIcon={<MdUndo />} onClick={undo}>
            Desfazer
          </Button>
          <Button endIcon={<MdRedo />} onClick={redo}>
            Refazer
          </Button>
        </ButtonGroup>
        <div className="container" onClick={markWithPoint}>
          {activeMarks.map(({ x, y }) => (
            <div className="mark" style={{ top: y, left: x }} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

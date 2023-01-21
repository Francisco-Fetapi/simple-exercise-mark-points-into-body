import {
  createTheme,
  ButtonGroup,
  Button,
  CssBaseline,
  ThemeProvider,
  Badge,
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
  const inactiveMarks = marks.filter((mark) => !mark.active);

  const markWithPoint: DivOnClickHandle = (e) => {
    const [x, y] = [e.clientX, e.clientY];
    const exists = marks.some((mark) => mark.x === x && mark.y === y);
    if (!exists) {
      setMarks((prev) => [{ x, y, active: true }, ...prev]);
    }
  };
  function changeMark(active: boolean) {
    setMarks((prev) => {
      const firstElementInactiveIndex = prev.findIndex(
        (mark) => mark.active === active
      );
      if (firstElementInactiveIndex !== -1) {
        let newMarks = [...prev];
        const currentMark = newMarks[firstElementInactiveIndex];
        newMarks = newMarks.filter(
          (_, key) => key !== firstElementInactiveIndex
        );
        newMarks.unshift({ ...currentMark, active: !active });
        return newMarks;
      }
      return prev;
    });
  }
  function redo() {
    changeMark(false);
  }
  function undo() {
    changeMark(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <ButtonGroup
          variant="contained"
          color="primary"
          className="btn-group"
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "auto auto",
            // boxShadow: "none",
          }}
          disableElevation
        >
          <Badge badgeContent={activeMarks.length} color="error">
            <Button
              disabled={!activeMarks.length}
              startIcon={<MdUndo />}
              onClick={undo}
            >
              Desfazer
            </Button>
          </Badge>
          <Badge badgeContent={inactiveMarks.length} color="error">
            <Button
              disabled={!inactiveMarks.length}
              endIcon={<MdRedo />}
              onClick={redo}
            >
              Refazer
            </Button>
          </Badge>
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

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Medication from "./pages/Medication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Medication />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;

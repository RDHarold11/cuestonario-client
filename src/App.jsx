import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CuestonariosByUser from "./pages/CuestonariosByUser";
import { Toaster } from "sonner";
import Cuestonario from "./pages/Cuestonario";

function App() {
  return (
    <>
      <Router>
        <Toaster richColors position="top-center"/>
      <Navbar />
        <Routes>
          <Route path="/" index={true} element={<Home />}></Route>
          <Route
            path="/cuestonarios/:id"
            element={<CuestonariosByUser />}
          ></Route>
          <Route path="/cuestonario" element={<Cuestonario/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

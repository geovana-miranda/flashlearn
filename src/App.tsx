import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./pages/Main";
import DecksProvider from "./context/DecksContext";

function App() {

  return (
     <DecksProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
      </DecksProvider>

  );
}

export default App;

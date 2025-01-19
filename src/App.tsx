import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./pages/Main";
import DecksProvider from "./context/DecksContext";
import PageDecks from "./pages/PageDecks";
import PageDeck from "./pages/PageDeck";

function App() {

  return (
     <DecksProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/baralhos" element={<PageDecks />} />
          <Route path="/baralhos/:idDeck" element={<PageDeck />} />
        </Routes>
      </BrowserRouter>
      </DecksProvider>

  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";

import About from "./pages/about"; // 👈 import la nouvelle page
import Reserver from "./pages/reservation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} /> {/* ✅ nouvelle page */}
          <Route path="reservation"  element={<Reserver/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

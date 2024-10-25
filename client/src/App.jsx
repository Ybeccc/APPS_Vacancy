import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Informasi from './Informasi';
import Pendaftaran from './Pendaftaran';
import Pengumuman from './Pengumuman';
import Asisten from './Asisten';
import FormRegistrasi from "./FormRegistrasi";

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <Routes>
        {/* MAIN MENU */}
        <Route path="/" element={<Informasi />} />
        <Route path="/informasi" element={<Informasi />} />
        <Route path="/pendaftaran" element={<Pendaftaran />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/asisten" element={<Asisten />} />

        {/* SUB MENU */}
        <Route path="/registrasi" element={<FormRegistrasi />} />
      </Routes>
    </div>
  </Router>
);

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Informasi from './Informasi';
import Pendaftaran from './Pendaftaran';
import Pengumuman from './Pengumuman';
import Asisten from './Asisten';

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <Routes>
        <Route path="/informasi" element={<Informasi />} />
        <Route path="/pendaftaran" element={<Pendaftaran />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/asisten" element={<Asisten />} />
      </Routes>
    </div>
  </Router>
);

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from "./routes";
import { AuthProvider } from "./context/authContext";
import './App.css'
import Login from './pages/Login/Login.jsx';
import Entes from './pages/Entes/Entes.jsx';
import Users from './pages/Users/Users.jsx';
import Visitas from './pages/Visitas/Visitas.jsx';
import Agendar from './pages/Agendar/Agendar.jsx';
import Actividades from './pages/Actividades/Actividades.jsx';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/entity" element={<Entes />} />
              <Route path="/users" element={<Users />} />
              <Route path="/visits" element={<Visitas />} />
              <Route path="/schedule" element={<Agendar />} />
              <Route path="/activities" element={<Actividades />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App


import "./init"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { io } from "socket.io-client";
import { useAppSelector } from "./app/store";

// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SocketContexts from "./context/SocketContexts";

// SOCKET IO
const socket = io(import.meta.env.VITE_BASE_SERVER);

function App() {
  const { user } = useAppSelector((e: any) => e?.user);
  const { token } = user;

  return (
    <div className="dark">
      <SocketContexts.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </SocketContexts.Provider>
    </div>
  );
}

export default App;

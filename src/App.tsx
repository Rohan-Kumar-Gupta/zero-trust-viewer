import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Policies from "./pages/Policies";
import Assets from "./pages/Assets";
import Events from "./pages/Events";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/policies" />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Policies from "./pages/Policies";
import Assets from "./pages/Assets";
import Events from "./pages/Events";
import PoliciesV2 from "./pages/PoliciesV2";
import "./api-mocked/index";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/policies" />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/events" element={<Events />} />
        <Route path="/policies-v2" element={<PoliciesV2 />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Index from "./pages/Landing/IndexPage";
import CreateToken from "./pages/Create/CreateToken";
import Portfolio from "./pages/Portfolio/Portfolio";
import Token from "./pages/Token/Token";
// import ProtectedRoute from "./protectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />

      <Route path="/create" element={<CreateToken />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/token" element={<Token />} />
      {/* <Route
        path="create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

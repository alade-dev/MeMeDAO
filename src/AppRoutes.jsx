import { Routes, Route } from "react-router-dom";
import Index from "./pages/landingPage/index";
// import ProtectedRoute from "./protectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
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

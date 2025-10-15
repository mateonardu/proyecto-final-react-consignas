import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../views/Login";
import { Messages } from "../views/Messages";
import { NotFound } from "../views/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Help from "../views/Help";


const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }
import { Suspense, lazy } from "react";
import { Container } from "./style";
import { Routes, Route } from "react-router-dom";
import { v4 } from "uuid";

//* Import pages and components
const Loader = lazy(() => import("./components/loader"));
const Login = lazy(() => import("./pages/auth/login"));
const Home = lazy(() => import("./pages/home"));
const ProtectedRoute = lazy(() => import("./routes/index"));

function App() {
  return (
    <Container>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            key={v4()}
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Container>
  );
}

export default App;

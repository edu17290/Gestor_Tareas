import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import RoutesNotFound from "./pages/NotFound.page";
import { PrivateRoutes, PublicRutes } from "./routes/router";

import Spinner from "./components/Spinner/Spinner";
import AuthContextProvider from "./context/AuthProvider";
import DashboardPage from "./pages/Dashboard.page";
import AuthGuard from "./guards/auth.guards";

const LoginPage = lazy(() => import("./pages/Login.page"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AuthContextProvider>
        <BrowserRouter>
          <RoutesNotFound>
            <Route path={PublicRutes.LOGIN} element={<LoginPage />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route index element={<Navigate to={PrivateRoutes.HOME} />} />
              <Route
                path={PrivateRoutes.HOME}
                index={true}
                element={<DashboardPage />}
              />
              {/* AQUI VAN TODAS LAS RUTAS PRIVADAS */}
            </Route>
          </RoutesNotFound>
        </BrowserRouter>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;

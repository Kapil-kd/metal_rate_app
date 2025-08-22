import { lazy, Suspense } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import PurityList from "./components/Purity/PurityList";
import { Prelogin } from "./components/Prelogin/Prelogin";
import { Check } from "./components/Login/Check";
import Loading from "./components/Loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Mainrate from "./components/Rates/Mainrate";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from "./components/Style/Theme";

const Login = lazy(() => import("./components/Login/Login"));
const Signup = lazy(() => import("./components/Login/Signup"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Prelogin />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <Check element={Dashboard} />,
      children: [
        {
          index:true,
          element: <Check element={PurityList} />,
        },
        {
          path: "rates",
          element: <Check element={Mainrate} />,
        }
      ],
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer position="top-right" autoClose={3000} />
      <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <CssBaseline />
      </RouterProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;

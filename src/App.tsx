import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./components/shopping/Home"));
const Cart = lazy(() => import("./components/shopping/Cart"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Navigate to="/home" />
        </Suspense>
      ),
    },
    {
      path: "/home",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/cart",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Cart />
        </Suspense>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Product = lazy(() => import("./component/Product"));
const Checkout = lazy(() => import("./component/Checkout"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Product />
        </Suspense>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          <Checkout />
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

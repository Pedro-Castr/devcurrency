import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { About } from "./pages/about";
import { NotFound } from "./pages/notFound";
import { Layout } from "./components/layout/layout";
import { Favorites } from "./pages/favorites";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:tickerParam",
        element: <Detail />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };

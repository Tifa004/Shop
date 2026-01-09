import Navbar from "./Navbar";
import App from "./App";
import Cart from "./Cart";
import Shop from "./Shop";

const routes = [
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <App /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;

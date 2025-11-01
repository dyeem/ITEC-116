import { useRoutes } from "react-router-dom";

// Layouts
import RootLayout from "@/layouts/RootLayout.jsx";
import PublicLayout from "@/layouts/PublicLayout.jsx";

// Pages
import Index from "@/pages/public/index.jsx";
import Login from "@/pages/auth/login.jsx";
import Register from "../pages/auth/Register";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "auth/login", element: <Login /> },
        { path: "auth/register", element: <Register/>},
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            { index: true, element: <Index /> },
          ],
        },
      ],
    },
  ]);

  return routes;
};

export default Router;

import { useRoutes } from "react-router-dom";

// Layouts
import RootLayout from "@/layouts/RootLayout.jsx";
import PublicLayout from "@/layouts/PublicLayout.jsx";

// Pages
import Index from "@/pages/public/index.jsx";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            { index: true, element: <Index /> }
          ],
        },
      ],
    },
  ]);

  return routes;
};

export default Router;

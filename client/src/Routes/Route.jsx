import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import HomePage from "../Pages/HomePage";
import EmployList from "../Pages/EmployList";
import UpdatePage from "../Pages/UpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/employlist",
        element: <EmployList></EmployList>,
      },
      {
        path: "/user-update/:id",
        element: <UpdatePage></UpdatePage>,
      },
    ],
  },
]);

export default router;
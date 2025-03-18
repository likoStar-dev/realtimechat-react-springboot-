import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Message from "./Message";
import NotFound from "./Notfound";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";
import { LoginPage, RegisterPage } from "./auth/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "message", element: <Message /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;

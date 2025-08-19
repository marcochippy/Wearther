import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../routes/Home';
import MainLayout from '../layouts/MainLayout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    }
  ],
  {
    basename: '/app/wearther'
  }
);

const Router = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;

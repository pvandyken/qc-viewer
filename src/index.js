import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {  RouterProvider, createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/:page",
    element: <App />
  }
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
  document.getElementById('root')
);


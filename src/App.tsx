import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import MainPages from "./components/pages/MainPages";
import MovieDetails from "./components/pages/MovieDetails";
import FavoritePage from "./components/pages/FavoritePage";



function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element:<MainPages/>,
  },
   {
    path: "/favoriteMovies",
    element: <div>Hello world!</div>,
  },
  {
    path: "/movies/:id",
    element: <MovieDetails />
  },
  {
    path: "/movies/favorites",
    element: <FavoritePage/>
  },
]);





  return (
    <RouterProvider router={router} />
  )
}

export default App;

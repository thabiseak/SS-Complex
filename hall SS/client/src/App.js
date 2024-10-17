import "./style.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

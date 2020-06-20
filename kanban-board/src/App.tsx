import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/main.css";
import Routes from "./Routes";

function App() {
  return (
    <div className="h-full w-full">
      <ToastContainer autoClose={3000} />
      <Routes />
    </div>
  );
}

export default App;

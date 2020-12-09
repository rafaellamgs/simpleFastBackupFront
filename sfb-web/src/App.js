import React from "react";
import Routes from "./routes";
import "./styles/global";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();
const App = () => (
    <>
        <Routes /> <ToastContainer />
    </>
);
export default App;

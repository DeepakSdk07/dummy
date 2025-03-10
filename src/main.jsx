// Library Imports
import React, { Suspense } from "react";
import { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// Files import
// import App from "./App";
import { store } from "./common/store/store";
import Loader from "./components/Loader/Loader";
import "./index.css";

const MyApp = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        {/* <App /> */}
        <MyApp />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

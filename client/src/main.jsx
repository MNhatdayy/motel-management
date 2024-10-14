import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/index.scss";
import { ConfigProvider, App as AntdApp } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider>
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);

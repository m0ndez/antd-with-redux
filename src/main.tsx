import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { StrictMode, Suspense } from "react";
import { initI18n } from "../locales/i18n.ts";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

initI18n();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Suspense>
          <App />
        </Suspense>
      </Provider>
    </PersistGate>
  </StrictMode>
);

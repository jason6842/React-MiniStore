import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext.js";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createIDBPersister } from "./utils/createIDBPersister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

// This is for local storage and can be visible at 
// DevTools -> Application -> Storage -> Local Storage -> http://localhost:5173 
// a visible key : REACT_QUERY_OFFLINE_CACHE

// const localStoragePersister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

// persistQueryClient({
//   queryClient,
//   persister: localStoragePersister,
// });

// Indexed DB
const indexedDBPersister = createIDBPersister();

persistQueryClient({
  queryClient,
  persister: indexedDBPersister,
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);

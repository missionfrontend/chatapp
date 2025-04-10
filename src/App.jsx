import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import Login from "./Login/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatLayout from "./ui/ChatLayout";
import Chat from "./pages/Chat";
import NoChat from "./components/NoChat";
import { LoggedUser } from "./components/LoggedContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoggedUser>

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
              >
              {/* <Route path="/applayout" element={<AppLayout/>}/> */}
              <Route element={<ChatLayout />}>
                <Route path="/applayout" element={<NoChat />} />
                <Route path="/applayout/:uuid" element={<Chat />} />
              </Route>
            </Route>
            <Route index path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
        </LoggedUser>
      </QueryClientProvider>
    </>
  );
}

export default App;

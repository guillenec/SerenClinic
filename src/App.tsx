import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Toaster />
      <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
        <Navbar />
        <Sidebar />
        <main className="p-4 lg:p-6 bg-pastel-cloud">
          <Outlet />
        </main>
      </div>
    </>

  );
}
export default App
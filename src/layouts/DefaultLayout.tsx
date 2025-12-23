import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white text-center py-4 border-t text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ReactHub. All rights reserved.
      </footer>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";

export default function NavbarLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}


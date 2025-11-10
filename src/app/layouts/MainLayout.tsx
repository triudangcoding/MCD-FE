import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/Sidebar";

export default function MainLayout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}

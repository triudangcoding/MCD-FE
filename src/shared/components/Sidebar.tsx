import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { label: "Users", icon: UsersIcon, path: "/users" },
  { label: "Settings", icon: Cog6ToothIcon, path: "/settings" },
];

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          relative
          flex flex-col
          bg-gradient-to-b from-white to-gray-50
          border-r border-gray-200
          shadow-lg
          transition-all duration-500 ease-in-out
          ${isOpen ? "w-72" : "w-28"}
          z-10
        `}
      >
        {/* Toggle Button - Handle trên border bên phải */}
        <button
          onClick={toggleSidebar}
          className={`
            absolute
            top-1/2 -translate-y-1/2
            -right-3
            z-20
            w-6 h-16
            flex flex-col items-center justify-center gap-1
            bg-white
            border border-gray-200
            rounded-r-xl
            shadow-lg
            transition-all duration-300 ease-in-out
            hover:bg-gray-50
            hover:border-green-300
            hover:shadow-xl
            hover:scale-105
            active:scale-95
            group
          `}
          aria-label="Toggle sidebar"
        >
          {/* Toggle Icon */}
          {isOpen ? (
            <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-all duration-300" />
          ) : (
            <ChevronDoubleRightIcon className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-all duration-300" />
          )}
        </button>

        {/* Header */}
        <div className={`
          relative
          flex items-center
          border-b border-gray-200 bg-white
          transition-all duration-300 ease-in-out
          ${isOpen ? "justify-start p-5" : "justify-center px-3 py-3"}
        `}>
          {/* Logo Button */}
          <button
            onClick={handleLogoClick}
            className={`
              flex items-center justify-center
              transition-all duration-300 ease-in-out
              hover:opacity-80 active:scale-95
              cursor-pointer
              flex-shrink-0
              ${isOpen ? "gap-3" : ""}
            `}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span
              className={`
                text-xl font-bold text-gray-800 whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${isOpen 
                  ? "opacity-100 translate-x-0 w-auto" 
                  : "opacity-0 w-0 overflow-hidden"
                }
              `}
            >
              HKSMS
            </span> 
          </button>
        </div>

        {/* Navigation */}
        <nav className={`
          flex-1 space-y-2 overflow-y-auto overflow-x-hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "p-4" : "px-2 py-2"}
        `}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={`
                  group
                  flex items-center
                  rounded-xl
                  transition-all duration-300 ease-in-out
                  relative
                  ${isOpen 
                    ? "px-4 py-3 gap-4 justify-start" 
                    : "px-0 py-2.5 justify-center"
                  }
                  ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-white hover:text-green-700"
                  }
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Hover effect background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                )}
                
                {/* Icon */}
                <div
                  className={`
                    relative z-10 flex-shrink-0 transition-transform duration-300
                    ${isActive 
                      ? "scale-110" 
                      : "group-hover:scale-110 group-hover:text-green-600"
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                
                {/* Label */}
                <span
                  className={`
                    relative z-10
                    font-medium
                    whitespace-nowrap
                    transition-all duration-300 ease-in-out
                    ${isOpen 
                      ? "opacity-100 translate-x-0 w-auto" 
                      : "opacity-0 w-0 overflow-hidden absolute"
                    }
                  `}
                >
                  {item.label}
                </span>
                
                {/* Active indicator - chỉ hiển thị khi mở */}
                {isOpen && isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/30 rounded-r-full" />
                )}
                {isOpen && !isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-green-500 rounded-r-full group-hover:h-8 transition-all duration-300" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div 
          className={`
            p-4 border-t border-gray-200 bg-white
            transition-all duration-300 ease-in-out
          `}
        >
          <div
            className={`
              transition-all duration-300 ease-in-out
              ${isOpen 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-2 pointer-events-none h-0"
              }
            `}
          >
            <p className="text-xs text-gray-500 text-center">
              © 2025 HKSMS
            </p>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}

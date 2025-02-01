import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  AlertCircle,
} from "lucide-react";

export const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "supervisor"],
    },
    {
      path: "/pos",
      name: "Point de Vente",
      icon: ShoppingCart,
      roles: ["admin", "supervisor", "seller"],
    },
    {
      path: "/products",
      name: "Produits",
      icon: Package,
      roles: ["admin"],
    },
    {
      path: "/clients",
      name: "Clients",
      icon: Users,
      roles: ["admin", "supervisor"],
    },
    {
      path: "/alerts",
      name: "Alertes",
      icon: AlertCircle,
      roles: ["admin", "supervisor"],
    },
    {
      path: "/settings",
      name: "Paramètres",
      icon: Settings,
      roles: ["admin"],
    },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen p-4 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">Hasbandgesco</h2>
      </div>
      <nav className="space-y-2">
        {menuItems
          .filter((item) => item.roles.includes(user?.role || ""))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};
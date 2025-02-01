import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FileText,
  CreditCard,
  Settings,
  AlertCircle,
  Users,
} from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    {
      path: "/",
      name: "Tableau de bord",
      icon: LayoutDashboard,
    },
    {
      path: "/pos",
      name: "Point de Vente",
      icon: ShoppingCart,
    },
    {
      path: "/products",
      name: "Produits",
      icon: Package,
    },
    {
      path: "/reports",
      name: "Rapports",
      icon: FileText,
    },
    {
      path: "/credits",
      name: "Crédits",
      icon: CreditCard,
    },
    {
      path: "/clients",
      name: "Clients",
      icon: Users,
    },
    {
      path: "/alerts",
      name: "Alertes",
      icon: AlertCircle,
    },
    {
      path: "/settings",
      name: "Paramètres",
      icon: Settings,
    },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen p-4 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">Hasbandgesco</h2>
        <p className="text-sm text-gray-500">Gestion de librairie</p>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
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

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
  MessageSquare,
  Mail,
  CheckSquare,
} from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    {
      section: "Gestion",
      items: [
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
          path: "/clients",
          name: "Clients",
          icon: Users,
        },
      ],
    },
    {
      section: "Communication",
      items: [
        {
          path: "/chat",
          name: "Messages",
          icon: MessageSquare,
        },
        {
          path: "/email",
          name: "Email",
          icon: Mail,
        },
        {
          path: "/todo",
          name: "Tâches",
          icon: CheckSquare,
        },
      ],
    },
    {
      section: "Administration",
      items: [
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
          path: "/alerts",
          name: "Alertes",
          icon: AlertCircle,
        },
        {
          path: "/settings",
          name: "Paramètres",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen p-4 border-r">
      <div className="mb-8">
        <div className="flex items-center gap-2 px-4">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <h2 className="text-xl font-semibold">COMPUTER BUSINESS CENTER</h2>
        </div>
      </div>

      <nav className="space-y-8">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-xs uppercase text-gray-500 font-medium px-4 mb-2">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""}`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

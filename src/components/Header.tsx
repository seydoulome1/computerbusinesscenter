import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Hasbandgesco</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{user?.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-5 w-5 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
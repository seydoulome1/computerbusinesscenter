
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">EDOH GESCO</h1>
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Rechercher un produit ou une facture..."
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

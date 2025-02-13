import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Package, Search } from "lucide-react";
import { globalProducts } from "./Products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const addToCart = (product: typeof globalProducts[0]) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Erreur",
        description: "Le panier est vide",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Vente effectuée avec succès",
    });
    setCart([]);
  };

  const filteredProducts = globalProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
      {/* Section des produits */}
      <div className="col-span-8">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Button
                key={product.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => addToCart(product)}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded mb-2"
                  />
                ) : (
                  <Package className="h-16 w-16 mb-2" />
                )}
                <span className="font-medium text-sm">{product.name}</span>
                <span className="text-sm text-gray-600">{product.price} FCFA</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Section du panier */}
      <div className="col-span-4">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Panier</h2>
          <div className="mb-4 max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Qté</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price * item.quantity} FCFA</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">{calculateTotal()} FCFA</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="h-12 text-lg"
                >
                  {num}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-primary text-white"
              size="lg"
            >
              Payer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default POS;

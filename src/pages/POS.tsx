
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Package, Search, Printer, User } from "lucide-react";
import { globalProducts } from "./Products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const demoClients: Client[] = [
  { id: "1", name: "Jean Dupont", phone: "+229 97 12 34 56", email: "jean@example.com" },
  { id: "2", name: "Marie Koné", phone: "+229 95 98 76 54", email: "marie@example.com" },
];

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentSale, setCurrentSale] = useState<{ items: CartItem[]; total: number; date: Date; client?: Client } | null>(null);
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

    const sale = {
      items: [...cart],
      total: calculateTotal(),
      date: new Date(),
      client: selectedClient || undefined
    };

    setCurrentSale(sale);
    setShowReceipt(true);
    
    toast({
      title: "Succès",
      description: "Vente effectuée avec succès",
    });
  };

  const handlePrintReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    if (receiptWindow) {
      receiptWindow.document.write(`
        <html>
          <head>
            <title>Reçu - EDOH GESCO</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .items { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .total { text-align: right; margin-top: 20px; }
              @media print {
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>EDOH GESCO</h1>
              <p>Reçu de vente</p>
              <p>Date: ${currentSale?.date.toLocaleDateString()} ${currentSale?.date.toLocaleTimeString()}</p>
              ${currentSale?.client ? `
                <div>
                  <p>Client: ${currentSale.client.name}</p>
                  <p>Téléphone: ${currentSale.client.phone}</p>
                </div>
              ` : ''}
            </div>
            <table class="items">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${currentSale?.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price} FCFA</td>
                    <td>${item.price * item.quantity} FCFA</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">
              <h3>Total: ${currentSale?.total} FCFA</h3>
            </div>
            <button onclick="window.print()">Imprimer</button>
          </body>
        </html>
      `);
      receiptWindow.document.close();
    }
  };

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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Panier</h2>
            <Select onValueChange={(value) => {
              const client = demoClients.find(c => c.id === value);
              setSelectedClient(client || null);
            }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {demoClients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedClient && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{selectedClient.name}</span>
              </div>
              <div className="text-sm text-gray-600">{selectedClient.phone}</div>
            </div>
          )}
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

      {/* Modal du reçu */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reçu de vente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">EDOH GESCO</h2>
              <p className="text-sm text-gray-600">
                {currentSale?.date.toLocaleDateString()} {currentSale?.date.toLocaleTimeString()}
              </p>
            </div>
            {currentSale?.client && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{currentSale.client.name}</p>
                <p className="text-sm text-gray-600">{currentSale.client.phone}</p>
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Qté</TableHead>
                  <TableHead>Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSale?.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price * item.quantity} FCFA</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <p className="font-bold">Total: {currentSale?.total} FCFA</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                handlePrintReceipt();
                setShowReceipt(false);
                setCart([]);
                setSelectedClient(null);
              }}
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer le reçu
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POS;

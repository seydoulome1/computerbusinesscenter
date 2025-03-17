
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Package, Search, Printer, User, Plus, Minus } from "lucide-react";
import { globalProducts } from "@/types/product";
import "@/data/products";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Client {
  name: string;
  phone: string;
  email: string;
  address: string;
  dueDate?: Date;
}

type PaymentMethod = "cash" | "mobile_money" | "credit";

interface SaleData {
  items: CartItem[];
  total: number;
  date: Date;
  client?: Client;
  paymentMethod: PaymentMethod;
}

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentSale, setCurrentSale] = useState<SaleData | null>(null);
  const [clientInfo, setClientInfo] = useState<Client | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const { toast } = useToast();

  const categories = [
    { id: "beverages", name: "Boissons" },
    { id: "electronics", name: "Électronique" },
    { id: "stationery", name: "Papeterie" },
    { id: "fruits", name: "Fruits et Légumes" },
    { id: "services", name: "Services" },
  ];

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

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
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

    if (paymentMethod === "credit" && !clientInfo) {
      toast({
        title: "Erreur",
        description: "Les informations client sont obligatoires pour un paiement à crédit",
        variant: "destructive",
      });
      setShowClientDialog(true);
      return;
    }

    if (paymentMethod !== "credit") {
      finalizeSale();
    } else {
      if (clientInfo) {
        finalizeSale();
      }
    }
  };

  const finalizeSale = () => {
    const sale: SaleData = {
      items: [...cart],
      total: calculateTotal(),
      date: new Date(),
      client: clientInfo || undefined,
      paymentMethod: paymentMethod,
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
            <title>Reçu - COMPUTER BUSINESS CENTER</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .items { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .total { text-align: right; margin-top: 20px; }
              .payment-info { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
              @media print {
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>COMPUTER BUSINESS CENTER</h1>
              <p>Téléphone : +228 91254591, +228 99019805</p>
              <p>Email : contact@computerbusinesscenter.fr</p>
              <p>Reçu de vente</p>
              <p>Date: ${currentSale?.date.toLocaleDateString()} ${currentSale?.date.toLocaleTimeString()}</p>
              ${currentSale?.client ? `
                <div>
                  <p>Client: ${currentSale.client.name}</p>
                  <p>Téléphone: ${currentSale.client.phone}</p>
                  <p>Email: ${currentSale.client.email}</p>
                </div>
              ` : ''}
            </div>
            <table class="items">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix</th>
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
            <div class="payment-info">
              <p>Mode de paiement: ${
                currentSale?.paymentMethod === "cash" ? "Espèces" :
                currentSale?.paymentMethod === "mobile_money" ? "Mobile Money" :
                "Crédit"
              }</p>
            </div>
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

  const filteredProducts = globalProducts.filter((product) =>
    searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6 p-6">
      <div className="w-[400px] flex flex-col gap-4">
        <Card className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Panier</h2>
              <Badge variant="secondary">{cart.length}</Badge>
            </div>
            <Button variant="outline" onClick={() => setShowClientDialog(true)}>
              <User className="h-4 w-4 mr-2" />
              {clientInfo ? 'Modifier client' : 'Ajouter client'}
            </Button>
          </div>

          {clientInfo && (
            <div className="mb-4 p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{clientInfo.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">{clientInfo.phone}</div>
            </div>
          )}

          <div className="h-[calc(100vh-26rem)] overflow-y-auto mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-center">Qté</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.price * item.quantity}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div>
              <Label>Mode de paiement</Label>
              <Select 
                value={paymentMethod} 
                onValueChange={(value: PaymentMethod) => {
                  setPaymentMethod(value);
                  if (value === "credit" && !clientInfo) {
                    setShowClientDialog(true);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le mode de paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Espèces</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="credit">Crédit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{calculateTotal()} FCFA</span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full"
              size="lg"
            >
              Payer
            </Button>
          </div>
        </Card>
      </div>

      <Card className="flex-1 p-6">
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

        <Tabs defaultValue={categories[0].id} className="h-[calc(100vh-12rem)]">
          <TabsList className="mb-4 bg-transparent border-b w-full rounded-none">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="h-full">
              <div className="grid grid-cols-4 gap-4 h-full overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Button
                    key={product.id}
                    variant="outline"
                    className="h-auto aspect-square p-4 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50"
                    onClick={() => addToCart(product)}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded mb-2"
                      />
                    ) : (
                      <Package className="h-20 w-20 mb-2 text-muted-foreground" />
                    )}
                    <span className="font-medium text-sm text-center line-clamp-2">{product.name}</span>
                    <span className="text-sm text-muted-foreground">{product.price} FCFA</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informations du client</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nom</Label>
              <Input
                className="col-span-3"
                value={clientInfo?.name || ''}
                onChange={(e) => setClientInfo(prev => ({ ...prev || {}, name: e.target.value } as Client))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Téléphone</Label>
              <Input
                className="col-span-3"
                value={clientInfo?.phone || ''}
                onChange={(e) => setClientInfo(prev => ({ ...prev || {}, phone: e.target.value } as Client))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input
                className="col-span-3"
                type="email"
                value={clientInfo?.email || ''}
                onChange={(e) => setClientInfo(prev => ({ ...prev || {}, email: e.target.value } as Client))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Adresse</Label>
              <Input
                className="col-span-3"
                value={clientInfo?.address || ''}
                onChange={(e) => setClientInfo(prev => ({ ...prev || {}, address: e.target.value } as Client))}
              />
            </div>
            {paymentMethod === 'credit' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Date d'échéance</Label>
                <Input
                  className="col-span-3"
                  type="date"
                  value={clientInfo?.dueDate ? new Date(clientInfo.dueDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setClientInfo(prev => ({ 
                    ...prev || {}, 
                    dueDate: e.target.value ? new Date(e.target.value) : undefined 
                  } as Client))}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setClientInfo(null);
              setShowClientDialog(false);
            }}>
              Annuler
            </Button>
            <Button onClick={() => {
              if (paymentMethod === 'credit' && !clientInfo?.dueDate) {
                toast({
                  title: "Erreur",
                  description: "La date d'échéance est obligatoire pour un paiement à crédit",
                  variant: "destructive",
                });
                return;
              }
              setShowClientDialog(false);
            }}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reçu de vente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">COMPUTER BUSINESS CENTER</h2>
              <p className="text-sm text-gray-600">Téléphone : +228 91254591, +228 99019805</p>
              <p className="text-sm text-gray-600">Email : contact@computerbusinesscenter.fr</p>
              <p className="text-sm text-gray-600">
                {currentSale?.date.toLocaleDateString()} {currentSale?.date.toLocaleTimeString()}
              </p>
            </div>
            {currentSale?.client && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{currentSale.client.name}</p>
                <p className="text-sm text-gray-600">{currentSale.client.phone}</p>
                <p className="text-sm text-gray-600">{currentSale.client.email}</p>
                <p className="text-sm text-gray-600">{currentSale.client.address}</p>
                {currentSale.client.dueDate && (
                  <p className="text-sm font-medium text-primary">
                    Date d'échéance: {currentSale.client.dueDate.toLocaleDateString()}
                  </p>
                )}
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
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Mode de paiement: {
                  currentSale?.paymentMethod === "cash" ? "Espèces" :
                  currentSale?.paymentMethod === "mobile_money" ? "Mobile Money" :
                  "Crédit"
                }
              </p>
              <p className="font-bold text-right">Total: {currentSale?.total} FCFA</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                handlePrintReceipt();
                setShowReceipt(false);
                setCart([]);
                setClientInfo(null);
                setPaymentMethod("cash");
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


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  // Simulation des données
  const salesData = [
    {
      id: "1",
      date: new Date("2024-02-20T10:30:00"),
      products: [
        { name: "Cahier", quantity: 2, price: 500 },
        { name: "Stylo", quantity: 3, price: 200 }
      ],
      total: 1600,
      paymentMethod: "Espèces",
      seller: {
        name: "John Doe",
        role: "Caissier"
      }
    },
    {
      id: "2",
      date: new Date("2024-02-20T14:15:00"),
      products: [
        { name: "Cartable", quantity: 1, price: 5000 }
      ],
      total: 5000,
      paymentMethod: "Mobile Money",
      seller: {
        name: "Jane Smith",
        role: "Superviseur"
      }
    },
  ];

  const inventoryData = [
    {
      id: "1",
      name: "Cahier",
      initialStock: 100,
      currentStock: 80,
      sold: 20,
      price: 500
    },
    {
      id: "2",
      name: "Stylo",
      initialStock: 200,
      currentStock: 150,
      sold: 50,
      price: 200
    }
  ];

  const handleDownloadReport = () => {
    // Simuler le téléchargement
    toast({
      title: "Téléchargement du rapport",
      description: "Le rapport a été téléchargé avec succès",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="sales" className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Rapports</h1>
            <TabsList>
              <TabsTrigger value="sales">Ventes</TabsTrigger>
              <TabsTrigger value="inventory">Inventaire</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleDownloadReport} className="flex gap-2">
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </div>

        <TabsContent value="sales" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Résumé des ventes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="text-sm font-medium">Total des ventes</h3>
                  <p className="text-2xl font-bold">6,600 FCFA</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="text-sm font-medium">Nombre de transactions</h3>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="text-sm font-medium">Moyenne par vente</h3>
                  <p className="text-2xl font-bold">3,300 FCFA</p>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Produits</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Mode de paiement</TableHead>
                  <TableHead>Vendeur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{format(sale.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(sale.date, "HH:mm")}</TableCell>
                    <TableCell>
                      {sale.products.map((product, index) => (
                        <div key={index}>
                          {product.name} ({product.quantity}x) - {product.price} FCFA/unité
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{sale.total} FCFA</TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                    <TableCell>
                      {sale.seller.name}
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {sale.seller.role}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">État de l'inventaire</h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Stock initial</TableHead>
                  <TableHead>Stock actuel</TableHead>
                  <TableHead>Vendus</TableHead>
                  <TableHead>Prix unitaire</TableHead>
                  <TableHead>Valeur totale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.initialStock}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>{item.sold}</TableCell>
                    <TableCell>{item.price} FCFA</TableCell>
                    <TableCell>{item.currentStock * item.price} FCFA</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

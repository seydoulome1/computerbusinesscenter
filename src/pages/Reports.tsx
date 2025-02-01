import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Reports = () => {
  // Simulons des données de rapport
  const salesData = [
    {
      id: "1",
      date: "2024-02-20",
      products: "Cahier (2x), Stylo (3x)",
      total: 1600,
      paymentMethod: "Espèces",
    },
    {
      id: "2",
      date: "2024-02-20",
      products: "Cartable (1x)",
      total: 5000,
      paymentMethod: "Mobile Money",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rapports des ventes</h1>
        <Button>Télécharger le rapport</Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Résumé du jour</h2>
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
              <TableHead>Produits</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Mode de paiement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.products}</TableCell>
                <TableCell>{sale.total} FCFA</TableCell>
                <TableCell>{sale.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Reports;
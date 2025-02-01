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

const Credits = () => {
  // Simulons des données de crédit
  const creditsData = [
    {
      id: "1",
      clientName: "John Doe",
      amount: 15000,
      dueDate: "2024-03-01",
      status: "En attente",
    },
    {
      id: "2",
      clientName: "Jane Smith",
      amount: 25000,
      dueDate: "2024-03-15",
      status: "En attente",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Crédits</h1>
        <Button>Nouveau crédit</Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Résumé des crédits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium">Total des crédits</h3>
              <p className="text-2xl font-bold">40,000 FCFA</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium">Nombre de crédits</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-sm font-medium">Crédits en retard</h3>
              <p className="text-2xl font-bold text-red-500">0</p>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Date d'échéance</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditsData.map((credit) => (
              <TableRow key={credit.id}>
                <TableCell>{credit.clientName}</TableCell>
                <TableCell>{credit.amount} FCFA</TableCell>
                <TableCell>{credit.dueDate}</TableCell>
                <TableCell>{credit.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Marquer comme payé
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Credits;
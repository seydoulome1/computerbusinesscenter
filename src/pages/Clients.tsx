
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Clients = () => {
  // Données simulées des clients
  const clients = [
    {
      id: "1",
      name: "Jean Dupont",
      phone: "+229 97 12 34 56",
      email: "jean@example.com",
      totalPurchases: 250000,
      lastVisit: "2024-02-15",
    },
    {
      id: "2",
      name: "Marie Koné",
      phone: "+229 95 98 76 54",
      email: "marie@example.com",
      totalPurchases: 180000,
      lastVisit: "2024-02-18",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Button>Ajouter un client</Button>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Achats</TableHead>
              <TableHead>Dernière visite</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.totalPurchases.toLocaleString()} FCFA</TableCell>
                <TableCell>{client.lastVisit}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Éditer
                    </Button>
                    <Button variant="outline" size="sm">
                      Historique
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Clients;

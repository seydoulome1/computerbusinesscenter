
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
  const clients = [
    {
      id: "1",
      name: "Kodjo Agbeko",
      phone: "+228 90 12 34 56",
      email: "kodjo.agbeko@email.com",
      totalPurchases: 250000,
      lastVisit: "2024-02-15",
    },
    {
      id: "2",
      name: "Amah Mensah",
      phone: "+228 91 23 45 67",
      email: "amah.mensah@email.com",
      totalPurchases: 180000,
      lastVisit: "2024-02-18",
    },
    {
      id: "3",
      name: "Kokou Atsu",
      phone: "+228 70 45 67 89",
      email: "kokou.atsu@email.com",
      totalPurchases: 320000,
      lastVisit: "2024-02-20",
    },
    {
      id: "4",
      name: "Afi Adjo",
      phone: "+228 93 78 90 12",
      email: "afi.adjo@email.com",
      totalPurchases: 150000,
      lastVisit: "2024-02-22",
    },
    {
      id: "5",
      name: "Yawo Koffi",
      phone: "+228 96 34 56 78",
      email: "yawo.koffi@email.com",
      totalPurchases: 420000,
      lastVisit: "2024-02-23",
    },
    {
      id: "6",
      name: "Essonam Ayele",
      phone: "+228 92 67 89 01",
      email: "essonam.ayele@email.com",
      totalPurchases: 280000,
      lastVisit: "2024-02-24",
    },
    {
      id: "7",
      name: "Folly Amedzro",
      phone: "+228 97 89 01 23",
      email: "folly.amedzro@email.com",
      totalPurchases: 195000,
      lastVisit: "2024-02-25",
    },
    {
      id: "8",
      name: "Akua Sena",
      phone: "+228 98 12 34 56",
      email: "akua.sena@email.com",
      totalPurchases: 310000,
      lastVisit: "2024-02-26",
    },
    {
      id: "9",
      name: "Kossi Atchou",
      phone: "+228 99 23 45 67",
      email: "kossi.atchou@email.com",
      totalPurchases: 270000,
      lastVisit: "2024-02-27",
    },
    {
      id: "10",
      name: "Yawa Abra",
      phone: "+228 91 45 67 89",
      email: "yawa.abra@email.com",
      totalPurchases: 340000,
      lastVisit: "2024-02-28",
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


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, Package, AlertTriangle, CreditCard, 
  StoreIcon, BarChart2, LineChart, Users 
} from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer 
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Données simulées pour les graphiques
const salesData = [
  { name: "Jan", boutique1: 4000, boutique2: 2400 },
  { name: "Fév", boutique1: 3000, boutique2: 1398 },
  { name: "Mar", boutique1: 2000, boutique2: 9800 },
  { name: "Avr", boutique1: 2780, boutique2: 3908 },
  { name: "Mai", boutique1: 1890, boutique2: 4800 },
  { name: "Juin", boutique1: 2390, boutique2: 3800 },
];

const categoryData = [
  { name: "Fournitures", ventes: 4000 },
  { name: "Papeterie", ventes: 3000 },
  { name: "Bureautique", ventes: 2000 },
  { name: "Informatique", ventes: 2780 },
];

const topSellingProducts = [
  { name: "Cahier 200 pages", quantity: 150, revenue: 75000 },
  { name: "Stylo bleu", quantity: 300, revenue: 45000 },
  { name: "Cartable", quantity: 50, revenue: 250000 },
  { name: "Crayon", quantity: 200, revenue: 20000 },
  { name: "Règle 30cm", quantity: 100, revenue: 25000 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-playfair">TABLEAU DE BORD EDOH PRESTATION</h1>
        <div className="flex gap-2">
          <select className="rounded-md border p-2">
            <option>BOUTIQUE PRINCIPALE</option>
            <option>BOUTIQUE ANNEXE</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Statistiques clés */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ventes du jour</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150,000 FCFA</div>
            <p className="text-xs text-muted-foreground">+20% vs hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produits en stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">23 catégories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertes stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">5</div>
            <p className="text-xs text-muted-foreground">Produits critiques</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12 cette semaine</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Comparaison des ventes par boutique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="boutique1" 
                    stroke="#8884d8" 
                    name="Boutique 711"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="boutique2" 
                    stroke="#82ca9d" 
                    name="Boutique 712"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Ventes par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventes" fill="#8884d8" name="Ventes (FCFA)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Produits les plus vendus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité vendue</TableHead>
                  <TableHead>Chiffre d'affaires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.revenue} FCFA</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Liste des alertes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Alertes récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">Stock critique : Cahiers 200 pages</p>
                <p className="text-sm text-gray-600">Reste 5 unités (seuil: 20)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium">Crédit à échéance</p>
                <p className="text-sm text-gray-600">Client: John Doe - 50,000 FCFA - Échéance: 2 jours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

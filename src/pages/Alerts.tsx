
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Package, DollarSign, UserX } from "lucide-react";
import { globalProducts } from "./Products";

const Alerts = () => {
  const lowStockProducts = globalProducts.filter(
    (product) => product.stock <= product.alertThreshold
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Alertes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 bg-red-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Package className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-red-600 font-medium">Stock faible</p>
              <p className="text-2xl font-bold">{lowStockProducts.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-yellow-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-yellow-600 font-medium">Paiements en attente</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-blue-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserX className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Clients inactifs</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </Card>
      </div>

      {lowStockProducts.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            {lowStockProducts.length} produits sont en stock faible et nécessitent un réapprovisionnement.
          </AlertDescription>
        </Alert>
      )}

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Produits en stock faible</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Stock actuel</TableHead>
              <TableHead>Seuil d'alerte</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.alertThreshold}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    Stock faible
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Alerts;

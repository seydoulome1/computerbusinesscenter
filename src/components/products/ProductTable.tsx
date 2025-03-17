
import React from "react";
import { Pencil, Trash2, Mouse, Printer, Monitor, Laptop, HardDrive, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onEditClick: (product: Product) => void;
  onDeleteClick: (productId: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEditClick,
  onDeleteClick,
}) => {
  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'périphériques':
        return <Mouse className="w-5 h-5 text-blue-500" />;
      case 'imprimantes':
        return <Printer className="w-5 h-5 text-blue-500" />;
      case 'écrans':
        return <Monitor className="w-5 h-5 text-blue-500" />;
      case 'ordinateurs portables':
        return <Laptop className="w-5 h-5 text-blue-500" />;
      case 'stockage':
        return <HardDrive className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Seuil d'alerte</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="w-12 h-12 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  product.icon || <Package className="w-full h-full p-2" />
                )}
              </div>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getCategoryIcon(product.category)}
                {product.category}
              </div>
            </TableCell>
            <TableCell>{product.price.toLocaleString()} FCFA</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.alertThreshold}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onEditClick(product)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700" 
                  onClick={() => onDeleteClick(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

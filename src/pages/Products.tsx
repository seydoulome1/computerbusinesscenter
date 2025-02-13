
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Package } from "lucide-react";
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

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  alertThreshold: number;
  image: string;
}

// État global des produits (simulé)
export let globalProducts: Product[] = [
  {
    id: "1",
    name: "Cahier 200 pages",
    category: "Fournitures scolaires",
    price: 500,
    stock: 100,
    alertThreshold: 20,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Stylo bleu",
    category: "Fournitures scolaires",
    price: 200,
    stock: 150,
    alertThreshold: 30,
    image: "/placeholder.svg",
  },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(globalProducts);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    alertThreshold: 0,
    image: "/placeholder.svg",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      // Pour la démonstration, on utilise une URL locale
      setNewProduct({
        ...newProduct,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };

    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    globalProducts = updatedProducts; // Mise à jour de l'état global

    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      alertThreshold: 0,
      image: "/placeholder.svg",
    });
    setSelectedImage(null);

    toast({
      title: "Succès",
      description: "Produit ajouté avec succès",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Produits</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter un produit</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau produit</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label>Image du produit</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {newProduct.image && (
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={newProduct.image}
                      alt="Aperçu"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <label>Nom du produit</label>
                <Input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label>Catégorie</label>
                <Input
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label>Prix</label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label>Stock</label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label>Seuil d'alerte</label>
                <Input
                  type="number"
                  value={newProduct.alertThreshold}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      alertThreshold: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Button onClick={handleAddProduct}>Ajouter</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Seuil d'alerte</TableHead>
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
                      <Package className="w-full h-full p-2" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price} FCFA</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.alertThreshold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Products;

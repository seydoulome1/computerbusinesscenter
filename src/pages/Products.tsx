import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Package, Pencil, Trash2 } from "lucide-react";
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  alertThreshold: number;
  image: string;
}

export let globalProducts: Product[] = [
  {
    id: "1",
    name: "Cahier 200 pages",
    category: "Fournitures scolaires",
    price: 500,
    stock: 100,
    alertThreshold: 20,
    image: "/images/cahier.jpg",
  },
  {
    id: "2",
    name: "Stylo bleu",
    category: "Fournitures scolaires",
    price: 200,
    stock: 150,
    alertThreshold: 30,
    image: "/images/stylo-bleu.jpg",
  },
  {
    id: "3",
    name: "Règle 30cm",
    category: "Fournitures scolaires",
    price: 300,
    stock: 80,
    alertThreshold: 15,
    image: "/images/regle.jpg",
  },
  {
    id: "4",
    name: "Crayon à papier",
    category: "Fournitures scolaires",
    price: 100,
    stock: 200,
    alertThreshold: 40,
    image: "/images/crayon.jpg",
  },
  {
    id: "5",
    name: "Gomme blanche",
    category: "Fournitures scolaires",
    price: 150,
    stock: 120,
    alertThreshold: 25,
    image: "/images/gomme.jpg",
  },
  {
    id: "6",
    name: "Classeur A4",
    category: "Rangement",
    price: 1500,
    stock: 50,
    alertThreshold: 10,
    image: "/images/classeur.jpg",
  },
  {
    id: "7",
    name: "Calculatrice scientifique",
    category: "Équipement",
    price: 5000,
    stock: 30,
    alertThreshold: 5,
    image: "/images/calculatrice.jpg",
  },
  {
    id: "8",
    name: "Agenda 2024",
    category: "Papeterie",
    price: 2500,
    stock: 40,
    alertThreshold: 8,
    image: "/images/agenda.jpg",
  },
  {
    id: "9",
    name: "Cartouche d'encre",
    category: "Consommables",
    price: 3500,
    stock: 25,
    alertThreshold: 5,
    image: "/images/cartouche.jpg",
  },
  {
    id: "10",
    name: "Bloc-notes A5",
    category: "Papeterie",
    price: 800,
    stock: 90,
    alertThreshold: 20,
    image: "/images/bloc-notes.jpg",
  },
  {
    id: "11",
    name: "Marqueurs couleur",
    category: "Fournitures scolaires",
    price: 1200,
    stock: 60,
    alertThreshold: 12,
    image: "/images/marqueurs.jpg",
  },
  {
    id: "12",
    name: "Ciseaux",
    category: "Fournitures scolaires",
    price: 600,
    stock: 70,
    alertThreshold: 15,
    image: "/images/ciseaux.jpg",
  },
  {
    id: "13",
    name: "Agrafeuse",
    category: "Équipement bureau",
    price: 1800,
    stock: 35,
    alertThreshold: 7,
    image: "/images/agrafeuse.jpg",
  },
  {
    id: "14",
    name: "Chemise cartonnée",
    category: "Rangement",
    price: 400,
    stock: 150,
    alertThreshold: 30,
    image: "/images/chemise.jpg",
  },
  {
    id: "15",
    name: "Ruban adhésif",
    category: "Fournitures bureau",
    price: 350,
    stock: 100,
    alertThreshold: 20,
    image: "/images/ruban.jpg",
  }
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);

  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setNewProduct({
        ...newProduct,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      alertThreshold: 0,
      image: "/placeholder.svg",
    });
    setSelectedImage(null);
    setIsEditMode(false);
    setCurrentProductId(null);
  };

  const handleAddOrEditProduct = () => {
    if (!newProduct.name || !newProduct.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    let updatedProducts: Product[];

    if (isEditMode && currentProductId) {
      updatedProducts = products.map(product => 
        product.id === currentProductId ? { ...newProduct, id: currentProductId } : product
      );
      toast({
        title: "Succès",
        description: "Produit modifié avec succès",
      });
    } else {
      const product: Product = {
        ...newProduct,
        id: Date.now().toString(),
      };
      updatedProducts = [...products, product];
      toast({
        title: "Succès",
        description: "Produit ajouté avec succès",
      });
    }

    setProducts(updatedProducts);
    globalProducts = updatedProducts;
    resetForm();
    setIsAddEditDialogOpen(false);
  };

  const handleEditClick = (product: Product) => {
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      alertThreshold: product.alertThreshold,
      image: product.image,
    });
    setCurrentProductId(product.id);
    setIsEditMode(true);
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const updatedProducts = products.filter(product => product.id !== productToDelete);
      setProducts(updatedProducts);
      globalProducts = updatedProducts;
      toast({
        title: "Succès",
        description: "Produit supprimé avec succès",
      });
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Produits</h1>
        <Button onClick={() => {
          resetForm();
          setIsAddEditDialogOpen(true);
        }}>Ajouter un produit</Button>
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
                      <Package className="w-full h-full p-2" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price} FCFA</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.alertThreshold}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleEditClick(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700" 
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Modifier un produit" : "Ajouter un nouveau produit"}</DialogTitle>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsAddEditDialogOpen(false);
              }}>
                Annuler
              </Button>
              <Button onClick={handleAddOrEditProduct}>
                {isEditMode ? "Modifier" : "Ajouter"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce produit?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Le produit sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Annuler</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={confirmDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Products;

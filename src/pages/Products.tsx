import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Package, Pencil, Trash2, Mouse, Printer, Monitor, Laptop, HardDrive } from "lucide-react";
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
  icon?: JSX.Element;
}

export let globalProducts: Product[] = [
  {
    id: "1",
    name: "Souris sans fil Logitech M185",
    category: "Périphériques",
    price: 9500,
    stock: 45,
    alertThreshold: 10,
    image: "/images/souris.jpg",
    icon: <Mouse className="w-full h-full p-2" />,
  },
  {
    id: "2",
    name: "Imprimante HP LaserJet Pro M15w",
    category: "Imprimantes",
    price: 75000,
    stock: 12,
    alertThreshold: 3,
    image: "/images/imprimante.jpg",
    icon: <Printer className="w-full h-full p-2" />,
  },
  {
    id: "3",
    name: "Écran bureautique 22\" Dell SE2222H",
    category: "Écrans",
    price: 85000,
    stock: 18,
    alertThreshold: 5,
    image: "/images/ecran22.jpg",
    icon: <Monitor className="w-full h-full p-2" />,
  },
  {
    id: "4",
    name: "Écran bureautique 24\" HP P24v G4",
    category: "Écrans",
    price: 110000,
    stock: 10,
    alertThreshold: 3,
    image: "/images/ecran24.jpg",
    icon: <Monitor className="w-full h-full p-2" />,
  },
  {
    id: "5",
    name: "Écran bureautique 27\" ASUS VA27EHE",
    category: "Écrans",
    price: 145000,
    stock: 8,
    alertThreshold: 2,
    image: "/images/ecran27.jpg",
    icon: <Monitor className="w-full h-full p-2" />,
  },
  {
    id: "6",
    name: "Ordinateur portable HP 15s-eq1126nf",
    category: "Ordinateurs portables",
    price: 320000,
    stock: 7,
    alertThreshold: 2,
    image: "/images/laptop-hp.jpg",
    icon: <Laptop className="w-full h-full p-2" />,
  },
  {
    id: "7",
    name: "Ordinateur portable Dell Inspiron 15",
    category: "Ordinateurs portables",
    price: 349000,
    stock: 5,
    alertThreshold: 2,
    image: "/images/laptop-dell.jpg",
    icon: <Laptop className="w-full h-full p-2" />,
  },
  {
    id: "8",
    name: "Disque dur externe Seagate 1TB",
    category: "Stockage",
    price: 42000,
    stock: 22,
    alertThreshold: 5,
    image: "/images/hdd-external.jpg",
    icon: <HardDrive className="w-full h-full p-2" />,
  },
  {
    id: "9",
    name: "SSD Interne Samsung 860 EVO 500GB",
    category: "Stockage",
    price: 55000,
    stock: 15,
    alertThreshold: 4,
    image: "/images/ssd-internal.jpg",
    icon: <HardDrive className="w-full h-full p-2" />,
  },
  {
    id: "10",
    name: "Souris gaming Razer DeathAdder Essential",
    category: "Périphériques",
    price: 18500,
    stock: 20,
    alertThreshold: 5,
    image: "/images/souris-gaming.jpg",
    icon: <Mouse className="w-full h-full p-2" />,
  },
  {
    id: "11",
    name: "Clavier sans fil Logitech K380",
    category: "Périphériques",
    price: 25000,
    stock: 18,
    alertThreshold: 4,
    image: "/images/clavier.jpg",
    icon: <Package className="w-full h-full p-2" />,
  },
  {
    id: "12",
    name: "Imprimante Multifonction Canon PIXMA MG3650S",
    category: "Imprimantes",
    price: 65000,
    stock: 8,
    alertThreshold: 2,
    image: "/images/imprimante-canon.jpg",
    icon: <Printer className="w-full h-full p-2" />,
  },
  {
    id: "13",
    name: "Disque dur interne WD Blue 2TB",
    category: "Stockage",
    price: 48000,
    stock: 12,
    alertThreshold: 3,
    image: "/images/hdd-internal.jpg",
    icon: <HardDrive className="w-full h-full p-2" />,
  },
  {
    id: "14",
    name: "Ordinateur portable Lenovo IdeaPad 3",
    category: "Ordinateurs portables",
    price: 295000,
    stock: 6,
    alertThreshold: 2,
    image: "/images/laptop-lenovo.jpg",
    icon: <Laptop className="w-full h-full p-2" />,
  },
  {
    id: "15",
    name: "Câble HDMI 2.0 Premium 2m",
    category: "Câbles et adaptateurs",
    price: 8500,
    stock: 35,
    alertThreshold: 10,
    image: "/images/cable-hdmi.jpg",
    icon: <Package className="w-full h-full p-2" />,
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
              <label>Prix (FCFA)</label>
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


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { globalProducts } from "@/data/products";
import { Product, ProductFormData } from "@/types/product";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { DeleteConfirmationDialog } from "@/components/products/DeleteConfirmationDialog";
import { ProductIcon } from "@/components/products/ProductIcon";

const Products = () => {
  const [products, setProducts] = useState<Product[]>(
    globalProducts.map(product => ({
      ...product,
      icon: <ProductIcon category={product.category} />
    }))
  );
  const [newProduct, setNewProduct] = useState<ProductFormData>({
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

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setNewProduct({
      ...newProduct,
      [field]: value,
    });
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
        product.id === currentProductId ? { 
          ...newProduct, 
          id: currentProductId,
          icon: <ProductIcon category={newProduct.category} />
        } : product
      );
      toast({
        title: "Succès",
        description: "Produit modifié avec succès",
      });
    } else {
      const product: Product = {
        ...newProduct,
        id: Date.now().toString(),
        icon: <ProductIcon category={newProduct.category} />
      };
      updatedProducts = [...products, product];
      toast({
        title: "Succès",
        description: "Produit ajouté avec succès",
      });
    }

    setProducts(updatedProducts);
    globalProducts = updatedProducts.map(({ icon, ...rest }) => ({
      ...rest,
      icon: undefined
    }));
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
      globalProducts = updatedProducts.map(({ icon, ...rest }) => ({
        ...rest,
        icon: undefined
      }));
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
        <ProductTable 
          products={products} 
          onEditClick={handleEditClick} 
          onDeleteClick={handleDeleteClick}
        />
      </Card>

      <ProductFormDialog
        isOpen={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        isEditMode={isEditMode}
        productData={newProduct}
        onCancel={() => {
          resetForm();
          setIsAddEditDialogOpen(false);
        }}
        onSubmit={handleAddOrEditProduct}
        onImageChange={handleImageChange}
        onInputChange={handleInputChange}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default Products;

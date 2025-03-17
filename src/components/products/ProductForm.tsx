
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ProductFormData } from "@/types/product";

interface ProductFormProps {
  productData: ProductFormData;
  isEditMode: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (field: keyof ProductFormData, value: string | number) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  productData,
  isEditMode,
  onCancel,
  onSubmit,
  onImageChange,
  onInputChange,
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <label>Image du produit</label>
        <Input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="cursor-pointer"
        />
        {productData.image && (
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={productData.image}
              alt="Aperçu"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="grid gap-2">
        <label>Nom du produit</label>
        <Input
          value={productData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label>Catégorie</label>
        <Input
          value={productData.category}
          onChange={(e) => onInputChange("category", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label>Prix (FCFA)</label>
        <Input
          type="number"
          value={productData.price}
          onChange={(e) => onInputChange("price", Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <label>Stock</label>
        <Input
          type="number"
          value={productData.stock}
          onChange={(e) => onInputChange("stock", Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <label>Seuil d'alerte</label>
        <Input
          type="number"
          value={productData.alertThreshold}
          onChange={(e) => onInputChange("alertThreshold", Number(e.target.value))}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={onSubmit}>
          {isEditMode ? "Modifier" : "Ajouter"}
        </Button>
      </DialogFooter>
    </div>
  );
};

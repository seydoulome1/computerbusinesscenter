
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { ProductFormData } from "@/types/product";

interface ProductFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  productData: ProductFormData;
  onCancel: () => void;
  onSubmit: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (field: keyof ProductFormData, value: string | number) => void;
}

export const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  productData,
  onCancel,
  onSubmit,
  onImageChange,
  onInputChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Modifier un produit" : "Ajouter un nouveau produit"}</DialogTitle>
        </DialogHeader>
        <ProductForm
          productData={productData}
          isEditMode={isEditMode}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onImageChange={onImageChange}
          onInputChange={onInputChange}
        />
      </DialogContent>
    </Dialog>
  );
};

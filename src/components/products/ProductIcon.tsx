
import React from "react";
import { Package, Mouse, Printer, Monitor, Laptop, HardDrive } from "lucide-react";

interface ProductIconProps {
  category: string;
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ category, className = "w-full h-full p-2" }) => {
  switch (category) {
    case "Périphériques":
      return <Mouse className={className} />;
    case "Imprimantes":
      return <Printer className={className} />;
    case "Écrans":
      return <Monitor className={className} />;
    case "Ordinateurs portables":
      return <Laptop className={className} />;
    case "Stockage":
      return <HardDrive className={className} />;
    default:
      return <Package className={className} />;
  }
};

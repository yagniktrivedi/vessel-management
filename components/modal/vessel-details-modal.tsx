"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Product {
  name: string;
  quantity: number;
}

interface VesselCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (vesselData: {
    name: string;
    eta: string;
    products: Product[];
  }) => void;
}

export function VesselCreationModal({
  isOpen,
  onClose,
  onSubmit,
}: VesselCreationModalProps) {
  const [vesselName, setVesselName] = useState("");
  const [eta, setEta] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { name: "", quantity: 0 },
  ]);

  const handleAddProduct = () => {
    setProducts([...products, { name: "", quantity: 0 }]);
  };

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = () => {
    onSubmit({ name: vesselName, eta, products });
    onClose();
    // Reset form
    setVesselName("");
    setEta("");
    setProducts([{ name: "", quantity: 0 }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Vessel</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vesselName" className="text-right">
              Vessel Name
            </Label>
            <Input
              id="vesselName"
              value={vesselName}
              onChange={(e) => setVesselName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eta" className="text-right">
              ETA
            </Label>
            <Input
              id="eta"
              type="datetime-local"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid gap-4">
            <Label>Products</Label>
            {products.map((product, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Product name"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(index, "name", e.target.value)
                  }
                  className="flex-grow"
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-24"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveProduct(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddProduct}>
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Vessel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

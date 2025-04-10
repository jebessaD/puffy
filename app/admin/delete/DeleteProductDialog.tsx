import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import useProducts from "@/app/hooks/useProducts";
import { MutatorCallback } from "swr";

interface DeleteProductDialogProps {
  productId: number;
  mutate: MutatorCallback;
}

export function DeleteProductDialog({
  productId,
  mutate,
}: DeleteProductDialogProps) {
  const { toast } = useToast();

  const { deleteProduct } = useProducts();

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      await mutate();

      toast({
        title: "Success",
        description: "Product deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          // onClick={handleDelete}
          className="flex-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100
                      rounded-sm font-medium transform transition-all duration-300
                      opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                      flex items-center justify-center gap-2"
        >
          <Trash2 className="h-4 w-4 max-sm:hidden" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

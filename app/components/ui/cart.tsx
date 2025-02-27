import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LiaShoppingBagSolid } from "react-icons/lia";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <LiaShoppingBagSolid className="hover:scale-125 transition duration-500 text-3xl" />
      </SheetTrigger>
      <SheetContent className="max-sm:px-3 max-sm:w-full flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="text-center">Shopping Cart</SheetTitle>
          <SheetDescription className="text-center">
            Click Add to Cart when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="justify-center">
          <SheetClose asChild>
            <Button type="submit" className="w-full">
              Add to Cart
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

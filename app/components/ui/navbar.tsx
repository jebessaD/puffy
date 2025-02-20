// Navbar component to provide a top navigation bar for the website.
// This component will display links for navigation across the website.
import React from "react";
import Image from "next/image";
import { GoMail } from "react-icons/go";
import { BiLogoInstagram } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mx-4 sm:mx-6 lg:mx-16">
      {/* <h1>Example Component</h1>
      <p>This is a simple example component.</p> */}
      <div className="sm:hidden flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <RxHamburgerMenu className="text-3xl cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-t-none my-2 w-56">
            <DropdownMenuItem className="flex justify-between items-end">
              <span>Home</span>
              <IoIosArrowForward />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between items-end">
              <span>Shop All</span>
              <IoIosArrowForward />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between items-end">
              <span>New</span>
              <IoIosArrowForward />
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LiaShoppingBagSolid className="sm:hidden text-2xl cursor-pointer" />
      </div>
      <div className="flex items-center gap-6">
      <Image src="/image/PuffyLogo.png" alt="Puffy Logo" className="max-sm:-my-3" width={80} height={80} />
      <ul className="max-sm:hidden h-8 overflow-clip flex justify-center space-x-4 lg:space-x-7 text-xl font-light">
        <li className="hover:-translate-y-[29px] hover:cursor-pointer transition duration-1000">
          <div>Home</div>
          <div>Home</div>
        </li>
        <li className="hover:-translate-y-[27px] hover:cursor-pointer transition duration-1000">
          <div>Shop All</div>
          <div>Shop All</div>
        </li>
        <li className="hover:-translate-y-[29px] hover:cursor-pointer transition duration-1000">
          <div>New</div>
          <div>New</div>
        </li>
      </ul>
      </div>
      <div className="max-md:hidden text-2xl font-medium arsenal-sc-bold">THE PUFFY</div>
      <div className="flex gap-2 sm:max-lg:gap-4 lg:gap-6">
      <GoMail className="text-2xl sm:text-3xl cursor-pointer" />
      <BiLogoInstagram className="text-2xl sm:text-3xl cursor-pointer" />
      <GoPerson className="max-sm:hidden sm:text-3xl cursor-pointer" />
      <LiaShoppingBagSolid className="max-sm:hidden sm:text-3xl cursor-pointer" />
      {/* <GoMail className="text-2xl sm:text-3xl cursor-pointer" /> */}
      </div>
    </div>
  );
}

"use client";

import SidebarLink from "./sidebarLink";
import { SiReaddotcv } from "react-icons/si";
import { RiApps2AddLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    {
      href: "/admin/product",
      label: "Add Products",
      icon: <RiApps2AddLine size={24} />,
    },
    {
      href: "/admin/edit",
      label: "Edit Products",
      icon: <TbEdit size={24} />,
    },
    {
      href: "/admin/order",
      label: "Products Order",
      icon: <SiReaddotcv size={24} />,
    },
  ];

  return (
    <div className="flex">
      <div className="fixed top-18 left-0 h-full md:w-56 bg-white border-r py-4 md:py-8 md:px-4 flex flex-col max-md:items-center gap-4">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </div>
      <div className="ml-[61px] md:ml-56 w-full">{children}</div>
    </div>
  );
}

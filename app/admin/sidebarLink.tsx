"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export default function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeLinkCSS = "bg-gray-200";
  const baseLinkCSS = "flex items-center md:gap-2 md:px-2 md:py-2 md:rounded px-4 py-2";
  const iconCSS = "text-gray-700";
  const spanCSS = "max-md:hidden text-nowrap text-neutral-700";

  return (
    <Link
      href={href}
      className={`${baseLinkCSS} ${isActive ? activeLinkCSS : "hover:bg-gray-100"}`}
    >
      <span className={iconCSS}>{icon}</span>
      <span className={spanCSS}>{label}</span>
    </Link>
  );
}

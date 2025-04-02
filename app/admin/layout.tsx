import { MdAddToPhotos } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { MdBorderColor } from "react-icons/md";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="sm:w-56 bg-white border border-r py-8 max-sm:px-2 md:px-4 flex flex-col max-md:items-center gap-4">
        <Link href="/admin/product" className="flex items-center gap-2">
          <MdAddToPhotos size={28} className="max-sm:w-10 max-sm:h-10 max-md:w-12 max-md:h-12" />
          <span className="max-md:hidden text-nowrap">Add Products</span>
        </Link>
        <Link href="/admin/edit" className="flex items-center gap-2">
          <RiFileEditFill size={28} className="max-sm:w-10 max-sm:h-10 max-md:w-12 max-md:h-12" />
          <span className="max-md:hidden text-nowrap">Edit Products</span>
        </Link>
        <Link href="/admin/order" className="flex items-center gap-2">
          <MdBorderColor size={28} className="max-sm:w-10 max-sm:h-10 max-md:w-12 max-md:h-12" />
          <span className="max-md:hidden text-nowrap">Products Order</span>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}

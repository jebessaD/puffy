import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { deliveryStatus } from "@/app/hooks/useOrder";

interface DeliveryStatusProps {
  status: string;
  id: number;
}

interface OnChange {
  (status: string, id: number): void;
}

const statusStyles = {
  PROCESSING: {
    bg: "bg-amber-50",
    text: "text-orange-600",
  },
  SHIPPED: {
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  DELIVERED: {
    bg: "bg-green-50",
    text: "text-green-600",
  },
  CANCELLED: {
    bg: "bg-red-50",
    text: "text-red-600",
  },
};

export default function DeliveryStatus({ status, id }: DeliveryStatusProps) {
  const [selectedValue, setSelectedValue] = useState(status);

  const handleStatusChange: OnChange = async (status: string, id: number) => {
    try {
      await deliveryStatus(status, id);
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
    setSelectedValue(status);
  };

  const currentStatus =
    statusStyles[selectedValue as keyof typeof statusStyles] ||
    statusStyles.PROCESSING;

  return (
    <Select
      value={selectedValue}
      onValueChange={(newStatus) => handleStatusChange(newStatus, id)}
    >
      <SelectTrigger
        className={`${currentStatus.bg} ${currentStatus.text} font-medium`}
      >
        <div className="flex items-center gap-2">
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex items-center gap-2">
            Delivery Status
          </SelectLabel>
          <SelectItem
            value="PROCESSING"
            className="flex items-center gap-2 focus:bg-amber-50 focus:text-amber-600"
          >
            
            PROCESSING
          </SelectItem>
          <SelectItem
            value="SHIPPED"
            className="flex items-center gap-2 focus:bg-blue-50 focus:text-blue-600"
          >
            SHIPPED
          </SelectItem>
          <SelectItem
            value="DELIVERED"
            className="flex items-center gap-2 focus:bg-green-50 focus:text-green-600"
          >
            DELIVERED
          </SelectItem>
          <SelectItem
            value="CANCELLED"
            className="flex items-center gap-2 focus:bg-red-50 focus:text-red-600"
          >
            CANCELLED
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

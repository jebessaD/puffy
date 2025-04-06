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
  
  interface DeliveryStatusProps {
    status: string;
    id: number;
  }
  
  interface OnChange {
    (status: string, id: number): void;
  }
  
  export default function DeliveryStatus({ status, id }: DeliveryStatusProps) {
    const [selectedValue, setSelectedValue] = useState(status);
  
    // function with patch to update the delivery status that sends the id and status
    const handleStatusChange: OnChange = async (status: string, id: number) => {
      try {
        const res = await fetch("/api/orders", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, id }),
        });
        if (!res.ok) {
          throw new Error("Failed to update delivery status");
        }
      } catch (error) {
        console.error("Error updating delivery status:", error);
      }
      setSelectedValue(status);
    };
  
    return (
      <Select value={selectedValue} onValueChange={(newStatus) => handleStatusChange(newStatus, id)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Delivery Status</SelectLabel>
            <SelectItem value="PROCESSING">PROCESSING</SelectItem>
            <SelectItem value="SHIPPED">SHIPPED</SelectItem>
            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  
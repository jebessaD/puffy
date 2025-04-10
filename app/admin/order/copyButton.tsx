import { useState } from "react";
import { Copy } from "lucide-react";

const CopyText = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button onClick={handleCopy} className={`pl-1 ${copied ? "text-gray-500" : "text-black"}`} >
      <Copy size={16} />
    </button>
  );
};

export default CopyText;

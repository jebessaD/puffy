export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="h-2 w-2 animate-[bounce_0.7s_infinite] rounded-full bg-gray-700"></div>
        <div className="h-2 w-2 animate-[bounce_0.7s_infinite_150ms] rounded-full bg-gray-700"></div>
        <div className="h-2 w-2 animate-[bounce_0.7s_infinite_300ms] rounded-full bg-gray-700"></div>
      </div>
    </div>
  );
} 
import React from "react";

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto ">
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center w-full">
          {/* Connector Line (Placed Behind Steps) */}
          {index > 0 && (
            <div
              className={`absolute top-4 left-1/2 w-full h-[4px] duration-300 
                ${index <= currentStep ? "bg-black" : "bg-gray-300"}
              `}
              style={{ transform: "translateX(-100%)" }} // Ensures line starts exactly from the previous step
            />
          )}

          {/* Step Circle */}
          <div
            className={`z-10 w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold duration-300
              ${index <= currentStep ? "bg-black" : "bg-gray-300"}
            `}
          >
            {index + 1}
          </div>

          {/* Step Label */}
          <div className="mt-2 text-xs sm:text-sm font-medium text-center">
            <span className={`${index <= currentStep ? "text-black font-medium" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;

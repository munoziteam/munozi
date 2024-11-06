import React, { useState, useRef } from "react";
import CurrencySymbol from "./CurrencySymbol";
import { toast } from "sonner";

type Props = {
  currency: string;
  onChange: (rawValue: number) => void; // Pass raw number value
};

export default function PriceInput({ currency, onChange }: Props) {
  const [price, setPrice] = useState<number | "">(""); // Store the raw price as a number
  const currentPriceToastId = useRef<string | null>(null) as any; // To store the toast ID

  // Function to format number with commas (e.g., 1000 -> 1,000)
  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US"); // Format number with commas for thousands
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas from input

    // Ensure the input is a valid number or empty (for clearing the input)
    if (rawValue === "" || !isNaN(Number(rawValue))) {
      const numericValue = rawValue === "" ? "" : Number(rawValue);
      setPrice(numericValue); // Store the raw number or empty value
      onChange(numericValue === "" ? 0 : numericValue); // Pass raw value to parent, 0 if empty
    } else {
      if (currentPriceToastId.current) {
        toast.dismiss(currentPriceToastId.current); // Dismiss previous toast
      }

      // Show the error toast and store its ID
      currentPriceToastId.current = toast.error("Value must be a number");
    }
  };

  return (
    <div className="gap-1 flex items-center p-1 border rounded-[0.5rem]">
      <CurrencySymbol currency={currency} />
      <input
        value={price !== "" ? formatPrice(price as number) : ""} // Display formatted price with commas
        type="text"
        onChange={handleInputChange} // Trigger input change handler
        className="w-[100px] p-1 outline-none"
      />
    </div>
  );
}

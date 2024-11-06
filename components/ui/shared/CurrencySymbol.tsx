import { PiCurrencyGbpFill, PiCurrencyNgnFill } from "react-icons/pi";
import { BiSolidDollarCircle } from "react-icons/bi";

export default function CurrencySymbol({ currency }: { currency: string }) {
  return (
    <div>
      {currency?.toLowerCase() === "ngn" ? (
        <PiCurrencyNgnFill className=" text-xl" />
      ) : currency === "gbp" ? (
        <PiCurrencyGbpFill className=" text-xl" />
      ) : (
        <BiSolidDollarCircle className=" text-xl" />
      )}
    </div>
  );
}

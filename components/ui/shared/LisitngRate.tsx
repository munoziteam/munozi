export default function ListingRate({
  price,
  frequency,
  currency,
}: {
  price: string;
  frequency: string;
  currency: string;
}) {
  return (
    <div className="text3">
      {currency === "ngn" ? "NGN" : currency === "usd" ? "USD" : "GBP"}
      {price} /{frequency}
    </div>
  );
}

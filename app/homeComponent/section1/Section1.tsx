import Card from "./Card";

type Props = {};

export default function Section1({}: Props) {
  return (
    <div className=" w-full  h-full overflow-x-scroll flex gap-4">
      <Card />
      <Card />
    </div>
  );
}

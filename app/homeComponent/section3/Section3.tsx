import Card from "./Card";

type Props = {};

export default function Section3({}: Props) {
  return (
    <div className=" w-full  h-full overflow-x-scroll flex gap-4">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

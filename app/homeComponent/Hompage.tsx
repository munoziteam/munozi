"use client";

import Text from "@/components/ui/shared/Text";
import Header from "./Header";
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Footer from "@/components/global/shared/Footer";

type Props = {};

export default function Hompage({}: Props) {
  return (
    <div className="flex flex-col gap-4 p-2">
      {/* Header */}
      <Header />
      {/* Section 1 */}
      <Section1 />
      {/* Section 2 */}
      <div className=" flex flex-col gap-3">
        <Text size={"header"}>Featured</Text>
        <Section2 />
      </div>
      {/* Section 3 */}
      <div className=" flex flex-col gap-3">
        <Text size={"header"}>Get Started</Text>
        <Section3 />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

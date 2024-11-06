"use client";

import { useState } from "react";
import Form from "./Form";
import Otp from "./Otp";
import Header from "./Header";

export default function Home() {
  const [route, setRoute] = useState("form");
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-5 gap-10">
      <Header route={route} />
      {route === "form" && <Form setRoute={setRoute} />}
      {route === "otp" && <Otp />}
    </div>
  );
}

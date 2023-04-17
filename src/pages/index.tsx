import { Navbar, Hero } from "@/components";
import { Fetch } from "@/utils";
import { useEffect } from "react";

export default function Home() {
  async function fData() {
    const data = await Fetch("RegistroPelicula", "GET");
    console.log(data);
  }

  useEffect(() => {
    fData();
  }, []);

  return (
    <div className="h-full bg-gray-900">
      <Navbar />
      <Hero />
    </div>
  );
}

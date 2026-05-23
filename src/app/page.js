import Footer from "@/components/Footer";
import HealthTips from "@/components/HealthTips";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import TopDoctors from "@/components/TopDoctors";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero/>
    <TopDoctors/>
    <HealthTips/>
    <Reviews/>
    <Footer/>
    </>
  );
}

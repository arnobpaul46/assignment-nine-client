import Footer from "@/components/Footer";
import HealthTips from "@/components/HealthTips";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import TopDoctors from "@/components/TopDoctors";
import Image from "next/image";

export const metadata = {
  title: "DocAppoint | Your Gateway to Medical Excellence",
  description: "Book appointments with top-rated medical professionals in seconds. Experience a futuristic approach to healthcare management.",
};

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

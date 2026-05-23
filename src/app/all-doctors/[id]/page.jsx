
import DoctorDetailsClient from "@/components/DoctorDetailsClient";

export async function generateMetadata({ params }) {
  const { id } = params;
  
  return {
    title: `Doctor Details - ${id} | DocAppoint`,
    description: "View doctor profile and book an appointment.",
  };
}

export default function Page({ params }) {
  return <DoctorDetailsClient id={params.id} />;
}
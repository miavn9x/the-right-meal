import About from "@/components/About";
import ContactPage from "@/components/ContactPage";import EbookSection from "@/components/EbookSection";
import FeedbackSection from "@/components/FeedbackSection";
import HeroSection from "@/components/HeroSection";
import ReviewSection from "@/components/ReviewSection";
import ToolkitSection from "@/components/ToolkitSection";


export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <About />
      <EbookSection />
      <ToolkitSection />
      <ReviewSection />
      <FeedbackSection />
      <ContactPage/>
    </main>
  );
}

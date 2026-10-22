import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShotSimulator from "@/components/ShotSimulator";
import Courses from "@/components/Courses";
import Instructor from "@/components/Instructor";
import LevelQuiz from "@/components/LevelQuiz";
import VideoLessons from "@/components/VideoLessons";
import Drills from "@/components/Drills";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ShotSimulator />
        <Courses />
        <Instructor />
        <LevelQuiz />
        <VideoLessons />
        <Drills />
        <Testimonials />
        <Faq />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}

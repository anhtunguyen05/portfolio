import TagManager from "react-gtm-module";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import AboutSection from "./components/about";
import Skills from "./components/skills";
import Projects from "./components/projects";
import ContactSection from "./components/contact/Contact";
import ScrollToTop from "./helpers/scroll-to-top";
import Footer from "./components/footer/Footer";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./card.scss";

TagManager.initialize({ gtmId: "GTM-XXXXXXX" });

function App() {
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <Skills />
        <Projects />
        <ContactSection/>
       
        <ScrollToTop />
      </div>
       <Footer/>
    </>
  );
}

export default App;

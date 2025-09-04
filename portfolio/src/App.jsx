import TagManager from "react-gtm-module";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import ScrollToTop from "./helpers/scroll-to-top";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import"./card.scss"


TagManager.initialize({ gtmId: "GTM-XXXXXXX" });

function App() {
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
        <Navbar/>
        <HeroSection />
         
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;

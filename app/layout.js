import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollJourneyPath from "./components/helper/scroll-journey-path";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rohit Kumar - Assistant Professor, EdTech Founder & Full-Stack Developer",
  description:
    "Portfolio of Rohit Kumar - Assistant Professor (UGC-NET 2026 Qualified), Co-Founder & CEO of Sikshasarovar, and Full-Stack Developer. Author of peer-reviewed research in cybersecurity, machine learning, and HCI. Hands-on with Java, Spring Boot, React, Node.js, MongoDB, PostgreSQL, Docker, and AWS.",
  keywords: [
    "Rohit Kumar", "Assistant Professor", "Full Stack Developer", "Sikshasarovar",
    "UGC-NET", "Cybersecurity Research", "MERN Stack", "Java", "Spring Boot", "React", "Next.js",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <ScrollJourneyPath />
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}

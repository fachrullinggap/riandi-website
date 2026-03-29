"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

// --- NAVBAR DICTIONARY ---
const navDict = {
  en: { home: "Home", about: "About", service: "Services", column: "Column", news: "News", contact: "Contact" },
  id: { home: "Beranda", about: "Tentang", service: "Layanan", column: "Kolom", news: "Berita", contact: "Kontak" },
  ja: { home: "トップ", about: "私たちについて", service: "サービス", column: "コラム", news: "ニュース", contact: "お問い合わせ" }
};

export default function Navbar({ lang, handleLangChange, theme = "blend" }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = navDict[lang] || navDict.en; // Fallback to EN

  const navDrop = { 
    hidden: { opacity: 0, y: -30 }, 
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } } 
  };

  let navClasses = "fixed w-full z-50 text-white transition-colors duration-300 ";
  if (theme === "solid") {
    navClasses += isScrolled ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg py-4 px-8" : "bg-transparent py-8 px-8";
  } else {
    navClasses += "mix-blend-difference p-6";
  }

  return (
    <motion.nav initial="hidden" animate="visible" variants={navDrop} className={navClasses}>
      <div className={`w-full flex justify-between items-center transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Globe className="w-6 h-6 text-teal-400" /> CareerDiv.
        </div>
        
        <div className="flex items-center gap-8 font-medium text-sm">
          <div className="hidden md:flex gap-6">
            <button onClick={() => router.push('/')} className="hover:text-teal-400 transition-colors relative group">{t.home}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/about')} className="hover:text-teal-400 transition-colors relative group">{t.about}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/services')} className="hover:text-teal-400 transition-colors relative group">{t.service}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/column')} className="hover:text-teal-400 transition-colors relative group">{t.column}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/news')} className="hover:text-teal-400 transition-colors relative group">{t.news}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/contact')} className="hover:text-teal-400 transition-colors relative group">{t.contact}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span></button>
          </div>
          
          <select className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-3 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-teal-400 transition-colors" value={lang} onChange={handleLangChange}>
            <option className="text-black" value="en">EN</option>
            <option className="text-black" value="id">ID</option>
            <option className="text-black" value="ja">JA</option>
          </select>
        </div>
      </div>
    </motion.nav>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

// --- NAVBAR DICTIONARY ---
const navDict = {
  en: { home: "Home", about: "About", service: "Services", column: "Column", news: "News", contact: "Submission" },
  id: { home: "Beranda", about: "Tentang", service: "Layanan", column: "Kolom", news: "Berita", contact: "Pengiriman" },
  ja: { home: "トップ", about: "私たちについて", service: "サービス", column: "コラム", news: "ニュース", contact: "提出" }
};

export default function Navbar({ lang, handleLangChange, theme = "blend" }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    // Check initial scroll on load
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = navDict[lang] || navDict.en; // Fallback to EN

  // Clean framer-motion animation that works perfectly with Next.js SSR
  const navDrop = { 
    hidden: { opacity: 0, y: -30 }, 
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } } 
  };

  // 1. Determine Text Color
  // Since the scrolled navbar is now dark, text is white when scrolled. 
  // If not scrolled and theme is "solid" (light page top), text is dark. Otherwise, white.
  const textColor = isScrolled ? "text-white" : (theme === "solid" ? "text-slate-900" : "text-white");
  
  // 2. Determine Background - Modern Dark Glassmorphism Effect
  const bgColor = isScrolled 
    ? "bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/10" 
    : "bg-transparent border-b border-transparent";

  // 3. Determine Padding (Edge-to-edge layout)
  const padding = isScrolled ? "py-4 px-6 md:px-12 lg:px-16" : "py-6 px-6 md:px-12 lg:px-16";

  // Using specific transitions to prevent conflict with Framer Motion's Y-axis transform
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-[background-color,color,padding,border-color] duration-300 ${bgColor} ${textColor} ${padding}`;

  return (
    <motion.nav 
      initial="hidden" 
      animate="visible" 
      variants={navDrop} 
      className={navClasses}
    >
      {/* w-full ensures it spans the entire width to the edges */}
      <div className="w-full flex justify-between items-center">
        
        {/* --- LOGO SECTION (Fixed Visibility) --- */}
        <div className="text-2xl font-black tracking-tighter flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          {/* Added a white rounded box to make the dark blue/orange logo pop on dark backgrounds! */}
          <div className="bg-white p-1 rounded-lg shadow-sm flex items-center justify-center">
            <Image 
              src="/favicon.ico" 
              alt="JaLink Logo" 
              width={26} 
              height={26} 
              className="object-contain"
              unoptimized
            /> 
          </div>
          <span>JaLink</span>
        </div>
        
        {/* --- MENU SECTION --- */}
        <div className="flex items-center gap-8 font-medium text-sm">
          <div className="hidden md:flex gap-6">
            <button onClick={() => router.push('/')} className="hover:text-[#00c2a8] transition-colors relative group">{t.home}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00c2a8] transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/about')} className="hover:text-[#00c2a8] transition-colors relative group">{t.about}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00c2a8] transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/services')} className="hover:text-[#00c2a8] transition-colors relative group">{t.service}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00c2a8] transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/column')} className="hover:text-[#00c2a8] transition-colors relative group">{t.column}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00c2a8] transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/news')} className="hover:text-[#00c2a8] transition-colors relative group">{t.news}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00c2a8] transition-all group-hover:w-full"></span></button>
            <button onClick={() => router.push('/contact')} className="hover:text-[#00c2a8] transition-colors relative group">{t.contact}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00c2a8] transition-all group-hover:w-full"></span></button>
          </div>
          
          <select 
            className={`border rounded-full px-3 py-1 outline-none cursor-pointer transition-colors ${
              isScrolled || theme !== "solid"
                ? "bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 focus:ring-2 focus:ring-white/50" 
                : "bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200 focus:ring-2 focus:ring-[#00c2a8]"
            }`}
            value={lang} 
            onChange={handleLangChange}
          >
            <option className="text-black" value="en">EN</option>
            <option className="text-black" value="id">ID</option>
            <option className="text-black" value="ja">JA</option>
          </select>
        </div>
      </div>
    </motion.nav>
  );
}
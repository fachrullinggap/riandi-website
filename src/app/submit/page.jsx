"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Send,
  FileText
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- LANGUAGE DICTIONARY ---
const dict = {
  en: {
    hero: { title: "SUBMIT YOUR PROFILE" },
    headline: "Start Your Journey to Japan",
    description: "Share your profile with us and take the first step toward preparing your journey to Japan.\nWe will review your information and guide you through the next steps.",
    cta: { btn: "Submit Your Profile" },
    note: "Your information will be kept confidential and used only for guidance purposes.",
  },
  id: {
    hero: { title: "KIRIM PROFIL ANDA" },
    headline: "Mulai Perjalanan Anda ke Jepang",
    description: "Bagikan profil Anda dengan kami dan ambil langkah pertama untuk mempersiapkan perjalanan Anda ke Jepang.\nKami akan meninjau informasi Anda dan membimbing Anda melalui langkah-langkah berikutnya.",
    cta: { btn: "Kirim Profil Anda" },
    note: "Informasi Anda akan dijaga secara rahasia dan hanya digunakan untuk tujuan bimbingan.",
  },
  ja: {
    hero: { title: "プロフィールを送信" },
    headline: "日本で働く準備を始めましょう",
    description: "プロフィールを共有して、日本での働くための準備の第一歩を踏み出しましょう。\nあなたの情報をレビューし、次のステップをガイドします。",
    cta: { btn: "プロフィールを送信" },
    note: "ご提供いただいた情報は機密保持され、ガイダンス目的のみに使用されます。",
  }
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

export default function SubmitPage() {
  const [lang, setLang] = useState("en");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang");
    if (savedLang) setLang(savedLang);
  }, []);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("preferredLang", newLang);
  };

  const t = dict[lang];

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300">
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-24 px-6 bg-slate-900 min-h-[60vh] flex flex-col justify-center rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
          
          {/* Logo Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 bg-teal-900/60 text-teal-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.15)]">
              <FileText size={32} strokeWidth={2.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white tracking-widest mb-6"
          >
            {t.hero.title}
          </motion.h1>
          
          <div className="w-24 h-px bg-slate-700 mx-auto mt-8"></div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-10"
          >
            {t.headline}
          </motion.h2>
          
          {/* <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed mb-16 whitespace-pre-line"
          >
            {t.description}
          </motion.p> */}

          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-lg md:text-xl text-slate-600 leading-relaxed mb-16 italic whitespace-pre-line"
          >
            "{t.description}"
          </motion.p>

          <motion.a 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            href="https://forms.gle/W2hMB3JkVLPW4LD98"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-12 py-5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl text-lg transition-colors shadow-lg shadow-teal-500/20"
          >
            {t.cta.btn} <Send size={20} />
          </motion.a>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-200"
          >
            <p className="text-sm md:text-base text-slate-600 italic">
              📌 {t.note}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0 }} 
            onClick={scrollToTop} 
            className="fixed bottom-8 right-8 p-4 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors z-[100] group"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
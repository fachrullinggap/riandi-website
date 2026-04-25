"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building, 
  CheckCircle, 
  MessageSquare, 
  Globe, 
  Users, 
  ArrowUp, 
  ExternalLink 
} from "lucide-react";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. UPDATED DICTIONARY FOR COMPANIES ---
const dict = {
  en: {
    hero: { title: "FOR COMPANIES"},
    opening: "Finding the right individuals requires more than recruitment — it requires preparation and understanding.",
    supportTitle: "What We Support",
    supportItems: [
      { icon: Users, label: "Candidate preparation" },
      { icon: MessageSquare, label: "Communication support" },
      { icon: Globe, label: "Cultural understanding" },
    ],
    workTitle: "How We Work",
    workSteps: [
      "Understand needs",
      "Connect with individuals who are preparing",
      "Support communication process",
    ],
    cta: {
      text: "Ready to expand your team?",
      btn: "Find Talent",
    },
  },
  id: {
    hero: { title: "UNTUK PERUSAHAAN"},
    opening: "Menemukan individu yang tepat membutuhkan lebih dari sekadar rekrutmen — ini membutuhkan persiapan dan pemahaman.",
    supportTitle: "Apa yang Kami Dukung",
    supportItems: [
      { icon: Users, label: "Persiapan kandidat" },
      { icon: MessageSquare, label: "Dukungan komunikasi" },
      { icon: Globe, label: "Pemahaman budaya" },
    ],
    workTitle: "Cara Kami Bekerja",
    workSteps: [
      "Memahami kebutuhan",
      "Terhubung dengan individu yang sedang bersiap",
      "Mendukung proses komunikasi",
    ],
    cta: {
      text: "Siap mengembangkan tim Anda?",
      btn: "Cari Talenta",
    },
  },
  ja: {
    hero: { title: "企業の方へ" },
    opening: "適切な人材を見つけるには、採用以上のものが必要です。それは準備と理解です。",
    supportTitle: "私たちがサポートすること",
    supportItems: [
      { icon: Users, label: "候補者の育成・準備" },
      { icon: MessageSquare, label: "コミュニケーション支援" },
      { icon: Globe, label: "文化的な理解の促進" },
    ],
    workTitle: "私たちのプロセス",
    workSteps: [
      "ニーズの把握",
      "準備を整えている人材とのマッチング",
      "コミュニケーションプロセスのサポート",
    ],
    cta: {
      text: "チームを拡大する準備はできましたか？",
      btn: "人材を探す",
    },
  }
};

// --- Animation Variants ---
const letterVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } };
const wordVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } };
const containerStagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

export default function CompaniesPage() {
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
        <div className="absolute inset-0"></div>
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
          
          {/* Logo Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 bg-teal-900/60 text-teal-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.15)]">
              <Building size={32} strokeWidth={2.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white tracking-widest mb-2"
          >
            {t.hero.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-teal-400 text-lg md:text-xl font-medium tracking-widest mb-6"
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-teal-400 text-xl md:text-2xl font-medium leading-relaxed"
          >
            "{t.opening}"
          </motion.p>
          
          <div className="w-24 h-px bg-slate-700 mx-auto mt-8"></div>
        </div>
      </section>

      {/* --- OPENING QUOTE --- */}
      {/* <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-medium text-slate-700 italic leading-relaxed">
            “{t.opening}”
          </motion.p>
        </div>
      </section> */}

      {/* --- WHAT WE SUPPORT --- */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl font-bold text-center mb-12 text-slate-900">
            {t.supportTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.supportItems.map((item, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: idx * 0.1 }} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-all">
                  <item.icon size={32} />
                </div>
                <span className="text-lg font-bold text-slate-800">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full md:w-1/2">
            <h2 className="text-4xl font-black text-slate-900 mb-8">{t.workTitle}</h2>
            <div className="space-y-6">
              {t.workSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-teal-50 transition-colors">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">{idx + 1}</div>
                  <p className="text-lg font-medium text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full md:w-1/2 relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="https://picsum.photos/seed/companywork/800/600" fill className="object-cover" alt="How we work" />
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h3 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-white mb-10">
            {t.cta.text}
          </motion.h3>
          <motion.a 
            href="https://wa.me/+6285860001198" 
            target="_blank"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="inline-flex items-center gap-3 px-12 py-6 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-2xl text-xl transition-all shadow-lg shadow-teal-500/20"
          >
            {t.cta.btn} <ExternalLink size={24} />
          </motion.a>
        </div>
      </section>

      <Footer lang={lang} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} onClick={scrollToTop} className="fixed bottom-8 right-8 p-4 bg-teal-500 text-white rounded-full shadow-lg z-[100] group">
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
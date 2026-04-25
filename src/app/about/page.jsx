"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Lightbulb,
  Compass,
  Handshake
} from "lucide-react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- LANGUAGE DICTIONARY ---
const dict = {
  en: {
    label: "ABOUT US",
    opening: "Bridging the gap between talent and opportunities related to Japan requires more than connection — it requires understanding.",
    founderTitle: "Founder Story",
    founderStory: "With firsthand experience working in Japan, JaLink understands both sides — what companies expect, and what individuals need to prepare.",
    positioningTitle: "Positioning",
    positioning: [
      { icon: Lightbulb, label: "Real experience" },
      { icon: Compass, label: "Practical guidance" },
      { icon: Handshake, label: "Bridge between both sides" },
    ],
  },
  id: {
    label: "TENTANG KAMI",
    opening: "Menjembatani kesenjangan antara talenta dan peluang terkait Jepang membutuhkan lebih dari sekadar koneksi — membutuhkan pemahaman.",
    founderTitle: "Kisah Pendiri",
    founderStory: "Dengan pengalaman langsung bekerja di Jepang, JaLink memahami kedua belah pihak — apa yang diharapkan perusahaan, dan apa yang perlu disiapkan individu.",
    positioningTitle: "Positioning",
    positioning: [
      { icon: Lightbulb, label: "Pengalaman nyata" },
      { icon: Compass, label: "Bimbingan praktis" },
      { icon: Handshake, label: "Menjembatani kedua belah pihak" },
    ],
  },
  ja: {
    label: "アバウト",
    opening: "日本に関連する人材と機会のギャップを埋めるには、単なる接続以上のもの — 理解が必要です。",
    founderTitle: "創業者の物語",
    founderStory: "日本での実務経験を持つJaLinkは、両側を理解しています — 企業の期待と、個人が準備する必要があることを。",
    positioningTitle: "ポジショニング",
    positioning: [
      { icon: Lightbulb, label: "実体験" },
      { icon: Compass, label: "実践的なガイダンス" },
      { icon: Handshake, label: "両側の架け橋" },
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
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
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="solid" />

      {/* --- OPENING SECTION (LEFT TEXT + RIGHT IMAGE) --- */}
      <section className="pt-32 pb-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT: TEXT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.p
                variants={fadeUp}
                className="text-teal-600 font-black tracking-widest uppercase mb-12 text-sm"
              >
                {t.label}
              </motion.p>
              
              <motion.div
                variants={fadeUp}
                className="border-l-4 border-teal-500 pl-6"
              >
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl font-medium">
                  {t.opening}
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT: IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full relative"
            >
              <div className="relative w-full aspect-4/3 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://picsum.photos/seed/workspace/800/600"
                  alt="About Us"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOUNDER STORY SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-10 text-center"
          >
            {t.founderTitle}
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-slate-50 p-10 md:p-14 rounded-[2rem] shadow-md border border-slate-100"
          >
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed italic">
              "{t.founderStory}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- POSITIONING SECTION --- */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-16 text-center"
          >
            {t.positioningTitle}
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.positioning.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white p-10 rounded-[2rem] flex flex-col items-center text-center group hover:bg-teal-50 transition-colors duration-300 border border-slate-100 hover:border-teal-200 shadow-sm"
                >
                  <div className="w-20 h-20 bg-teal-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    <Icon size={36} strokeWidth={2} />
                  </div>
                  <span className="text-xl font-bold text-slate-800">{item.label}</span>
                </motion.div>
              );
            })}
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
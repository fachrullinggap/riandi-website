"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, ArrowUpRight, GraduationCap, Briefcase, Languages, 
  ArrowUp, HeartHandshake, User, Building, BookOpen 
} from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- 1. LANGUAGE DICTIONARY ---
const dict = {
  en: {
    hero: { 
      title: "Finding Your Way to Japan", 
      desc: "For talents building their careers — and companies seeking the right people.", 
      ctaInd: "I'm Looking for a Job", 
      ctaComp: "I'm Hiring Talent" 
    },
    split: {
      indTitle: "For Individuals",
      indDesc: "Start your journey toward working in Japan with the right preparation and guidance.",
      indBtn: "Start Your Journey",
      compTitle: "For Companies",
      compDesc: "Connect with individuals who are preparing to build their careers in Japan, supported with the right skills and mindset.",
      compBtn: "Find Talent"
    },
    services: { 
      title: "Services",
      indTitle: "For Individuals", 
      indDesc: "Guidance and preparation to help you build your path toward working in Japan — from learning the language to understanding real career steps.",
      compTitle: "For Companies", 
      compDesc: "Support in communication and connecting with individuals who are preparing to build their careers related to Japan."
    },
    platforms: {
      title: "Our Platforms:",
      p1Title: "JaLink Academy", p1Desc: "(Language Training)",
      p2Title: "Kakehashi by JaLink", p2Desc: "(Interpreter & Communication)",
      p3Title: "JaLink Career", p3Desc: "(Career Guidance & Support)"
    },
    flow: {
      title: "A Clear Path",
      step1: "Prepare",
      step2: "Learn",
      step3: "Connect",
      step4: "Start Your Journey"
    }
  },
  id: {
    hero: { 
      title: "Menemukan Jalan Anda ke Jepang", 
      desc: "Untuk talenta yang membangun karier mereka — dan perusahaan yang mencari orang yang tepat.", 
      ctaInd: "Saya Mencari Pekerjaan", 
      ctaComp: "Saya Mencari Talenta" 
    },
    split: {
      indTitle: "Untuk Individu",
      indDesc: "Mulailah perjalanan Anda untuk bekerja di Jepang dengan persiapan dan bimbingan yang tepat.",
      indBtn: "Mulai Perjalanan Anda",
      compTitle: "Untuk Perusahaan",
      compDesc: "Terhubung dengan individu yang bersiap membangun karier di Jepang, didukung dengan keterampilan dan pola pikir yang tepat.",
      compBtn: "Temukan Talenta"
    },
    services: { 
      title: "Layanan",
      indTitle: "Untuk Individu", 
      indDesc: "Bimbingan dan persiapan untuk membantu Anda membangun jalur bekerja di Jepang — mulai dari belajar bahasa hingga memahami langkah karier yang nyata.",
      compTitle: "Untuk Perusahaan", 
      compDesc: "Dukungan komunikasi dan menghubungkan perusahaan dengan individu yang sedang bersiap membangun karier terkait Jepang."
    },
    platforms: {
      title: "Platform Kami:",
      p1Title: "JaLink Academy", p1Desc: "(Pelatihan Bahasa)",
      p2Title: "Kakehashi by JaLink", p2Desc: "(Penerjemah & Komunikasi)",
      p3Title: "JaLink Career", p3Desc: "(Bimbingan & Dukungan Karier)"
    },
    flow: {
      title: "Jalan yang Jelas",
      step1: "Persiapan",
      step2: "Belajar",
      step3: "Koneksi",
      step4: "Mulai Perjalanan Anda"
    }
  },
  ja: {
    hero: { 
      title: "日本への道を見つける", 
      desc: "キャリアを築く人材と、適切な人材を求める企業のために。", 
      ctaInd: "仕事を探している", 
      ctaComp: "人材を採用したい" 
    },
    split: {
      indTitle: "個人の方へ",
      indDesc: "適切な準備とガイダンスで、日本で働くための旅を始めましょう。",
      indBtn: "旅を始める",
      compTitle: "企業の方へ",
      compDesc: "日本の労働環境に適したスキルとマインドセットを持つ、キャリア構築を準備している人材とつながります。",
      compBtn: "人材を探す"
    },
    services: { 
      title: "サービス",
      indTitle: "個人の方へ", 
      indDesc: "語学学習から実際のキャリアステップの理解まで、日本で働くための道筋を築くためのガイダンスと準備を提供します。",
      compTitle: "企業の方へ", 
      compDesc: "コミュニケーションのサポートや、日本関連のキャリアを築く準備をしている人材とのマッチングを行います。"
    },
    platforms: {
      title: "プラットフォーム:",
      p1Title: "JaLink Academy", p1Desc: "(語学トレーニング)",
      p2Title: "Kakehashi by JaLink", p2Desc: "(通訳・コミュニケーション)",
      p3Title: "JaLink Career", p3Desc: "(キャリアガイダンス・支援)"
    },
    flow: {
      title: "明確なプロセス",
      step1: "準備",
      step2: "学ぶ",
      step3: "つながる",
      step4: "旅を始める"
    }
  }
};

export default function ReimaginedLandingPage() {
  const router = useRouter();
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

  const t = dict[lang] || dict.en;

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const springUp = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  // Pulse animation to draw focus
  const pulseEffect = {
    scale: [1, 1.03, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300 overflow-x-hidden relative">
      
      {/* --- NAVBAR --- */}
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950 pb-20">
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute inset-0">
          <Image src="https://picsum.photos/seed/cityscape/1920/1080" alt="City Background" fill className="object-cover mix-blend-luminosity" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        
        <motion.div className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={springUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={springUp} className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-14">
            {t.hero.desc}
          </motion.p>
          
          {/* BIG CALL-TO-ACTION BUTTONS */}
          <motion.div variants={springUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            
            {/* Primary Action: Looking for Job */}
            <motion.button 
              animate={pulseEffect}
              whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(20, 184, 166, 0.4)" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => router.push('/individuals')} 
              className="bg-teal-500 text-slate-950 px-12 py-6 rounded-full text-xl font-black flex items-center justify-center gap-3 transition-all w-full sm:w-auto shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              {t.hero.ctaInd} <ArrowUpRight className="w-6 h-6 stroke-[3px]" />
            </motion.button>

            {/* Secondary Action: Hiring Talent */}
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "white" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => router.push('/companies')} 
              className="bg-transparent border-[3px] border-white/40 text-white px-12 py-6 rounded-full text-xl font-black flex items-center justify-center gap-3 transition-all w-full sm:w-auto backdrop-blur-md"
            >
              {t.hero.ctaComp} <ArrowUpRight className="w-6 h-6 stroke-[3px]" />
            </motion.button>

          </motion.div>
        </motion.div>
      </section>

      {/* --- SPLIT SECTION (INDIVIDUALS VS COMPANIES) --- */}
      <section className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* For Individuals */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
              <User size={32} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{t.split.indTitle}</h3>
            <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow">
              {t.split.indDesc}
            </p>
            <button 
              onClick={() => router.push('/individuals')} 
              className="px-6 py-3 bg-slate-100 text-teal-600 hover:bg-teal-500 hover:text-white rounded-full font-bold transition-colors flex items-center gap-2 w-full justify-center"
            >
              {t.split.indBtn} <ArrowUpRight size={18} />
            </button>
          </motion.div>

          {/* For Companies */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
            className="bg-slate-900 rounded-[2rem] p-10 shadow-2xl border border-slate-800 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 group"
          >
            <div className="w-16 h-16 bg-white/10 text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
              <Building size={32} />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{t.split.compTitle}</h3>
            <p className="text-slate-300 font-medium leading-relaxed mb-8 flex-grow">
              {t.split.compDesc}
            </p>
            <button 
              onClick={() => router.push('/companies')} 
              className="px-6 py-3 bg-slate-800 text-white hover:bg-teal-500 rounded-full font-bold transition-colors flex items-center gap-2 w-full justify-center"
            >
              {t.split.compBtn} <ArrowUpRight size={18} />
            </button>
          </motion.div>

        </div>
      </section>

      {/* --- SERVICES (SIMPLIFIED) SECTION --- */}
      <section className="pt-12 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-200 pt-16 mt-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-teal-600 font-bold mb-2 uppercase tracking-widest text-sm">{t.services.indTitle}</div>
            <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed">
              {t.services.indDesc}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="text-teal-600 font-bold mb-2 uppercase tracking-widest text-sm">{t.services.compTitle}</div>
            <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed">
              {t.services.compDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PLATFORMS SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">{t.platforms.title}</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          
          {/* Platform 1: JaLink Academy */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            className="bg-slate-900 rounded-[2rem] shadow-xl flex flex-col justify-end relative overflow-hidden group"
          >
            <Image src="https://picsum.photos/seed/classroom/800/800" alt="Language Academy" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-950/85 group-hover:bg-slate-950/75 transition-colors duration-500" /> 
            
            <div className="relative z-20 p-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-5 group-hover:-rotate-12 transition-transform duration-300">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white leading-tight">{t.platforms.p1Title}</h3>
              <p className="text-teal-400 text-sm font-bold tracking-wide">{t.platforms.p1Desc}</p>
            </div>
          </motion.div>

          {/* Platform 2: Kakehashi by JaLink */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            className="bg-teal-50 rounded-[2rem] shadow-sm border border-teal-100 flex flex-col justify-end relative overflow-hidden group"
          >
            <Image src="https://picsum.photos/seed/meeting/800/800" alt="Interpreter" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-teal-50/90 group-hover:bg-teal-50/80 transition-colors duration-500" /> 
            
            <div className="absolute top-6 right-6 w-12 h-12 bg-white text-teal-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 z-20">
              <Languages size={24} />
            </div>
            
            <div className="relative z-20 mt-auto p-8">
              <h3 className="text-2xl font-bold mb-2 text-teal-950 leading-tight">{t.platforms.p2Title}</h3>
              <p className="text-teal-700 text-sm font-bold tracking-wide">{t.platforms.p2Desc}</p>
            </div>
          </motion.div>

          {/* Platform 3: JaLink Career */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            className="bg-slate-900 rounded-[2rem] shadow-md border border-slate-100 flex flex-col justify-end relative overflow-hidden group" 
          >
            <Image src="https://picsum.photos/seed/businessjob/1200/800" alt="Career Placement" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/70 transition-colors duration-500" /> 
            
            <div className="relative z-20 mt-auto p-8">
              <div className="w-12 h-12 bg-teal-500/20 backdrop-blur-md text-teal-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{t.platforms.p3Title}</h3>
              <p className="text-slate-300 text-sm font-bold tracking-wide">{t.platforms.p3Desc}</p>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* --- NEW FLOW SECTION --- */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white">{t.flow.title}</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4 px-4">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[48px] left-[12%] right-[12%] h-1 bg-slate-800 rounded-full z-0">
               <motion.div 
                 initial={{ width: 0 }} 
                 whileInView={{ width: "100%" }} 
                 viewport={{ once: true }} 
                 transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }} 
                 className="h-full bg-teal-500 rounded-full" 
               />
            </div>
            
            {/* Connecting Line (Mobile) */}
            <div className="md:hidden absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-1 bg-slate-800 rounded-full z-0">
               <motion.div 
                 initial={{ height: 0 }} 
                 whileInView={{ height: "100%" }} 
                 viewport={{ once: true }} 
                 transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }} 
                 className="w-full bg-teal-500 rounded-full" 
               />
            </div>

            {/* Step Items */}
            {[
              { icon: BookOpen, label: t.flow.step1 },
              { icon: GraduationCap, label: t.flow.step2 },
              { icon: Globe, label: t.flow.step3 },
              { icon: Briefcase, label: t.flow.step4 }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.3 }}
                className="relative z-10 flex flex-col items-center group w-full md:w-1/4"
              >
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 text-teal-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:text-white transition-all duration-300 shadow-2xl">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white text-center bg-slate-900 px-4 md:px-2 py-1 rounded-lg">
                  {step.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTEGRATED CONTACT/FOOTER SECTION --- */}
      <Footer lang={lang} />

      {/* --- SCROLL TO TOP BUTTON --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-teal-500 text-white rounded-full shadow-[0_8px_30px_rgb(20,184,166,0.3)] hover:bg-teal-600 transition-colors z-[100] group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
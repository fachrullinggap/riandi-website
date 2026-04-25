"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MessageSquare,
  Users,
  User,
  CheckCircle,
  ArrowUp,
  ArrowRight,
  BookOpen,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. UPDATED DICTIONARY ---
// --- 1. UPDATED DICTIONARY WITH ID & JA ---
const dict = {
  en: {
    heroTitle: "FOR INDIVIDUALS",
    opening: "Start your journey toward working in Japan with the right preparation and guidance.",
    needsTitle: "What You Need",
    needs: [
      { icon: Globe, label: "Japanese language" },
      { icon: Users, label: "Understanding work culture" },
      { icon: MessageSquare, label: "Interview readiness" },
    ],
    supportTitle: "How We Support",
    supportDesc: "We provide comprehensive assistance to ensure you are ready for the Japanese job market.",
    supportItems: [
      { 
        title: "Career Guidance", 
        desc: "JaLink Career / Rianer acts as your personal guide through every step of the process.",
        icon: Briefcase 
      },
      { 
        title: "Language Training", 
        desc: "JaLink Academy provides specialized training to meet language requirements.",
        icon: BookOpen 
      },
    ],
    pricingBtn: "View Program & Pricing",
    flowTitle: "Flow",
    flow: [
      { title: "Learn", desc: "Acquire the necessary skills" },
      { title: "Prepare", desc: "Get your documents and mindset ready" },
      { title: "Connect", desc: "Meet potential employers" },
      { title: "Start", desc: "Begin your career in Japan" },
    ],
    cta: {
      text: "Start Your Journey",
      btn: "Submit Your Profile",
    },
  },
  id: {
    heroTitle: "UNTUK INDIVIDU",
    opening: "Mulailah perjalanan Anda untuk bekerja di Jepang dengan persiapan dan bimbingan yang tepat.",
    needsTitle: "Apa yang Anda Butuhkan",
    needs: [
      { icon: Globe, label: "Bahasa Jepang" },
      { icon: Users, label: "Memahami budaya kerja" },
      { icon: MessageSquare, label: "Kesiapan wawancara" },
    ],
    supportTitle: "Cara Kami Mendukung",
    supportDesc: "Kami memberikan bantuan komprehensif untuk memastikan Anda siap menghadapi pasar kerja Jepang.",
    supportItems: [
      { 
        title: "Bimbingan Karier", 
        desc: "JaLink Career / Rianer bertindak sebagai panduan pribadi Anda melalui setiap langkah proses.",
        icon: Briefcase 
      },
      { 
        title: "Pelatihan Bahasa", 
        desc: "JaLink Academy menyediakan pelatihan khusus untuk memenuhi persyaratan bahasa.",
        icon: BookOpen 
      },
    ],
    pricingBtn: "Lihat Program & Harga",
    flowTitle: "Alur",
    flow: [
      { title: "Belajar", desc: "Dapatkan keterampilan yang diperlukan" },
      { title: "Persiapan", desc: "Siapkan dokumen dan pola pikir Anda" },
      { title: "Koneksi", desc: "Bertemu dengan calon pemberi kerja" },
      { title: "Mulai", desc: "Mulai karier Anda di Jepang" },
    ],
    cta: {
      text: "Mulai Perjalanan Anda",
      btn: "Kirim Profil Anda",
    },
  },
  ja: {
    heroTitle: "個人の方へ",
    opening: "適切な準備とガイダンスで、日本で働くための旅を始めましょう。",
    needsTitle: "必要なもの",
    needs: [
      { icon: Globe, label: "日本語能力" },
      { icon: Users, label: "企業文化の理解" },
      { icon: MessageSquare, label: "面接の準備" },
    ],
    supportTitle: "サポート内容",
    supportDesc: "日本の労働市場への準備を万全にするため、包括的な支援を提供します。",
    supportItems: [
      { 
        title: "キャリアガイダンス", 
        desc: "JaLink Career / Rianerが、プロセスの各ステップであなたのパーソナルガイドを務めます。",
        icon: Briefcase 
      },
      { 
        title: "語学トレーニング", 
        desc: "JaLink Academyは、語学要件を満たすための専門的なトレーニングを提供します。",
        icon: BookOpen 
      },
    ],
    pricingBtn: "プログラムと料金を見る",
    flowTitle: "プロセス",
    flow: [
      { title: "学ぶ", desc: "必要なスキルを習得する" },
      { title: "準備する", desc: "書類と言語、マインドセットを整える" },
      { title: "つながる", desc: "雇用主とのマッチング" },
      { title: "スタート", desc: "日本でのキャリアを開始" },
    ],
    cta: {
      text: "旅を始める",
      btn: "プロフィールを送信",
    },
  }
};

export default function ServicePage() {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

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
              <User size={32} strokeWidth={2.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white tracking-widest mb-6"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-teal-400 text-xl md:text-2xl font-medium leading-relaxed"
          >
            "{t.opening}"
          </motion.p>
          <div className="w-24 h-px bg-slate-700 mx-auto mt-8"></div>
        </div>
      </section>

      {/* --- WHAT YOU NEED SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16"
          >
            {t.needsTitle}
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.needs.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className="bg-slate-50 p-10 rounded-[2rem] flex flex-col items-center text-center group hover:bg-teal-50 transition-colors duration-300 shadow-sm"
              >
                <div className="w-20 h-20 bg-teal-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                  <item.icon size={36} />
                </div>
                <span className="text-xl font-bold text-slate-800">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- HOW WE SUPPORT SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.supportTitle}</h2>
              <div className="space-y-8 mb-10">
                {t.supportItems.map((item, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <motion.a
                href="https://docs.google.com/document/d/example-dummy-link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-teal-600/20"
              >
                {t.pricingBtn} <ExternalLink size={20} />
              </motion.a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 relative w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image 
                src="https://picsum.photos/seed/support/800/600" 
                alt="Support" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FLOW SECTION (REFINED PATHWAY STYLE) --- */}
      <section className="pt-24 pb-40 bg-slate-950 relative overflow-hidden">
        {/* Subtle background gradients for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-teal-500 font-bold tracking-[0.2em] uppercase text-sm"
            >
              Step-by-Step
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-white mt-2"
            >
              {t.flowTitle}
            </motion.h2>
          </div>

          <div className="relative">
            {/* --- The Animated Path (Desktop) --- */}
            <div className="hidden md:block absolute top-20 left-[10%] right-[10%] h-[2px] z-0">
              <svg width="100%" height="2" className="overflow-visible">
                <motion.line
                  x1="0" y1="0" x2="100%" y2="0"
                  stroke="url(#gradientPath)"
                  strokeWidth="2"
                  strokeDasharray="12 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
              {t.flow.map((step, idx) => {
                const stepIcons = [BookOpen, Briefcase, Globe, CheckCircle];
                const Icon = stepIcons[idx];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="group"
                  >
                    <div className="flex flex-col items-center">
                      {/* Icon Node */}
                      <div className="relative mb-10">
                        <div className="absolute -inset-4 bg-teal-500/20 rounded-full blur-xl group-hover:bg-teal-500/40 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                        
                        <div className="w-20 h-20 bg-slate-900 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-teal-400 group-hover:text-white group-hover:border-teal-500 group-hover:bg-teal-500 transition-all duration-300 shadow-xl relative z-10 overflow-hidden">
                          <Icon size={32} />
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-800 border-2 border-slate-700 text-teal-400 rounded-lg flex items-center justify-center font-black text-xs z-20 group-hover:border-white group-hover:text-white transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="text-center p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-sm group-hover:bg-slate-900/60 group-hover:border-white/10 transition-all duration-300 w-full min-h-[160px] flex flex-col justify-center">
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-32 bg-gradient-to-br from-teal-700 to-teal-900 text-white relative overflow-hidden">
        {/* Decorative divider to bridge the gap from the dark flow section */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-950 to-transparent"></div>
        
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://picsum.photos/seed/pattern2/1920/1080')] opacity-10 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mt-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-12 leading-tight"
          >
            {t.cta.text}
          </motion.h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/submit')}
            className="px-14 py-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-2xl text-xl transition-colors shadow-2xl shadow-amber-500/40"
          >
            {t.cta.btn}
          </motion.button>
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
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, ArrowUpRight, Compass, GraduationCap, Briefcase, Languages, 
  MapPin, ArrowUp, Cpu, MonitorPlay, HeartHandshake, Clock, User, 
  Building, Users, BookOpen 
} from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- 1. LANGUAGE DICTIONARY ---
const dict = {
  en: {
    hero: { subtitle: "Endow Better Opportunities", title: "Finding Your Way to Japan", desc: "For talents building their careers and companies seeking the right people.", cta: "Contact Us", aboutBtn: "About Us" },
    split: {
      indTitle: "For Individuals",
      indDesc: "Start your journey toward working in Japan with clear guidance and preparation.",
      compTitle: "For Companies",
      compDesc: "Access qualified and prepared talent with the right skills and mindset for the Japanese work environment."
    },
    services: { 
      title: "OUR SERVICES",
      s1Title: "Rianer", s1Desc: "Personalized career consultation and guidance.",
      s2Title: "JaLink Academy", s2Desc: "Japanese language training (N5–N2 & Business Japanese).",
      s3Title: "Kakehashi by JaLink", s3Desc: "Interpreter and communication support (JP ⇄ ID).",
      s4Title: "JaLink Career", s4Desc: "Talent placement and hiring support for Japan."
    },
    flow: {
      title: "A Clear Path, for Both Sides",
      step1: "Prepare",
      step2: "Connect",
      step3: "Match",
      step4: "Start Working"
    },
    seminarsHeader: "LATEST NEWS",
    articles: [
      { id: 1, date: "2025.09.15", title: "Hosting 'KapanJepan Fair 2025 - Japan Job Fair' in Jakarta, Indonesia", img: "https://picsum.photos/seed/jobfair/800/500", btn: "VIEW MORE" },
      { id: 2, date: "2025.08.24", title: "'Vietnam', 'Myanmar', and 'Korea' Registered for Employment Placement Business", img: "https://picsum.photos/seed/worldmap/800/500", btn: "VIEW MORE" },
      { id: 3, date: "2025.06.24", title: "Lecture on 'Muslim Society in Japan' at Waseda University", img: "https://picsum.photos/seed/lecture/800/500", btn: "VIEW MORE" },
      { id: 4, date: "2025.06.20", title: "Launch of 'EduLabo', an Online Japanese Language Service for Indonesians", img: "https://picsum.photos/seed/edutech/800/500", btn: "VIEW MORE" }
    ],
    clientsHeader: "OUR CLIENTS",
  },
  id: {
    hero: { subtitle: "Memberikan Peluang Lebih Baik", title: "Menghubungkan Jepang & Dunia.", desc: "Memaksimalkan potensi tak terbatas dari talenta global melalui keahlian teknik tingkat tinggi, keterampilan khusus, dan pendidikan bahasa utama.", cta: "Hubungi Kami", aboutBtn: "Tentang Kami" },
    split: {
      indTitle: "Untuk Individu",
      indDesc: "Mulailah perjalanan Anda untuk bekerja di Jepang dengan panduan dan persiapan yang jelas.",
      compTitle: "Untuk Perusahaan",
      compDesc: "Dapatkan akses ke talenta yang memenuhi syarat dan siap dengan keterampilan serta pola pikir yang tepat untuk lingkungan kerja Jepang."
    },
    services: { 
      title: "LAYANAN KAMI",
      s1Title: "Rianer", s1Desc: "Konsultasi dan bimbingan karier yang dipersonalisasi.",
      s2Title: "JaLink Academy", s2Desc: "Pelatihan bahasa Jepang (N5–N2 & Bahasa Jepang Bisnis).",
      s3Title: "Kakehashi by JaLink", s3Desc: "Layanan penerjemah dan dukungan komunikasi (Jepang ⇄ Indonesia).",
      s4Title: "JaLink Career", s4Desc: "Penempatan talenta dan dukungan rekrutmen untuk Jepang."
    },
    flow: {
      title: "Jalan yang Jelas, untuk Kedua Belah Pihak",
      step1: "Persiapan",
      step2: "Koneksi",
      step3: "Pencocokan",
      step4: "Mulai Bekerja"
    },
    seminarsHeader: "BERITA TERBARU",
    articles: [
      { id: 1, date: "2025.09.15", title: "Menyelenggarakan 'KapanJepan Fair 2025 - Japan Job Fair' di Jakarta, Indonesia", img: "https://picsum.photos/seed/jobfair/800/500", btn: "LIHAT DETAIL" },
      { id: 2, date: "2025.08.24", title: "'Vietnam', 'Myanmar', dan 'Korea' Terdaftar untuk Bisnis Penempatan Kerja", img: "https://picsum.photos/seed/worldmap/800/500", btn: "LIHAT DETAIL" },
      { id: 3, date: "2025.06.24", title: "Kuliah tentang 'Masyarakat Muslim di Jepang' di Universitas Waseda", img: "https://picsum.photos/seed/lecture/800/500", btn: "LIHAT DETAIL" },
      { id: 4, date: "2025.06.20", title: "Peluncuran 'EduLabo', Layanan Bahasa Jepang Online untuk Orang Indonesia", img: "https://picsum.photos/seed/edutech/800/500", btn: "LIHAT DETAIL" }
    ],
    clientsHeader: "KLIEN KAMI",
  },
  ja: {
    hero: { subtitle: "すべての人により良い機会を", title: "日本と世界をつなぐ。", desc: "高度なエンジニアリング、特定技能、最高水準の語学教育を通じて、グローバル人材の無限の可能性を最大限に引き出します。", cta: "お問い合わせ", aboutBtn: "私たちについて" },
    split: {
      indTitle: "個人の方へ",
      indDesc: "明確なガイダンスと準備で、日本で働くための旅を始めましょう。",
      compTitle: "企業の方へ",
      compDesc: "日本の労働環境に適したスキルとマインドセットを持つ、優秀な即戦力人材にアクセスできます。"
    },
    services: { 
      title: "サービス",
      s1Title: "Rianer", s1Desc: "一人ひとりに合わせたキャリア相談とガイダンス。",
      s2Title: "JaLink Academy", s2Desc: "日本語トレーニング（N5〜N2およびビジネス日本語）。",
      s3Title: "Kakehashi by JaLink", s3Desc: "通訳・翻訳およびコミュニケーション支援（日 ⇄ 印）。",
      s4Title: "JaLink Career", s4Desc: "日本向けのグローバル人材紹介および採用支援。"
    },
    flow: {
      title: "双方にとって明確なプロセス",
      step1: "準備",
      step2: "つながる",
      step3: "マッチング",
      step4: "就業開始"
    },
    seminarsHeader: "最新ニュース",
    articles: [
      { id: 1, date: "2025.09.15", title: "インドネシア・ジャカルタにて日本就職フェア「KapanJepan Fair 2025 - Japan Job Fair」を開催", img: "https://picsum.photos/seed/jobfair/800/500", btn: "詳しく見る" },
      { id: 2, date: "2025.08.24", title: "有料職業紹介事業の取扱地域に「ベトナム」「ミャンマー」「韓国」が登録されました", img: "https://picsum.photos/seed/worldmap/800/500", btn: "詳しく見る" },
      { id: 3, date: "2025.06.24", title: "早稲田大学国際教養学部にて「日本のムスリム社会」について講義を実施", img: "https://picsum.photos/seed/lecture/800/500", btn: "詳しく見る" },
      { id: 4, date: "2025.06.20", title: "インドネシア人向けオンライン日本語学習サービス「EduLabo」の提供を開始", img: "https://picsum.photos/seed/edutech/800/500", btn: "詳しく見る" }
    ],
    clientsHeader: "主要取引先",
  }
};

// --- MOCK CLIENT DATA ---
const clientLogos = [
  { name: "OKI", icon: Cpu, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Human", desc: "ヒューマンリソシア", icon: Users, color: "text-rose-500", bg: "bg-rose-50" },
  { name: "ISF NET", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50" },
  { name: "Waseda", desc: "University", icon: BookOpen, color: "text-red-800", bg: "bg-red-50" },
  { name: "TechCorp", desc: "Global", icon: MonitorPlay, color: "text-teal-600", bg: "bg-teal-50" },
  { name: "PartnerInc", icon: HeartHandshake, color: "text-amber-500", bg: "bg-amber-50" },
];

export default function ReimaginedLandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("preferredLang", newLang);
  };

  const t = dict[lang];
  const latestArticles = t.articles.slice(0, 5);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isHovered) return; 
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === latestArticles.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, latestArticles.length]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; 
    if (info.offset.x < -swipeThreshold) {
      setCurrentSlide((prev) => (prev === latestArticles.length - 1 ? 0 : prev + 1));
    } else if (info.offset.x > swipeThreshold) {
      setCurrentSlide((prev) => (prev === 0 ? latestArticles.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const springUp = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 } }
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
        
        <motion.div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={springUp} className="px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md text-teal-400 font-bold tracking-widest uppercase mb-8 text-xs md:text-sm">
            {t.hero.subtitle}
          </motion.div>
          <motion.h1 variants={springUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={springUp} className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            {t.hero.desc}
          </motion.p>
          
          <motion.div variants={springUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(20, 184, 166, 0.3)" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => router.push('/contact')} 
              className="bg-teal-500 text-slate-950 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
            >
              {t.hero.cta} <ArrowUpRight className="w-5 h-5" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => router.push('/about')} 
              className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center transition-colors w-full sm:w-auto hover:border-white/60"
            >
              {t.hero.aboutBtn}
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
            <p className="text-slate-600 font-medium leading-relaxed">
              {t.split.indDesc}
            </p>
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
            <p className="text-slate-300 font-medium leading-relaxed">
              {t.split.compDesc}
            </p>
          </motion.div>

        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">{t.services.title}</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          
          {/* Service 1: Rianer */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="md:col-span-2 bg-slate-100 rounded-[2rem] shadow-md border border-slate-100 flex flex-col justify-end relative overflow-hidden group cursor-pointer"
          >
            <Image src="https://picsum.photos/seed/career/1200/800" alt="Career Consultation" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" /> 
            
            <div className="absolute top-6 right-6 w-12 h-12 bg-white text-teal-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 z-20">
              <Compass size={24} />
            </div>
            
            <div className="relative z-20 w-full md:w-3/4 p-8 md:p-10">
              <h3 className="text-3xl md:text-4xl font-black mb-3 text-slate-900 tracking-tight">{t.services.s1Title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed max-w-sm">{t.services.s1Desc}</p>
            </div>
          </motion.div>

          {/* Service 2: JaLink Academy */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="bg-slate-900 rounded-[2rem] shadow-xl flex flex-col justify-end relative overflow-hidden group cursor-pointer"
          >
            <Image src="https://picsum.photos/seed/classroom/800/800" alt="Language Academy" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-950/85 group-hover:bg-slate-950/75 transition-colors duration-500" /> 
            
            <div className="relative z-20 p-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-5 group-hover:-rotate-12 transition-transform duration-300">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white leading-tight">{t.services.s2Title}</h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">{t.services.s2Desc}</p>
            </div>
          </motion.div>

          {/* Service 3: Kakehashi by JaLink */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="bg-teal-50 rounded-[2rem] shadow-sm border border-teal-100 flex flex-col justify-end relative overflow-hidden group cursor-pointer"
          >
            <Image src="https://picsum.photos/seed/meeting/800/800" alt="Interpreter" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-teal-50/90 group-hover:bg-teal-50/80 transition-colors duration-500" /> 
            
            <div className="absolute top-6 right-6 w-12 h-12 bg-white text-teal-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 z-20">
              <Languages size={24} />
            </div>
            
            <div className="relative z-20 mt-auto p-8">
              <h3 className="text-2xl font-bold mb-3 text-teal-950 leading-tight">{t.services.s3Title}</h3>
              <p className="text-teal-800 text-sm font-medium leading-relaxed">{t.services.s3Desc}</p>
            </div>
          </motion.div>

          {/* Service 4: JaLink Career */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="md:col-span-2 bg-slate-900 rounded-[2rem] shadow-md border border-slate-100 flex flex-col justify-end relative overflow-hidden group cursor-pointer p-8 md:p-10" 
          >
            <Image src="https://picsum.photos/seed/businessjob/1200/800" alt="Career Placement" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors duration-500" /> 
            
            <div className="relative z-20 mt-auto">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={24} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">{t.services.s4Title}</h3>
              <p className="text-slate-200 text-sm font-medium leading-relaxed max-w-sm">{t.services.s4Desc}</p>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* --- NEW FLOW SECTION --- */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        {/* Subtle background glow */}
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
              { icon: Globe, label: t.flow.step2 },
              { icon: HeartHandshake, label: t.flow.step3 },
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

      {/* --- LATEST NEWS SECTION (Carousel) --- */}
      <section className="pt-24 pb-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">{t.seminarsHeader}</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          {/* Carousel Wrapper */}
          <div 
            className="relative w-full overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
             <motion.div 
               className="flex cursor-grab active:cursor-grabbing"
               drag="x"
               dragConstraints={{ left: 0, right: 0 }}
               dragElastic={0.2}
               onDragEnd={handleDragEnd}
               animate={{ x: `-${currentSlide * 100}%` }}
               transition={{ type: "spring", stiffness: 200, damping: 25 }}
             >
               {latestArticles.map((article) => (
                 <div key={article.id} className="min-w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between gap-12 p-4 md:p-8 select-none pointer-events-none md:pointer-events-auto">
                    <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 pointer-events-none">
                       <Image src={article.img} alt={article.title} fill className="object-cover" draggable="false" />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-start pr-0 md:pr-12 pointer-events-none md:pointer-events-auto">
                       <div className="flex items-center gap-2 text-slate-500 font-bold mb-4 uppercase tracking-wider text-sm">
                          <Clock size={18} className="text-teal-500" /> {article.date}
                       </div>
                       <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed mb-10">
                          {article.title}
                       </h3>
                       <button 
                         onClick={() => router.push(`/news/${article.id}`)}
                         className="px-8 py-3 border-2 border-teal-500 text-teal-600 rounded-full font-bold hover:bg-teal-500 hover:text-white transition-colors flex items-center gap-2 shadow-sm pointer-events-auto"
                       >
                          {article.btn}
                       </button>
                    </div>
                 </div>
               ))}
             </motion.div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
             {latestArticles.map((_, idx) => (
               <button 
                 key={idx} 
                 onClick={() => setCurrentSlide(idx)}
                 className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-slate-800" : "w-4 bg-slate-300 hover:bg-slate-400"}`}
                 aria-label={`Go to slide ${idx + 1}`}
               />
             ))}
          </div>
        </div>
      </section>

      {/* --- OUR CLIENTS SECTION (Infinite Marquee) --- */}
      <section className="py-24 bg-slate-50 overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">{t.clientsHeader}</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
          </motion.div>
        </div>

        {/* The Marquee Track */}
        <div className="relative w-full overflow-hidden flex bg-white py-12 border-y border-slate-200 shadow-sm before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 md:before:w-48 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 md:after:w-48 after:bg-gradient-to-l after:from-white after:to-transparent">
            
           <motion.div
             className="flex gap-24 items-center min-w-max px-12"
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ ease: "linear", duration: 25, repeat: Infinity }}
           >
             {[...clientLogos, ...clientLogos].map((client, index) => (
               <div key={index} className="flex items-center gap-5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <div className={`w-16 h-16 ${client.bg} ${client.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                    <client.icon size={32} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-3xl font-black text-slate-800 tracking-tight leading-none">{client.name}</h4>
                    {client.desc && <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{client.desc}</p>}
                  </div>
               </div>
             ))}
           </motion.div>

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
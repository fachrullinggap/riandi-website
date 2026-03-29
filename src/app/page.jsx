"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowUpRight, Code, Users, BookOpen, Building2, MapPin, ArrowUp, Cpu, MonitorPlay, HeartHandshake, Clock } from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- 1. LANGUAGE DICTIONARY (Updated with Articles) ---
const dict = {
  en: {
    hero: { subtitle: "Endow Better Opportunities", title: "Connecting Japan & The World.", desc: "Maximizing the infinite potential of global talent through highly skilled engineering, specified skills, and premier language education.", cta: "Contact Us" },
    services: { 
      title: "OUR SERVICES",
      s1Title: "High Skilled Engineers", s1Desc: "Recruiting top IT and engineering talent directly from Indonesian universities.",
      s2Title: "Specified Skilled Workers", s2Desc: "Providing vibrant, competitive talent for a wide range of industries in Japan.",
      s3Title: "KapanJepan Platform", s3Desc: "Japan's premier employment platform specializing in high-level Indonesian human resources.",
      s4Title: "EduLabo Online", s4Desc: "Comprehensive online Japanese language education, from JLPT to interview prep."
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
    hero: { subtitle: "Memberikan Peluang Lebih Baik", title: "Menghubungkan Jepang & Dunia.", desc: "Memaksimalkan potensi tak terbatas dari talenta global melalui keahlian teknik tingkat tinggi, keterampilan khusus, dan pendidikan bahasa utama.", cta: "Hubungi Kami" },
    services: { 
      title: "LAYANAN KAMI",
      s1Title: "Insinyur Berketerampilan Tinggi", s1Desc: "Merekrut talenta IT dan teknik terbaik langsung dari universitas di Indonesia.",
      s2Title: "Pekerja Berketerampilan Khusus", s2Desc: "Menyediakan talenta yang dinamis dan kompetitif untuk berbagai industri di Jepang.",
      s3Title: "Platform KapanJepan", s3Desc: "Platform pekerjaan utama Jepang yang mengkhususkan diri pada sumber daya manusia Indonesia tingkat tinggi.",
      s4Title: "EduLabo Online", s4Desc: "Pendidikan bahasa Jepang online komprehensif, dari JLPT hingga persiapan wawancara."
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
    hero: { subtitle: "すべての人により良い機会を", title: "日本と世界をつなぐ。", desc: "高度なエンジニアリング、特定技能、最高水準の語学教育を通じて、グローバル人材の無限の可能性を最大限に引き出します。", cta: "お問い合わせ" },
    services: { 
      title: "サービス",
      s1Title: "高度ITエンジニア", s1Desc: "インドネシアの大学から直接、優秀なITおよびエンジニアリングの人材を採用します。",
      s2Title: "特定技能労働者", s2Desc: "日本の幅広い産業に向けて、活気に密ちた競争力のある人材を提供します。",
      s3Title: "カパンジュパン プラットフォーム", s3Desc: "ハイレベルなインドネシア人材に特化した日本初の就職プラットフォーム。",
      s4Title: "エデュラボ オンライン", s4Desc: "JLPTから面接対策まで、総合的なオンライン日本語教育。"
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
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
          <motion.button 
            variants={springUp} 
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(20, 184, 166, 0.3)" }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => router.push('/contact')} 
            className="bg-teal-500 text-slate-950 px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto transition-colors"
          >
            {t.hero.cta} <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* --- SERVICES SECTION (Updated Layout & Overlays) --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">{t.services.title}</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          
          {/* Service 1: High Skilled Engineers */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="md:col-span-2 bg-slate-100 rounded-[2rem] shadow-md border border-slate-100 flex flex-col justify-end relative overflow-hidden group cursor-pointer"
          >
            <Image src="https://picsum.photos/seed/engineer_dummy_v2/1200/800" alt="Engineers" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* White gradient fading to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" /> 
            
            <div className="absolute top-6 right-6 w-12 h-12 bg-white text-teal-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 z-20">
              <Code size={24} />
            </div>
            
            <div className="relative z-20 w-full md:w-3/4 p-8 md:p-10">
              <h3 className="text-3xl md:text-4xl font-black mb-3 text-slate-900 tracking-tight">{t.services.s1Title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed max-w-sm">{t.services.s1Desc}</p>
            </div>
          </motion.div>

          {/* Service 2: Specified Skilled Workers */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="bg-slate-900 rounded-[2rem] shadow-xl flex flex-col justify-end relative overflow-hidden group cursor-pointer"
          >
            <Image src="https://picsum.photos/seed/manufacturing_dummy/800/800" alt="Worker" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Strong dark overlay */}
            <div className="absolute inset-0 bg-slate-950/85 group-hover:bg-slate-950/75 transition-colors duration-500" /> 
            
            <div className="relative z-20 p-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-5 group-hover:-rotate-12 transition-transform duration-300">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white leading-tight">{t.services.s2Title}</h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">{t.services.s2Desc}</p>
            </div>
          </motion.div>

          {/* Service 3: KapanJepan Platform */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="bg-teal-50 rounded-[2rem] shadow-sm border border-teal-100 flex flex-col justify-end relative overflow-hidden group cursor-pointer"
          >
            <Image src="https://picsum.photos/seed/platform_dummy_v2/800/800" alt="Platform" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Soft teal overlay */}
            <div className="absolute inset-0 bg-teal-50/90 group-hover:bg-teal-50/80 transition-colors duration-500" /> 
            
            <div className="absolute top-6 right-6 w-12 h-12 bg-white text-teal-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 z-20">
              <Building2 size={24} />
            </div>
            
            <div className="relative z-20 mt-auto p-8">
              <h3 className="text-2xl font-bold mb-3 text-teal-950 leading-tight">{t.services.s3Title}</h3>
              <p className="text-teal-800 text-sm font-medium leading-relaxed">{t.services.s3Desc}</p>
            </div>
          </motion.div>

          {/* Service 4: EduLabo Online */}
          <motion.div 
            variants={springUp} 
            whileHover={{ y: -6 }} 
            onClick={() => router.push('/services')}
            className="md:col-span-2 bg-slate-900 rounded-[2rem] shadow-md border border-slate-100 flex flex-col justify-end relative overflow-hidden group cursor-pointer p-8 md:p-10" // Padding and dark theme
          >
            <Image src="https://picsum.photos/seed/study/1200/800" alt="Study" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Dark dim overlay for readability */}
            <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors duration-500" /> 
            
            {/* Text directly inside the card with new colors and mt-auto */}
            <div className="relative z-20 mt-auto">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={24} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">{t.services.s4Title}</h3>
              <p className="text-slate-200 text-sm font-medium leading-relaxed max-w-sm">{t.services.s4Desc}</p>
            </div>
          </motion.div>

        </motion.div>
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
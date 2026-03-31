"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rss, Search, Clock, ChevronRight, ArrowUp } from "lucide-react";
import Image from "next/image";

// Import your reusable components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. LANGUAGE DICTIONARY ---
const dict = {
  en: {
    hero: { title: "NEWS", subtitle: "Latest Information" },
    sidebar: {
      recent: "Recent Posts",
      searchBtn: "Search",
      searchPlaceholder: "Search title...",
      noResults: "No articles found matching your search."
    },
    readMore: "Read More",
    articles: [
      { id: 1, date: "2025.09.15", title: "Hosting 'KapanJepan Fair 2025 - Japan Job Fair' in Jakarta, Indonesia", excerpt: "Promoting recruitment for Japanese companies from Indonesia, which boasts the largest youth population in ASEAN...", img: "https://picsum.photos/seed/jobfair/800/500" },
      { id: 2, date: "2025.08.24", title: "'Vietnam', 'Myanmar', and 'Korea' Registered for Employment Placement Business", excerpt: "Career Diversity Inc. has expanded its recruitment areas. Following Indonesia, India, and Malaysia...", img: "https://picsum.photos/seed/worldmap/800/500" },
      { id: 3, date: "2025.06.24", title: "Lecture on 'Muslim Society in Japan' at Waseda University", excerpt: "Representative Director Kaiji Wada gave a guest lecture at the First Year Seminar...", img: "https://picsum.photos/seed/lecture/800/500" },
      { id: 4, date: "2025.06.20", title: "Launch of 'EduLabo', an Online Japanese Language Service for Indonesians", excerpt: "We have officially started offering EduLabo, a comprehensive online Japanese education service...", img: "https://picsum.photos/seed/edutech/800/500" }
    ],
  },
  id: {
    hero: { title: "BERITA", subtitle: "Informasi Terbaru" },
    sidebar: {
      recent: "Postingan Terbaru",
      searchBtn: "Cari",
      searchPlaceholder: "Cari judul...",
      noResults: "Tidak ada artikel yang cocok dengan pencarian Anda."
    },
    readMore: "Baca Selengkapnya",
    articles: [
      { id: 1, date: "2025.09.15", title: "Menyelenggarakan 'KapanJepan Fair 2025 - Japan Job Fair' di Jakarta, Indonesia", excerpt: "Mempromosikan rekrutmen untuk perusahaan Jepang dari Indonesia...", img: "https://picsum.photos/seed/jobfair/800/500" },
      { id: 2, date: "2025.08.24", title: "'Vietnam', 'Myanmar', dan 'Korea' Terdaftar untuk Bisnis Penempatan Kerja", excerpt: "Career Diversity Inc. telah memperluas area rekrutmennya...", img: "https://picsum.photos/seed/worldmap/800/500" },
      { id: 3, date: "2025.06.24", title: "Kuliah tentang 'Masyarakat Muslim di Jepang' di Universitas Waseda", excerpt: "Direktur Perwakilan Kaiji Wada memberikan kuliah tamu...", img: "https://picsum.photos/seed/lecture/800/500" },
      { id: 4, date: "2025.06.20", title: "Peluncuran 'EduLabo', Layanan Bahasa Jepang Online untuk Orang Indonesia", excerpt: "Kami telah resmi mulai menawarkan EduLabo...", img: "https://picsum.photos/seed/edutech/800/500" }
    ],
  },
  ja: {
    hero: { title: "NEWS", subtitle: "新着情報" },
    sidebar: {
      recent: "新着情報",
      searchBtn: "検索",
      searchPlaceholder: "記事タイトルを検索...",
      noResults: "検索条件に一致する記事が見つかりませんでした。"
    },
    readMore: "詳しく読む",
    articles: [
      { id: 1, date: "2025.09.15", title: "インドネシア・ジャカルタにて日本就職フェア「KapanJepan Fair 2025 - Japan Job Fair」を開催", excerpt: "ASEAN最大規模の若年人口を誇るインドネシアから、日本企業の採用を後押し...", img: "https://picsum.photos/seed/jobfair/800/500" },
      { id: 2, date: "2025.08.24", title: "有料職業紹介事業の取扱地域に「ベトナム」「ミャンマー」「韓国」が登録されました", excerpt: "キャリアダイバーシティ株式会社は取扱地域を拡大し...", img: "https://picsum.photos/seed/worldmap/800/500" },
      { id: 3, date: "2025.06.24", title: "早稲田大学国際教養学部にて「日本のムスリム社会」について講義を実施", excerpt: "代表取締役の和田海二がゲスト講師として登壇しました...", img: "https://picsum.photos/seed/lecture/800/500" },
      { id: 4, date: "2025.06.20", title: "インドネシア人向けオンライン日本語学習サービス「EduLabo」の提供を開始", excerpt: "インドネシア高度人材に特化した、オンライン日本語教育サービス...", img: "https://picsum.photos/seed/edutech/800/500" }
    ],
  }
};

// --- Animation Variants ---
const letterVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } };
const wordVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } };
const containerStagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

export default function NewsPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  
  // SEARCH STATES
  const [searchInput, setSearchInput] = useState(""); // Captures typing
  const [activeSearch, setActiveSearch] = useState(""); // Triggers on button click

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
  const [showScrollTop, setShowScrollTop] = useState(false);

  // LOGIC: Filter articles based on the activeSearch string
  const filteredArticles = t.articles.filter(article => 
    article.title.toLowerCase().includes(activeSearch.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300">
      
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- HERO SECTION (Repositioned and colored for picture) --- */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
         {/* Subtle background decoration (keep this) */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-teal-50/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
         
         {/* Dark navy base background for the section */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-800 pointer-events-none"></div>

         {/* Centered content container directly on dark background */}
         <div className="max-w-7xl mx-auto w-full flex flex-col items-center relative z-10">
            <div className="flex flex-col items-center text-center w-full max-w-2xl mx-auto">
               
               <motion.div initial="hidden" animate="visible" variants={containerStagger} className="flex flex-col items-center">
                   
                   {/* ICON (Subtle Box on Dark Background) */}
                   <motion.div variants={fadeUp} className="w-16 h-16 bg-teal-900/60 text-teal-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
                       <Rss size={32} strokeWidth={2.5} />
                   </motion.div>
                   
                   {/* CHARACTER STAGGERED TITLE (WHITE) */}
                   <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white tracking-widest mb-4 uppercase flex gap-1 cursor-default">
                     {t.hero.title.split("").map((letter, idx) => (
                       <motion.span key={idx} variants={letterVariants} className="inline-block hover:text-teal-500 transition-colors duration-300">
                         {letter}
                       </motion.span>
                     ))}
                   </motion.h1>
                   
                   {/* WORD STAGGERED SUBTITLE (BRIGHT TEAL) */}
                   <motion.p variants={fadeUp} className="text-teal-400 font-medium tracking-widest flex gap-2 flex-wrap justify-center uppercase">
                     {t.hero.subtitle.split(" ").map((word, idx) => (
                       <motion.span key={idx} variants={wordVariants} className="inline-block">
                         {word}
                       </motion.span>
                     ))}
                   </motion.p>

               </motion.div>
            </div>
         </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* SIDEBAR */}
          <motion.aside initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/4 flex flex-col gap-12 lg:sticky lg:top-32 h-fit">
            
            {/* Recent Posts */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">{t.sidebar.recent}</h3>
              <div className="space-y-5">
                {t.articles.slice(0, 3).map((article) => (
                  <div key={article.id} className="group cursor-pointer" onClick={() => router.push(`/news/${article.id}`)}>
                    <p className="text-[10px] text-teal-600 font-bold mb-1 uppercase tracking-wider">{article.date}</p>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">{article.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="flex flex-col md:flex-row lg:flex-col gap-2">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.sidebar.searchPlaceholder} 
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm shadow-sm" 
              />
              <button 
                onClick={() => setActiveSearch(searchInput)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
              >
                {t.sidebar.searchBtn}
              </button>
            </div>

          </motion.aside>

          {/* NEWS LIST (Filtered) */}
          <div className="w-full lg:w-3/4 flex flex-col gap-12">
            <AnimatePresence mode="popLayout">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, idx) => (
                  <motion.article 
                    layout
                    key={article.id} 
                    onClick={() => router.push(`/news/${article.id}`)}
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer"
                  >
                    <div className="w-full md:w-5/12 h-64 relative rounded-3xl overflow-hidden shrink-0 shadow-inner">
                      <Image src={article.img} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    <div className="w-full md:w-7/12 flex flex-col items-start pr-4">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-black text-white bg-teal-500 px-3 py-1 rounded-full tracking-widest">{article.date}</span>
                        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">CareerDiv. Update</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-teal-600 transition-colors">{article.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">{article.excerpt}</p>
                      <button className="flex items-center gap-2 text-teal-600 font-black text-sm group/btn">
                        {t.readMore} <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center group-hover/btn:bg-teal-500 group-hover/btn:text-white transition-all"><ChevronRight size={16} /></div>
                      </button>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300"
                >
                  <p className="text-slate-500 font-medium">{t.sidebar.noResults}</p>
                  <button onClick={() => {setSearchInput(""); setActiveSearch("");}} className="mt-4 text-teal-600 font-bold hover:underline">Clear Search</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination Placeholder (Only show if not searching or if items exist) */}
            {filteredArticles.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                 <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black shadow-lg">1</button>
                 <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all font-black">2</button>
                 <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all font-black">3</button>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer lang={lang} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} onClick={scrollToTop} className="fixed bottom-8 right-8 p-4 bg-teal-500 text-white rounded-full shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all z-[100] group">
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
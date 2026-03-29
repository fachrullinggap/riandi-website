"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ChevronRight, ArrowUp, BookOpenText } from "lucide-react";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. MOCK DICTIONARY (COLUMNS) ---
const dict = {
  en: {
    hero: { title: "COLUMN", subtitle: "Insights & Know-how" },
    sidebar: { recent: "Recent Posts", searchBtn: "Search", searchPlaceholder: "Search columns...", categoriesTitle: "Categories", noResults: "No columns found." },
    categories: ["Interns' Voices", "Local Info in Indonesia", "Know-how & Trends", "Local Univ. Intro", "Lectures", "Others"],
    readMore: "Read More",
    articles: [
      { id: 1, category: "Know-how & Trends", date: "2026.03.22", title: "Taiwan's Strategy for Highly Skilled Indonesian Talent: The Reality of an 'Education x Hiring' Integrated Model", excerpt: "In recent years, the competition to acquire highly skilled talent in Indonesia has intensified not only in Japan but globally. Taiwan's unique approach...", img: "https://picsum.photos/seed/taiwan/800/500" },
      { id: 2, category: "Know-how & Trends", date: "2026.03.22", title: "Local Governments' Strategy for Acquiring Highly Skilled Indonesian Talent - Shift to Engineer Visa -", excerpt: "The labor shortage in Japan's regional areas has significantly shifted from 'simple labor' to 'highly skilled talent'. A growing movement to hire young Indonesian talent...", img: "https://picsum.photos/seed/localgov/800/500" },
      { id: 3, category: "Local Univ. Intro", date: "2026.03.22", title: "Top 3 Indonesian Universities Strong in IT - Notable Schools Producing High-Level IT Talent -", excerpt: "In Indonesia, the demand for IT talent has rapidly increased against the backdrop of rapid digital economy growth. The importance of engineers and IT consultants...", img: "https://picsum.photos/seed/binus/800/500" },
      { id: 4, category: "Know-how & Trends", date: "2026.03.22", title: "Examples of Indonesian Talent Utilization Promoted by Regional Banks", excerpt: "In Japan, the labor shortage due to the declining birthrate and aging population is becoming serious. In this situation, regional banks are going beyond traditional financial support...", img: "https://picsum.photos/seed/bank/800/500" }
    ],
  },
  id: {
    hero: { title: "KOLOM", subtitle: "Wawasan & Pengetahuan" },
    sidebar: { recent: "Postingan Terbaru", searchBtn: "Cari", searchPlaceholder: "Cari kolom...", categoriesTitle: "Kategori", noResults: "Kolom tidak ditemukan." },
    categories: ["Suara Pemagang", "Info Lokal Indonesia", "Pengetahuan & Tren", "Pengenalan Universitas Lokal", "Kuliah", "Lainnya"],
    readMore: "Baca Selengkapnya",
    articles: [
      { id: 1, category: "Pengetahuan & Tren", date: "2026.03.22", title: "Strategi Bakat Keterampilan Tinggi Indonesia oleh Taiwan: Realitas Model Terintegrasi 'Pendidikan x Perekrutan'", excerpt: "Dalam beberapa tahun terakhir, persaingan untuk mendapatkan bakat berketerampilan tinggi di Indonesia semakin meningkat tidak hanya di Jepang...", img: "https://picsum.photos/seed/taiwan/800/500" },
      { id: 2, category: "Pengetahuan & Tren", date: "2026.03.22", title: "Strategi Pemerintah Daerah untuk Mendapatkan Bakat Keterampilan Tinggi Indonesia", excerpt: "Kekurangan tenaga kerja di daerah regional Jepang telah bergeser secara signifikan dari 'tenaga kerja sederhana' menjadi 'bakat berketerampilan tinggi'...", img: "https://picsum.photos/seed/localgov/800/500" },
      { id: 3, category: "Pengenalan Univ", date: "2026.03.22", title: "Top 3 Universitas Indonesia yang Kuat di Bidang IT - Sekolah Terkemuka Penghasil Bakat IT", excerpt: "Di Indonesia, permintaan bakat IT meningkat pesat dengan latar belakang pertumbuhan ekonomi digital. Pentingnya insinyur dan konsultan IT...", img: "https://picsum.photos/seed/binus/800/500" },
      { id: 4, category: "Pengetahuan & Tren", date: "2026.03.22", title: "Contoh Pemanfaatan Bakat Indonesia yang Dipromosikan oleh Bank Regional", excerpt: "Di Jepang, kekurangan tenaga kerja akibat penurunan angka kelahiran semakin serius. Bank-bank regional mulai mengambil peran baru...", img: "https://picsum.photos/seed/bank/800/500" }
    ],
  },
  ja: {
    hero: { title: "COLUMN", subtitle: "コラム" },
    sidebar: { recent: "最近の投稿", searchBtn: "検索", searchPlaceholder: "キーワード検索...", categoriesTitle: "カテゴリー", noResults: "該当するコラムが見つかりません。" },
    categories: ["インターン生の声", "インドネシア現地情報", "その他", "ノウハウ・トレンド", "現地大学紹介", "講演実績"],
    readMore: "続きを読む",
    articles: [
      { id: 1, category: "ノウハウ・トレンド", date: "2026.03.22", title: "台湾が仕掛けるインドネシア高度人材戦略 ー 半導体産業を軸にした「教育×採用」一体モデルの実態 ー", excerpt: "近年、インドネシアにおける高度人材の獲得競争は、日本だけでなく各国間で激しさを増しています。その中でも特に存在感を高めているのが台湾です...", img: "https://picsum.photos/seed/taiwan/800/500" },
      { id: 2, category: "ノウハウ・トレンド", date: "2026.03.22", title: "地方自治体によるインドネシア高度人材獲得戦略 ー 技人国採用へのシフト ー", excerpt: "日本の地方における人手不足は、これまでの「単純労働力不足」から「高度人材不足」へと大きくシフトしています。その中で、インドネシアを中心とした若く優秀な人材を...", img: "https://picsum.photos/seed/localgov/800/500" },
      { id: 3, category: "現地大学紹介", date: "2026.03.22", title: "インドネシアでITに強い大学3選 ー 高度IT人材を輩出する注目校とその実力 ー", excerpt: "インドネシアでは近年、デジタル経済の急成長を背景にIT人材の需要が急速に高まっています。スタートアップの台頭や企業のDX推進により、エンジニアやITコンサルタント...", img: "https://picsum.photos/seed/binus/800/500" },
      { id: 4, category: "ノウハウ・トレンド", date: "2026.03.22", title: "地方銀行が推進するインドネシア人材活用事例 ー 銀行別に見る戦略と差別化 ー", excerpt: "日本では少子高齢化に伴う人手不足が深刻化しており、とりわけ地方企業においては採用難が経営課題の中核となっています。こうした状況の中、地方銀行が従来の金融支援...", img: "https://picsum.photos/seed/bank/800/500" }
    ],
  }
};

const letterVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } };
const containerStagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

export default function ColumnPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

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

  const filteredArticles = t.articles.filter(article => 
    article.title.toLowerCase().includes(activeSearch.toLowerCase()) || 
    article.category.toLowerCase().includes(activeSearch.toLowerCase())
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

      {/* --- CLEAN HERO SECTION --- */}
      <section className="pt-48 pb-12 px-6 relative overflow-hidden flex flex-col items-center justify-center">
         <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
            <motion.div initial="hidden" animate="visible" variants={containerStagger} className="flex flex-col items-center">
                <motion.div variants={fadeUp} className="w-16 h-16 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-teal-100">
                    <BookOpenText size={32} strokeWidth={1.5} />
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2 uppercase flex gap-1">
                  {t.hero.title.split("").map((letter, idx) => (
                    <motion.span key={idx} variants={letterVariants} className="inline-block">{letter}</motion.span>
                  ))}
                </motion.h1>
                <motion.p variants={fadeUp} className="text-teal-600 font-bold text-sm tracking-widest uppercase">
                  {t.hero.subtitle}
                </motion.p>
            </motion.div>
         </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* SIDEBAR */}
          <motion.aside initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/4 flex flex-col gap-12 lg:sticky lg:top-32 h-fit">
            
            {/* Recent Posts */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">{t.sidebar.recent}</h3>
              <div className="space-y-6">
                {t.articles.slice(0, 3).map((article) => (
                  <div key={article.id} className="group cursor-pointer" onClick={() => router.push(`/column/${article.id}`)}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-[10px] text-slate-400 font-bold tracking-wider">{article.date}</p>
                      <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold">{article.category}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">{article.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.sidebar.searchPlaceholder} 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm shadow-sm" 
              />
              <button 
                onClick={() => setActiveSearch(searchInput)}
                className="bg-teal-500 hover:bg-teal-400 text-white w-full py-3 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-sm"
              >
                {t.sidebar.searchBtn}
              </button>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">{t.sidebar.categoriesTitle}</h3>
              <ul className="space-y-3">
                {t.categories.map((cat, idx) => (
                  <li key={idx} onClick={() => {setSearchInput(cat); setActiveSearch(cat);}} className="text-slate-600 font-medium text-sm hover:text-teal-600 cursor-pointer transition-colors flex items-center gap-2 group pb-2 border-b border-slate-100 last:border-0">
                     {cat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          {/* COLUMN LIST (Filtered) */}
          <div className="w-full lg:w-3/4 flex flex-col gap-10">
            <AnimatePresence mode="popLayout">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, idx) => (
                  <motion.article 
                    layout
                    key={article.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => router.push(`/column/${article.id}`)}
                    className="group cursor-pointer flex flex-col md:flex-row gap-8 items-start border-b border-slate-200 pb-10 last:border-0"
                  >
                    <div className="w-full md:w-2/5 h-56 relative rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                      <Image src={article.img} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm">
                        {article.category}
                      </div>
                    </div>

                    <div className="w-full md:w-3/5 flex flex-col items-start pt-2">
                      <div className="text-xs font-bold text-slate-500 mb-3">{article.date}</div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-teal-600 transition-colors">{article.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
                      
                      <button className="mt-auto px-6 py-2 bg-teal-500 text-white font-bold rounded text-xs shadow-sm hover:bg-teal-400 transition-colors duration-300">
                        {t.readMore}
                      </button>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <p className="text-slate-500 font-medium">{t.sidebar.noResults}</p>
                  <button onClick={() => {setSearchInput(""); setActiveSearch("");}} className="mt-4 text-teal-600 font-bold hover:underline">Clear Search</button>
                </motion.div>
              )}
            </AnimatePresence>
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
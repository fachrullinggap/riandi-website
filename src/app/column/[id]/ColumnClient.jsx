"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUp, Share2, BookOpenText } from "lucide-react";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa"; 
import Image from "next/image";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// --- 1. MOCK DICTIONARY (COLUMNS) ---
const dict = {
  en: {
    back: "Back to Column List",
    share: "Share",
    notFound: "Column not found.",
    sidebar: { recent: "Recent Posts", searchBtn: "Search", searchPlaceholder: "Search columns...", categoriesTitle: "Categories" },
    categories: ["Interns' Voices", "Local Info in Indonesia", "Know-how & Trends", "Local Univ. Intro", "Lectures", "Others"],
    articles: [
      { id: 1, category: "Know-how & Trends", date: "2026.03.22", title: "Taiwan's Strategy for Highly Skilled Indonesian Talent: The Reality of an 'Education x Hiring' Integrated Model", img: "https://picsum.photos/seed/taiwan/1200/800", content: "In recent years, the competition to acquire highly skilled talent in Indonesia has intensified not only in Japan but globally. Taiwan's unique approach is currently standing out.\n\nUnlike traditional hiring methods, Taiwan is aggressively investing in an 'Education x Hiring' integrated model. Taiwanese semiconductor companies are establishing direct pipelines with Indonesian technical universities, offering scholarships, curriculum support, and guaranteed post-graduation employment in Taiwan.\n\nThis proactive ecosystem ensures that graduates are culturally and technically prepared for Taiwanese corporate environments, significantly reducing onboarding friction and turnover rates compared to standard recruitment channels." },
      { id: 2, category: "Know-how & Trends", date: "2026.03.22", title: "Local Governments' Strategy for Acquiring Highly Skilled Indonesian Talent", img: "https://picsum.photos/seed/localgov/1200/800", content: "The labor shortage in Japan's regional areas has significantly shifted from 'simple labor' to 'highly skilled talent'.\n\nLocal governments are now actively partnering with private recruitment platforms to subsidize the hiring of young Indonesian talent. This shift toward the Engineer/Specialist in Humanities/International Services visa signifies a move toward integrating foreigners into core business strategies rather than temporary labor.\n\nSuccess cases show that community-wide support systems for these international workers are critical for long-term retention." },
      { id: 3, category: "Local Univ. Intro", date: "2026.03.22", title: "Top 3 Indonesian Universities Strong in IT", img: "https://picsum.photos/seed/binus/1200/800", content: "In Indonesia, the demand for IT talent has rapidly increased against the backdrop of rapid digital economy growth.\n\n1. Bina Nusantara University (BINUS): Known for its cutting-edge computer science program and strong industry ties.\n2. Bandung Institute of Technology (ITB): The premier STEM university in the country, producing elite software engineers.\n3. University of Indonesia (UI): Historically prestigious with a rigorous informatics curriculum.\n\nGraduates from these institutions are highly sought after by unicorns in Southeast Asia and increasingly by Japanese tech firms." },
      { id: 4, category: "Know-how & Trends", date: "2026.03.22", title: "Examples of Indonesian Talent Utilization Promoted by Regional Banks", img: "https://picsum.photos/seed/bank/1200/800", content: "In Japan, the labor shortage due to the declining birthrate and aging population is becoming serious.\n\nRegional banks are taking an innovative approach by acting as intermediaries for international recruitment. Recognizing that their local SME clients are struggling to hire, these banks are offering comprehensive support packages—from financing recruitment fees to providing cultural integration seminars for local companies.\n\nThis not only solves their clients' labor issues but also creates a new revenue stream and deepens the trust relationship between the bank and the local economy." }
    ],
  },
  id: {
    back: "Kembali ke Daftar Kolom",
    share: "Bagikan",
    notFound: "Kolom tidak ditemukan.",
    sidebar: { recent: "Postingan Terbaru", searchBtn: "Cari", searchPlaceholder: "Cari kolom...", categoriesTitle: "Kategori" },
    categories: ["Suara Pemagang", "Info Lokal Indonesia", "Pengetahuan & Tren", "Pengenalan Universitas Lokal", "Kuliah", "Lainnya"],
    articles: [
      { id: 1, category: "Pengetahuan & Tren", date: "2026.03.22", title: "Strategi Bakat Keterampilan Tinggi Indonesia oleh Taiwan", img: "https://picsum.photos/seed/taiwan/1200/800", content: "Dalam beberapa tahun terakhir, persaingan untuk mendapatkan bakat berketerampilan tinggi di Indonesia semakin meningkat tidak hanya di Jepang tetapi secara global.\n\nTidak seperti metode perekrutan tradisional, Taiwan secara agresif berinvestasi dalam model terintegrasi 'Pendidikan x Perekrutan'. Perusahaan semikonduktor Taiwan membangun saluran langsung dengan universitas teknik Indonesia, menawarkan beasiswa dan jaminan pekerjaan paska kelulusan.\n\nEkosistem proaktif ini memastikan lulusan siap secara budaya dan teknis." },
      { id: 2, category: "Pengetahuan & Tren", date: "2026.03.22", title: "Strategi Pemerintah Daerah untuk Mendapatkan Bakat Keterampilan Tinggi", img: "https://picsum.photos/seed/localgov/1200/800", content: "Kekurangan tenaga kerja di daerah regional Jepang telah bergeser secara signifikan dari 'tenaga kerja sederhana' menjadi 'bakat berketerampilan tinggi'.\n\nPemerintah daerah sekarang secara aktif bermitra dengan platform perekrutan swasta untuk mensubsidi perekrutan talenta muda Indonesia. Pergeseran ke arah visa Insinyur/Spesialis Humaniora menandakan langkah untuk mengintegrasikan orang asing ke dalam strategi bisnis inti." },
      { id: 3, category: "Pengenalan Univ", date: "2026.03.22", title: "Top 3 Universitas Indonesia yang Kuat di Bidang IT", img: "https://picsum.photos/seed/binus/1200/800", content: "Di Indonesia, permintaan bakat IT meningkat pesat dengan latar belakang pertumbuhan ekonomi digital.\n\n1. Universitas Bina Nusantara (BINUS): Dikenal dengan program ilmu komputernya yang mutakhir.\n2. Institut Teknologi Bandung (ITB): Universitas STEM terkemuka di negara ini.\n3. Universitas Indonesia (UI): Bersejarah dengan kurikulum informatika yang ketat.\n\nLulusan dari institusi ini sangat dicari oleh perusahaan rintisan di Asia Tenggara." },
      { id: 4, category: "Pengetahuan & Tren", date: "2026.03.22", title: "Contoh Pemanfaatan Bakat Indonesia oleh Bank Regional", img: "https://picsum.photos/seed/bank/1200/800", content: "Di Jepang, kekurangan tenaga kerja akibat penurunan angka kelahiran semakin serius.\n\nBank-bank regional mengambil pendekatan inovatif dengan bertindak sebagai perantara untuk rekrutmen internasional. Menyadari bahwa klien UKM lokal mereka kesulitan merekrut, bank-bank ini menawarkan paket dukungan komprehensif." }
    ],
  },
  ja: {
    back: "コラム一覧へ戻る",
    share: "シェアする",
    notFound: "記事が見つかりません。",
    sidebar: { recent: "最近の投稿", searchBtn: "検索", searchPlaceholder: "キーワード検索...", categoriesTitle: "カテゴリー" },
    categories: ["インターン生の声", "インドネシア現地情報", "その他", "ノウハウ・トレンド", "現地大学紹介", "講演実績"],
    articles: [
      { id: 1, category: "ノウハウ・トレンド", date: "2026.03.22", title: "台湾が仕掛けるインドネシア高度人材戦略 ー 半導体産業を軸にした「教育×採用」一体モデルの実態 ー", img: "https://picsum.photos/seed/taiwan/1200/800", content: "近年、インドネシアにおける高度人材の獲得競争は、日本だけでなく各国間で激しさを増しています。その中でも特に存在感を高めているのが台湾です。とりわけ半導体産業を中心とした人材確保において、台湾は従来の採用の枠を超えた独自のアプローチを展開しており、その動向は日本と大きく異なる方向性を示しています。\n\n台湾の特徴は、単に海外人材を採用するのではなく、「教育」と「就職」を一体で設計している点にあります。つまり、人材を”探す”のではなく、”育てながら確保する”という発想に基づいたモデルです。\n\nその象徴的な取り組みが、インドネシアの大学で開催されている産学連携プログラムです。台湾企業は大学のカリキュラム作成に関与し、学生に対して奨学金を提供し、卒業後の台湾での就業を確約しています。これにより、技術力と言語・文化理解を備えた即戦力人材の安定的な供給ルートを構築しています。" },
      { id: 2, category: "ノウハウ・トレンド", date: "2026.03.22", title: "地方自治体によるインドネシア高度人材獲得戦略 ー 技人国採用へのシフト ー", img: "https://picsum.photos/seed/localgov/1200/800", content: "日本の地方における人手不足は、これまでの「単純労働力不足」から「高度人材不足」へと大きくシフトしています。その中で、インドネシアを中心とした若く優秀な人材を、日本企業の中核人材として採用する動きが広がっています。\n\n特に近年、地方自治体が主導して、地域の企業に対する外国人材の採用支援（補助金やマッチングイベントの開催）を行うケースが増加しています。「技術・人文知識・国際業務」ビザを活用した採用は、企業に新たなイノベーションをもたらす起爆剤として期待されています。\n\n定着率を高めるためには、企業単体での努力だけでなく、地域全体で外国人材を包摂するコミュニティづくりの重要性が浮き彫りになっています。" },
      { id: 3, category: "現地大学紹介", date: "2026.03.22", title: "インドネシアでITに強い大学3選 ー 高度IT人材を輩出する注目校とその実力 ー", img: "https://picsum.photos/seed/binus/1200/800", content: "インドネシアでは近年、デジタル経済の急成長を背景にIT人材の需要が急速に高まっています。スタートアップの台頭や企業のDX推進により、エンジニアやITコンサルタントといった高度人材の重要性はますます増しています。\n\n日本企業が注目すべきIT名門校3選：\n1. ビナ・ヌサンタラ大学（BINUS）：実践的なカリキュラムと産学連携で国内トップの私立大学。\n2. バンドン工科大学（ITB）：インドネシアのMITとも呼ばれる、最難関の国立理系大学。\n3. インドネシア大学（UI）：総合大学のトップであり、情報科学分野でも圧倒的な実績を誇る。\n\nこれらの大学の卒業生は、東南アジアのユニコーン企業や、海外展開を進める日系テック企業から引く手あまたとなっています。" },
      { id: 4, category: "ノウハウ・トレンド", date: "2026.03.22", title: "地方銀行が推進するインドネシア人材活用事例 ー 銀行別に見る戦略と差別化 ー", img: "https://picsum.photos/seed/bank/1200/800", content: "日本では少子高齢化に伴う人手不足が深刻化しており、とりわけ地方企業においては採用難が経営課題の中核となっています。こうした状況の中、地方銀行が従来の金融支援にとどまらず、「人材供給」という新たな価値提供を担い始めています。\n\n具体的には、地銀が人材紹介会社と業務提携を結び、取引先企業の採用課題を解決するコンサルティング業務を展開しています。インドネシアの高度人材を紹介することで、企業の生産性向上を支援し、結果的に融資先の業績アップ（本業支援）につなげる狙いがあります。\n\nこの取り組みは、単なる人材紹介ではなく、地域経済の持続可能性を担保するための、金融機関としての新しいビジネスモデルとして注目を集めています。" }
    ],
  }
};

export default function ColumnClient() {
  const params = useParams();
  const router = useRouter();
  const articleId = parseInt(params?.id);

  const [lang, setLang] = useState("en");
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
  const article = t.articles.find(a => a.id === articleId);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{t.notFound}</h1>
        <button onClick={() => router.push('/column')} className="text-teal-600 font-bold hover:underline">{t.back}</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300">
      
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- SMALL HERO SECTION FOR DETAIL PAGE --- */}
      <section className="pt-32 pb-8 px-6 relative overflow-hidden flex flex-col items-center justify-center border-b border-slate-200 bg-white">
         <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
            <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-xl flex items-center justify-center mb-3 shadow-sm border border-teal-100">
                    <BookOpenText size={24} />
                </div>
                <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">COLUMN</p>
            </motion.div>
         </div>
      </section>

      {/* --- MAIN CONTENT (SIDEBAR + FULL ARTICLE) --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* SIDEBAR */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 0.5}} className="w-full lg:w-1/4 flex flex-col gap-12 lg:sticky lg:top-32 h-fit hidden md:flex">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">{t.sidebar.recent}</h3>
              <div className="space-y-6">
                {t.articles.slice(0, 3).map((recent) => (
                  <div key={recent.id} className="group cursor-pointer" onClick={() => router.push(`/column/${recent.id}`)}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-[10px] text-slate-400 font-bold tracking-wider">{recent.date}</p>
                      <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold">{recent.category}</span>
                    </div>
                    <p className={`text-sm font-semibold transition-colors line-clamp-2 leading-snug ${recent.id === articleId ? 'text-teal-600' : 'text-slate-800 group-hover:text-teal-600'}`}>{recent.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">{t.sidebar.categoriesTitle}</h3>
              <ul className="space-y-3">
                {t.categories.map((cat, idx) => (
                  <li key={idx} onClick={() => router.push('/column')} className={`font-medium text-sm cursor-pointer transition-colors flex items-center gap-2 group pb-2 border-b border-slate-100 last:border-0 ${cat === article.category ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`}>
                     {cat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          {/* FULL ARTICLE VIEW */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full lg:w-3/4 flex flex-col items-start">
            
            {/* TOP BACK BUTTON (Visible Everywhere) */}
            <button 
              onClick={() => router.push('/column')} 
              className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-teal-600 transition-colors mb-8 group"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-teal-200 group-hover:bg-teal-50 transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              {t.back}
            </button>

            {/* Article Header Info */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-xs font-bold text-slate-500">{article.date}</span>
              <span className="text-[10px] font-black text-white bg-slate-800 px-3 py-1 rounded shadow-sm">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.3] mb-10 tracking-tight">
              {article.title}
            </h1>

            {/* Hero Image */}
            <div className="w-full aspect-[16/9] relative overflow-hidden mb-10 bg-slate-200 rounded">
              <Image src={article.img} alt={article.title} fill className="object-cover" priority />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-slate max-w-none w-full">
              {article.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-700 leading-loose mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* BOTTOM SECTION (Back Button + Share) */}
            <div className="mt-16 pt-8 w-full border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Bottom Back Button */}
              <button 
                onClick={() => router.push('/column')} 
                className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-teal-600 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                {t.back}
              </button>

              <div className="flex items-center gap-4">
                <p className="font-bold text-slate-800 text-sm">{t.share}</p>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#0077B5] hover:text-white transition-colors"><FaLinkedin size={16}/></button>
                  <button className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white transition-colors"><FaFacebook size={16}/></button>
                  <button className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#1DA1F2] hover:text-white transition-colors"><FaTwitter size={16}/></button>
                </div>
              </div>
            </div>

          </motion.div>

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
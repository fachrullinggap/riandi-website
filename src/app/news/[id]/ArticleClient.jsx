"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // <-- Added useParams here
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowLeft, ArrowUp, Share2 } from "lucide-react";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa"; 
import Image from "next/image";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// --- 1. MOCK DICTIONARY ---
const dict = {
  en: {
    back: "Back to News",
    share: "Share this article",
    notFound: "Article not found.",
    articles: [
      { id: 1, date: "2025.09.15", title: "Hosting 'KapanJepan Fair 2025 - Japan Job Fair' in Jakarta, Indonesia", img: "https://picsum.photos/seed/jobfair/1200/600", content: "Promoting recruitment for Japanese companies from Indonesia, which boasts the largest youth population in ASEAN. Career Diversity Inc. will co-host the event. \n\nIndonesia is rapidly becoming one of the most vital hubs for global talent. With a booming young workforce and a strong affinity for Japanese culture, the synergy between Indonesian talent and Japanese corporate needs has never been stronger. This job fair aims to bridge that gap, providing direct interview opportunities, visa consultation, and career mapping for hundreds of aspiring professionals.\n\nWe anticipate over 50 leading Japanese enterprises from sectors including IT, manufacturing, and hospitality to participate." },
      { id: 2, date: "2025.08.24", title: "'Vietnam', 'Myanmar', and 'Korea' Registered for Employment Placement Business", img: "https://picsum.photos/seed/worldmap/1200/600", content: "Career Diversity Inc. has expanded its recruitment areas. Following Indonesia, India, and Malaysia, we are now registered to introduce talent from Vietnam, Myanmar, and Korea. \n\nThis expansion marks a significant milestone in our mission to connect Japan with the world. By broadening our reach, we can offer our client companies a much wider, more diverse pool of highly skilled candidates. Each of these new regions brings unique strengths to the global workforce." },
      { id: 3, date: "2025.06.24", title: "Lecture on 'Muslim Society in Japan' at Waseda University", img: "https://picsum.photos/seed/lecture/1200/600", content: "Representative Director Kaiji Wada gave a guest lecture at the First Year Seminar. The lecture covered various issues and case studies regarding Muslim society in Japan. \n\nAs Japan becomes increasingly international, understanding and accommodating diverse cultural and religious backgrounds is crucial for social harmony and corporate success. The lecture engaged students in deep discussions about Halal certifications in the workplace, prayer room accommodations, and the overall socio-economic integration of Muslims in modern Japanese society." },
      { id: 4, date: "2025.06.20", title: "Launch of 'EduLabo', an Online Japanese Language Service for Indonesians", img: "https://picsum.photos/seed/edutech/1200/600", content: "We have officially started offering EduLabo, a comprehensive online Japanese education service tailored specifically for highly skilled Indonesian talent. \n\nLanguage remains one of the largest barriers for talented engineers and professionals looking to work in Japan. EduLabo bypasses traditional classroom limitations, offering flexible, intensive courses ranging from JLPT N5 basics to advanced N2/N1 business Japanese and specialized interview preparation." }
    ],
  },
  id: {
    back: "Kembali ke Berita",
    share: "Bagikan artikel ini",
    notFound: "Artikel tidak ditemukan.",
    articles: [
      { id: 1, date: "2025.09.15", title: "Menyelenggarakan 'KapanJepan Fair 2025 - Japan Job Fair' di Jakarta, Indonesia", img: "https://picsum.photos/seed/jobfair/1200/600", content: "Mempromosikan rekrutmen untuk perusahaan Jepang dari Indonesia, yang memiliki populasi pemuda terbesar di ASEAN. Career Diversity Inc. akan menjadi tuan rumah.\n\nIndonesia dengan cepat menjadi salah satu pusat paling vital untuk talenta global. Dengan tenaga kerja muda yang berkembang pesat dan kedekatan yang kuat dengan budaya Jepang, sinergi antara talenta Indonesia dan kebutuhan perusahaan Jepang tidak pernah sekuat ini." },
      { id: 2, date: "2025.08.24", title: "'Vietnam', 'Myanmar', dan 'Korea' Terdaftar untuk Bisnis Penempatan Kerja", img: "https://picsum.photos/seed/worldmap/1200/600", content: "Career Diversity Inc. telah memperluas area rekrutmennya. Mengikuti Indonesia, India, dan Malaysia, kami kini terdaftar untuk memperkenalkan talenta dari Vietnam, Myanmar, dan Korea.\n\nEkspansi ini menandai tonggak penting dalam misi kami untuk menghubungkan Jepang dengan dunia." },
      { id: 3, date: "2025.06.24", title: "Kuliah tentang 'Masyarakat Muslim di Jepang' di Universitas Waseda", img: "https://picsum.photos/seed/lecture/1200/600", content: "Direktur Perwakilan Kaiji Wada memberikan kuliah tamu di Seminar Tahun Pertama. Kuliah ini mencakup berbagai masalah dan studi kasus mengenai masyarakat Muslim di Jepang.\n\nSeiring Jepang menjadi semakin internasional, memahami dan mengakomodasi beragam latar belakang budaya dan agama sangat penting." },
      { id: 4, date: "2025.06.20", title: "Peluncuran 'EduLabo', Layanan Bahasa Jepang Online untuk Orang Indonesia", img: "https://picsum.photos/seed/edutech/1200/600", content: "Kami telah resmi mulai menawarkan EduLabo, layanan pendidikan bahasa Jepang online komprehensif yang dirancang khusus untuk talenta Indonesia yang sangat terampil.\n\nBahasa tetap menjadi salah satu hambatan terbesar bagi insinyur dan profesional berbakat yang ingin bekerja di Jepang." }
    ],
  },
  ja: {
    back: "ニュース一覧に戻る",
    share: "この記事をシェア",
    notFound: "記事が見つかりません。",
    articles: [
      { id: 1, date: "2025.09.15", title: "インドネシア・ジャカルタにて日本就職フェア「KapanJepan Fair 2025 - Japan Job Fair」を開催", img: "https://picsum.photos/seed/jobfair/1200/600", content: "ASEAN最大規模の若年人口を誇るインドネシアから、日本企業の採用を後押し。キャリアダイバーシティ株式会社は共同でイベントを開催いたします。\n\nインドネシアはグローバル人材の最も重要な拠点の1つとして急速に成長しています。活気ある若い労働力と日本文化への強い親和性により、インドネシアの人材と日本企業のニーズとの相乗効果はかつてないほど高まっています。" },
      { id: 2, date: "2025.08.24", title: "有料職業紹介事業の取扱地域に「ベトナム」「ミャンマー」「韓国」が登録されました", img: "https://picsum.photos/seed/worldmap/1200/600", content: "キャリアダイバーシティ株式会社は取扱地域を拡大し、これまでのインドネシア、インド、マレーシアに加え、新たにベトナム、ミャンマー、韓国からの人材紹介が可能になりました。\n\nこの拡大は、日本と世界をつなぐという私たちのミッションにおける重要なマイルストーンです。" },
      { id: 3, date: "2025.06.24", title: "早稲田大学国際教養学部にて「日本のムスリム社会」について講義を実施", img: "https://picsum.photos/seed/lecture/1200/600", content: "代表取締役の和田海二がゲスト講師として登壇しました。講義では日本のムスリム社会の様々な課題やケーススタディをピックアップし、議論を展開しました。\n\n日本がますます国際化する中、多様な文化的・宗教的背景を理解し対応することは、社会の調和と企業の成功にとって不可欠です。" },
      { id: 4, date: "2025.06.20", title: "インドネシア人向けオンライン日本語学習サービス「EduLabo」の提供を開始", img: "https://picsum.photos/seed/edutech/1200/600", content: "インドネシア高度人材に特化した、オンライン日本語教育サービス「EduLabo」の提供を正式に開始いたしました。専門的なビジネス日本語まで対応します。\n\n日本で働くことを希望する優秀なエンジニアや専門家にとって、言葉は依然として最大の障壁の1つです。" }
    ],
  }
};

export default function ArticleClient() { 
  const params = useParams(); // <-- Grab parameters directly from the URL
  const router = useRouter();
  
  // Parse the ID from the URL (e.g., /news/1 -> 1)
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
  
  // Find the article that matches the ID from the URL
  const article = t.articles.find(a => a.id === articleId);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // If the article is still not found, show the error screen
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{t.notFound}</h1>
        <button onClick={() => router.push('/news')} className="text-teal-600 font-bold hover:underline">{t.back}</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300">
      
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      <section className="pt-32 pb-12 px-6 max-w-4xl mx-auto mt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          <button 
            onClick={() => router.push('/news')}
            className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-teal-600 transition-colors mb-8 group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-teal-200 group-hover:bg-teal-50 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            {t.back}
          </button>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <Clock size={14} className="text-teal-500"/> {article.date}
            </span>
            <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full tracking-widest uppercase border border-teal-100">
              CareerDiv. Update
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.2] mb-12 tracking-tight">
            {article.title}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full aspect-[2/1] relative rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 mb-16"
        >
          <Image src={article.img} alt={article.title} fill className="object-cover" priority />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <div className="prose prose-lg prose-slate prose-teal max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-600 leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-bold text-slate-800 flex items-center gap-2"><Share2 size={18} className="text-teal-500"/> {t.share}</p>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#0077B5] hover:text-white transition-colors"><FaLinkedin size={18}/></button>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white transition-colors"><FaFacebook size={18}/></button>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#1DA1F2] hover:text-white transition-colors"><FaTwitter size={18}/></button>
            </div>
          </div>
        </motion.div>
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
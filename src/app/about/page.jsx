"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ArrowUpRight,
  Building2,
  MapPin,
  Briefcase,
  ArrowUp,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. LANGUAGE DICTIONARY ---
const dict = {
  en: {
    hero: {
      title: "ABOUT US",
      subtitle: "Endow Better Opportunities for All People",
      desc: "Maximize Japan's possibilities by connecting Japan to the world. We provide various business solutions that enable our clients to capture every opportunity in the world, including global talent recruitment and marketing research for overseas markets.",
    },
    company: {
      title: "Company Profile",
      name: "Career Diversity Inc.",
      ceo: "Kaiji Wada (Chief Executive Officer)",
      capital: "¥ 5,000,000",
      location: "Tokyo Head Office & Indonesia Office",
      business: "Global Talent Recruitment, Training, & Consulting",
    },
    team: {
      title: "Our Team",
      members: [
        {
          name: "Kaiji Wada",
          role: "Chief Executive Officer",
          desc: "Waseda University alumni. 6 years in cross-border business with Indonesia. Advisor to local governments, JETRO, and Keio University lecturer.",
          img: "https://picsum.photos/seed/kaiji/400/500",
        },
        {
          name: "Rahmawati Hidayah",
          role: "Local Advisor",
          desc: "Born in Makassar, raised in Fukuoka. Native Japanese/Indonesian speaker providing career support to Indonesians in Japan.",
          img: "https://picsum.photos/seed/rahma/400/500",
        },
        {
          name: "Radhika R. Ashtaputre",
          role: "Recruiting Head",
          desc: "Born in India. 7 years experience as a headhunter in India and Japan. Trusted by clients and candidates across both markets.",
          img: "https://picsum.photos/seed/radhika/400/500",
        },
        {
          name: "Takashi Moriyama",
          role: "Visa Partner (Climb CEO)",
          desc: "Specializes in visa applications handling ~1,000 cases/year. Partnered with Career Diversity since 2020.",
          img: "https://picsum.photos/seed/takashi/400/500",
        },
      ],
    },
    access: {
      title: "Access & Locations",
      hq: "Head Office",
      hqAddr: "Asakusa Taito-ku, Tokyo",
      id: "Jakarta Branch",
      idAddr: "SCBD, Jakarta Selatan",
    },
    interns: {
      title1: "Interns Wanted",
      btn1: "Contact Form",
      title2: "Interns' Voices",
      btn2: "Read Columns",
    },
    sdg: {
      title: "SUSTAINABLE DEVELOPMENT GOALS",
      desc: "We strive for a sustainable and better world.",
    },
  },
  id: {
    hero: {
      title: "TENTANG KAMI",
      subtitle: "Memberikan Peluang Lebih Baik untuk Semua",
      desc: "Memaksimalkan kemungkinan Jepang dengan menghubungkannya ke dunia. Kami menyediakan berbagai solusi bisnis termasuk rekrutmen talenta global dan riset pemasaran luar negeri.",
    },
    company: {
      title: "Profil Perusahaan",
      name: "Career Diversity Inc.",
      ceo: "Kaiji Wada (Chief Executive Officer)",
      capital: "¥ 5,000,000",
      location: "Kantor Pusat Tokyo & Kantor Indonesia",
      business: "Rekrutmen Talenta Global, Pelatihan, & Konsultasi",
    },
    team: {
      title: "Tim Kami",
      members: [
        {
          name: "Kaiji Wada",
          role: "Chief Executive Officer",
          desc: "Alumni Universitas Waseda. 6 tahun di bisnis lintas batas dengan Indonesia. Penasihat pemerintah daerah, JETRO, dan dosen Universitas Keio.",
          img: "https://picsum.photos/seed/kaiji/400/500",
        },
        {
          name: "Rahmawati Hidayah",
          role: "Penasihat Lokal",
          desc: "Lahir di Makassar, besar di Fukuoka. Penutur asli bahasa Jepang/Indonesia yang memberikan dukungan karir bagi orang Indonesia di Jepang.",
          img: "https://picsum.photos/seed/rahma/400/500",
        },
        {
          name: "Radhika R. Ashtaputre",
          role: "Kepala Rekrutmen",
          desc: "Lahir di India. Pengalaman 7 tahun sebagai headhunter di India dan Jepang. Dipercaya oleh klien dan kandidat di kedua pasar.",
          img: "https://picsum.photos/seed/radhika/400/500",
        },
        {
          name: "Takashi Moriyama",
          role: "Mitra Visa (CEO Climb)",
          desc: "Spesialisasi aplikasi visa menangani ~1.000 kasus/tahun. Bermitra dengan Career Diversity sejak 2020.",
          img: "https://picsum.photos/seed/takashi/400/500",
        },
      ],
    },
    access: {
      title: "Akses & Lokasi",
      hq: "Kantor Pusat",
      hqAddr: "Asakusa Taito-ku, Tokyo",
      id: "Cabang Jakarta",
      idAddr: "SCBD, Jakarta Selatan",
    },
    interns: {
      title1: "Dicari Pekerja Magang",
      btn1: "Formulir Kontak",
      title2: "Suara Pemagang",
      btn2: "Baca Kolom",
    },
    sdg: {
      title: "TUJUAN PEMBANGUNAN BERKELANJUTAN",
      desc: "Kami berjuang untuk dunia yang berkelanjutan dan lebih baik.",
    },
  },
  ja: {
    hero: {
      title: "ABOUT US",
      subtitle: "すべての人により良い機会を",
      desc: "日本と世界をつなぎ、日本の可能性を最大化する。グローバル人材採用や海外市場向けマーケティングリサーチなど、クライアントが世界のあらゆる機会を捉えるためのビジネスソリューションを提供します。",
    },
    company: {
      title: "会社概要",
      name: "キャリアダイバーシティ株式会社",
      ceo: "和田 海二 (代表取締役)",
      capital: "¥ 5,000,000",
      location: "東京本社 ＆ インドネシア支社",
      business: "グローバル人材紹介・育成・コンサルティング",
    },
    team: {
      title: "メンバー",
      members: [
        {
          name: "和田 海二",
          role: "代表取締役",
          desc: "早稲田大学卒。インドネシアでのクロスボーダービジネスに6年従事。自治体やJETROのアドバイザー、慶應義塾大学での講師を務める。",
          img: "https://picsum.photos/seed/kaiji/400/500",
        },
        {
          name: "ラハマワティ・ヒダヤ",
          role: "ローカルアドバイザー",
          desc: "マカッサル生まれ、福岡育ち。日イのネイティブスピーカー。日本で働く・学ぶインドネシア人へのキャリア支援を行う。",
          img: "https://picsum.photos/seed/rahma/400/500",
        },
        {
          name: "ラディカ",
          role: "リクルーティングヘッド",
          desc: "インド出身。日本とインドで7年間ヘッドハンターとして活動。両国市場に精通し、企業と候補者双方から厚い信頼を得る。",
          img: "https://picsum.photos/seed/radhika/400/500",
        },
        {
          name: "森山 敬",
          role: "ビザパートナー (行政書士法人Climb 代表)",
          desc: "年間約1,000件の外国人ビザ申請に特化。2020年よりキャリアダイバーシティと提携。",
          img: "https://picsum.photos/seed/takashi/400/500",
        },
      ],
    },
    access: {
      title: "アクセス",
      hq: "東京本社",
      hqAddr: "東京都台東区浅草",
      id: "ジャカルタ支社",
      idAddr: "南ジャカルタ SCBD",
    },
    interns: {
      title1: "インターン募集",
      btn1: "コンタクトフォーム",
      title2: "インターンの声",
      btn2: "コラムを読む",
    },
    sdg: {
      title: "持続可能な開発目標 (SDGs)",
      desc: "私たちは持続可能でより良い世界を目指します。",
    },
  },
};

export default function AboutPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");

  // 1. Check if they have a saved language when the page loads
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // 2. Save the new language to the browser when they change it
  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("preferredLang", newLang);
  };

  const t = dict[lang];

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top logic
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // --- ANIMATION SETTINGS ---
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

  const navDrop = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20, delay: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300">
      {/* --- NAVBAR --- */}
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="solid" />

      {/* --- HERO SECTION --- */}
      <section className="pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 min-h-[85vh]">
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-teal-600 font-black tracking-widest uppercase mb-6 text-sm"
          >
            {t.hero.title}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.1] text-slate-900 mb-8 tracking-tight"
          >
            {t.hero.subtitle}
          </motion.h1>
          <motion.div
            variants={fadeUp}
            className="border-l-4 border-teal-500 pl-6 py-1"
          >
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {t.hero.desc}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <div className="relative w-full aspect-4/3 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
            <Image
              src="https://picsum.photos/seed/workspace/800/600"
              alt="Workspace"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* --- COMPANY PROFILE (Bento Grid) --- */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-center mb-16 text-slate-900"
          >
            {t.company.title}{" "}
            <div className="w-16 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></div>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[160px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeUp}
              className="md:col-span-2 bg-slate-950 text-white rounded-[2rem] p-8 flex flex-col justify-end relative overflow-hidden group"
            >
              <div className="absolute top-6 right-6 opacity-20 group-hover:scale-110 transition-transform">
                <Building2 size={80} />
              </div>
              <p className="text-teal-400 font-semibold mb-1">Company Name</p>
              <h3 className="text-3xl font-black">{t.company.name}</h3>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-teal-50 rounded-[2rem] p-8 flex flex-col justify-end text-teal-950 border border-teal-100/50"
            >
              <Briefcase className="text-teal-500 mb-4 w-8 h-8" />
              <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
                Representative
              </p>
              <h4 className="text-lg font-bold">{t.company.ceo}</h4>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-end"
            >
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Capital
              </p>
              <h4 className="text-2xl font-black text-slate-800">
                {t.company.capital}
              </h4>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="md:col-span-2 bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 flex flex-col justify-end group hover:border-teal-200 transition-colors"
            >
              <MapPin className="text-slate-300 mb-4 w-8 h-8 group-hover:text-teal-500 transition-colors" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Locations
              </p>
              <h4 className="text-xl font-bold text-slate-800">
                {t.company.location}
              </h4>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TEAM MEMBERS --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-center mb-16 text-slate-900"
          >
            {t.team.title}{" "}
            <div className="w-16 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></div>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.team.members.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:shadow-xl transition-all duration-300"
              >
                <div className="w-32 h-32 flex-shrink-0 relative rounded-full overflow-hidden border-4 border-slate-50">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="flex flex-col text-center sm:text-left mt-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- ACCESS & INTERNS (Split Layout with Google Map) --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Map & Access */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-black mb-8 text-slate-900 flex items-center gap-3"
            >
              <MapPin className="text-teal-500" /> {t.access.title}
            </motion.h2>

            {/* Interactive Google Map */}
            <motion.div
              variants={fadeUp}
              className="w-full h-64 md:h-80 relative rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 mb-8 bg-slate-200"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.539308078652!2d139.7942697152599!3d35.7130006801865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ec1a4463df1%3A0x6c0d289a8292810d!2sAsakusa%2C%20Taito%20City%2C%20Tokyo%2C%20Japan!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              ></iframe>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                variants={fadeUp}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
              >
                <p className="font-bold text-slate-900 mb-1">{t.access.hq}</p>
                <p className="text-sm text-slate-500">{t.access.hqAddr}</p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
              >
                <p className="font-bold text-slate-900 mb-1">{t.access.id}</p>
                <p className="text-sm text-slate-500">{t.access.idAddr}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Internships */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              variants={fadeUp}
              className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden group flex items-center justify-center"
            >
              <Image
                src="https://picsum.photos/seed/intern1/600/400"
                alt="Interns"
                fill
                className="object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-amber-500/80"></div>
              <div className="relative z-10 text-center text-white px-6">
                <h3 className="text-2xl font-bold mb-4">{t.interns.title1}</h3>
                <button
                  onClick={() => router.push("/contact")}
                  className="px-6 py-2 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-amber-500 transition-colors"
                >
                  {t.interns.btn1}
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden group flex items-center justify-center"
            >
              <Image
                src="https://picsum.photos/seed/intern2/600/400"
                alt="Intern Voices"
                fill
                className="object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-teal-600/80"></div>
              <div className="relative z-10 text-center text-white px-6">
                <h3 className="text-2xl font-bold mb-4">{t.interns.title2}</h3>
                <button
                  onClick={() => router.push("/column")}
                  className="px-6 py-2 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors"
                >
                  {t.interns.btn2}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SDGs SECTION --- */}
      <section className="py-24 bg-slate-50 text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black mb-4 text-slate-900 tracking-tight"
          >
            {t.sdg.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 mb-12"
          >
            {t.sdg.desc}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 bg-[#C5192D] text-white flex flex-col justify-between p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-left font-bold leading-none">
                <span className="text-xl mr-1">4</span>
                <span className="text-[10px] uppercase">
                  Quality
                  <br />
                  Education
                </span>
              </div>
              <BookOpen
                size={40}
                className="self-center opacity-80"
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 bg-[#A21942] text-white flex flex-col justify-between p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-left font-bold leading-none">
                <span className="text-xl mr-1">8</span>
                <span className="text-[10px] uppercase">
                  Decent Work
                  <br />& Growth
                </span>
              </div>
              <ArrowUpRight
                size={40}
                className="self-center opacity-80"
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 bg-[#DD1367] text-white flex flex-col justify-between p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-left font-bold leading-none">
                <span className="text-xl mr-1">10</span>
                <span className="text-[10px] uppercase">
                  Reduced
                  <br />
                  Inequalities
                </span>
              </div>
              <div className="self-center text-4xl font-light opacity-80">
                =
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 bg-[#19486A] text-white flex flex-col justify-between p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="text-left font-bold leading-none">
                <span className="text-xl mr-1">17</span>
                <span className="text-[10px] uppercase">
                  Partnerships
                  <br />
                  For Goals
                </span>
              </div>
              <Globe
                size={40}
                className="self-center opacity-80"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SUPER FOOTER (Reused from Main Page) --- */}
      <Footer lang={lang} t={t} />

      {/* --- SCROLL TO TOP --- */}
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

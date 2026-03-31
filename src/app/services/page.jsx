"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Code,
  Settings,
  Cpu,
  Heart,
  Bed,
  Tractor,
  Factory,
  Utensils,
  MessageSquare,
  Users,
  CheckCircle,
  FileText,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. LANGUAGE DICTIONARY ---
const dict = {
  en: {
    heroTitle: "SERVICES",
    heroSub: "Indonesia Talent Solution",
    servicesMenu: [
      {
        id: "01",
        title: "Rianer",
        desc: "Personalized career consultation and guidance",
      },
      {
        id: "02",
        title: "JaLink Academy",
        desc: "Japanese language training (N5–N2 & Business Japanese)",
      },
      {
        id: "03",
        title: "Kakehashi by JaLink",
        desc: "Interpreter and communication support (JP ⇄ ID)",
      },
      {
        id: "04",
        title: "JaLink Career",
        desc: "Talent placement and hiring support for Japan",
      },
    ],
    sec1: {
      num: "01",
      title: "Rianer",
      subtitle: "Personalized career consultation and guidance",
      desc: "We work with local high schools, Japanese language institutes, and university educational institutions in Indonesia, forming our original human talent pool.",
      roles: [
        {
          icon: Code,
          title: "IT Engineer",
          items: [
            "Software Dev",
            "Infrastructure",
            "AI Engineer",
            "Data Scientist",
          ],
        },
        {
          icon: Settings,
          title: "Mechanical Engineer",
          items: ["Design & Dev", "Analysis", "Simulation", "Production"],
        },
        {
          icon: Cpu,
          title: "Electrical Engineer",
          items: ["Circuit Design", "Analysis", "Simulation", "Testing"],
        },
      ],
      stats: [
        { num: "No.1", text: "Partnerships with Top Universities" },
        { num: "10x", text: "Applicants per open position" },
        { num: "0%", text: "Turnover rate within 3 years" },
      ],
      reasonsTitle: "3 Reasons Why We Are Chosen",
      reasons: [
        {
          num: "I",
          title: "Top 5% Elite Talent Pool",
          desc: "We partner with top universities to access talent you can't reach through standard approaches.",
        },
        {
          num: "II",
          title: "Young Bilingual Engineers",
          desc: "Introducing candidates with business-level Japanese and English skills in their 20s.",
        },
        {
          num: "III",
          title: "Full Support Before & After",
          desc: "We handle everything from visa acquisition to post-hiring onboarding and lifestyle support.",
        },
      ],
    },
    cta: {
      title: "Please consult with us if...",
      points: [
        "You want excellent global talent",
        "You are expanding overseas",
        "Your current hiring isn't working",
      ],
      btn: "Consult Now",
    },
    sec2: {
      num: "02",
      title: "JaLink Academy",
      subtitle: "Japanese language training (N5–N2 & Business Japanese)",
      desc: "We have partnerships with local vocational training schools and can introduce personnel across a wide range of industries.",
      industries: [
        { icon: Heart, label: "Caregiving" },
        { icon: Bed, label: "Accommodation" },
        { icon: Tractor, label: "Agriculture" },
        { icon: Factory, label: "Food Mfg." },
        { icon: Utensils, label: "Food Service" },
      ],
      flowTitle: "Service Flow",
      flow: [
        {
          icon: MessageSquare,
          title: "1. Inquiry & Consultation",
          desc: "We listen to your specific needs and requirements.",
        },
        {
          icon: Users,
          title: "2. Candidate Gathering",
          desc: "We recruit targeted talent using our Indonesian network.",
        },
        {
          icon: FileText,
          title: "3. Interview & Offer",
          desc: "We facilitate interviews and handle all employment documentation.",
        },
        {
          icon: CheckCircle,
          title: "4. Visa & Onboarding",
          desc: "Full support for entry to Japan and living arrangements.",
        },
      ],
    },
  },
  id: {
    heroTitle: "LAYANAN",
    heroSub: "Solusi Talenta Indonesia",
    servicesMenu: [
      {
        id: "01",
        title: "Rianer",
        desc: "Konsultasi dan bimbingan karier yang dipersonalisasi",
      },
      {
        id: "02",
        title: "JaLink Academy",
        desc: "Pelatihan bahasa Jepang (N5–N2 & Bahasa Jepang Bisnis)",
      },
      {
        id: "03",
        title: "Kakehashi by JaLink",
        desc: "Layanan penerjemah dan dukungan komunikasi (Jepang ⇄ Indonesia)",
      },
      {
        id: "04",
        title: "JaLink Career",
        desc: "Penempatan talenta dan dukungan rekrutmen untuk Jepang",
      },
    ],
    sec1: {
      num: "01",
      title: "Rianer",
      subtitle: "Konsultasi dan bimbingan karier yang dipersonalisasi",
      desc: "Kami bekerja sama dengan sekolah menengah setempat, lembaga bahasa Jepang, dan institusi pendidikan universitas di Indonesia, membentuk pusat bakat manusia asli kami.",
      roles: [
        {
          icon: Code,
          title: "Insinyur IT",
          items: ["Software Dev", "Infrastruktur", "AI", "Data Scientist"],
        },
        {
          icon: Settings,
          title: "Mesin",
          items: ["Desain", "Analisis", "Produksi"],
        },
        {
          icon: Cpu,
          title: "Elektro",
          items: ["Sirkuit", "Analisis", "Pengujian"],
        },
      ],
      stats: [
        { num: "No.1", text: "Kemitraan Universitas Top" },
        { num: "10x", text: "Pelamar per posisi" },
        { num: "0%", text: "Tingkat turnover 3 tahun" },
      ],
      reasonsTitle: "3 Alasan Memilih Kami",
      reasons: [
        {
          num: "I",
          title: "Top 5% Talenta Elit",
          desc: "Kami bermitra dengan universitas top untuk mengakses bakat terbaik.",
        },
        {
          num: "II",
          title: "Insinyur Muda Bilingual",
          desc: "Kandidat dengan kemampuan bahasa Jepang dan Inggris tingkat bisnis.",
        },
        {
          num: "III",
          title: "Dukungan Penuh",
          desc: "Kami menangani semuanya mulai dari akuisisi visa hingga orientasi.",
        },
      ],
    },
    cta: {
      title: "Silakan berkonsultasi jika...",
      points: [
        "Menginginkan bakat global",
        "Ekspansi ke luar negeri",
        "Perekrutan saat ini gagal",
      ],
      btn: "Konsultasi Sekarang",
    },
    sec2: {
      num: "02",
      title: "JaLink Academy",
      subtitle: "Pelatihan bahasa Jepang (N5–N2 & Bahasa Jepang Bisnis)",
      desc: "Kami memiliki kemitraan dengan sekolah pelatihan kejuruan lokal dan dapat memperkenalkan personel di berbagai industri.",
      industries: [
        { icon: Heart, label: "Perawatan" },
        { icon: Bed, label: "Akomodasi" },
        { icon: Tractor, label: "Pertanian" },
        { icon: Factory, label: "Manufaktur Makanan" },
        { icon: Utensils, label: "Layanan Makanan" },
      ],
      flowTitle: "Alur Layanan",
      flow: [
        {
          icon: MessageSquare,
          title: "1. Pertanyaan",
          desc: "Kami mendengarkan kebutuhan spesifik Anda.",
        },
        {
          icon: Users,
          title: "2. Pengumpulan Kandidat",
          desc: "Merekrut bakat yang ditargetkan.",
        },
        {
          icon: FileText,
          title: "3. Wawancara",
          desc: "Memfasilitasi wawancara.",
        },
        {
          icon: CheckCircle,
          title: "4. Visa & Orientasi",
          desc: "Dukungan penuh masuk ke Jepang.",
        },
      ],
    },
  },
  ja: {
    heroTitle: "SERVICES",
    heroSub: "インドネシア人材ソリューション",
    servicesMenu: [
      {
        id: "01",
        title: "Rianer",
        desc: "一人ひとりに合わせたキャリア相談とガイダンス",
      },
      {
        id: "02",
        title: "JaLink Academy",
        desc: "日本語トレーニング（N5〜N2およびビジネス日本語）",
      },
      {
        id: "03",
        title: "Kakehashi by JaLink",
        desc: "通訳・翻訳およびコミュニケーション支援（日 ⇄ 印）",
      },
      {
        id: "04",
        title: "JaLink Career",
        desc: "日本向けのグローバル人材紹介および採用支援",
      },
    ],
    sec1: {
      num: "01",
      title: "Rianer",
      subtitle: "一人ひとりに合わせたキャリア相談とガイダンス",
      desc: "弊社では、インドネシア現地の高校、日本語教育機関、大学の教育機関と連携しており、独自の人材母集団を形成しています。",
      roles: [
        {
          icon: Code,
          title: "ITエンジニア",
          items: [
            "ソフトウェア開発",
            "インフラ",
            "AI",
            "データサイエンティスト",
          ],
        },
        {
          icon: Settings,
          title: "機械エンジニア",
          items: ["設計・開発", "解析", "生産技術"],
        },
        {
          icon: Cpu,
          title: "電気電子エンジニア",
          items: ["設計・開発", "解析", "テスト"],
        },
      ],
      stats: [
        { num: "No.1", text: "インドネシア上位大学との提携数" },
        { num: "10倍", text: "採用枠に対する応募数" },
        { num: "0%", text: "3年以内の離職率" },
      ],
      reasonsTitle: "わたしたちが選ばれる3つの理由",
      reasons: [
        {
          num: "I",
          title: "インドネシア上位5%の優秀層",
          desc: "現地のトップ大学と提携し、通常ではアプローチできない層にアクセスします。",
        },
        {
          num: "II",
          title: "若手バイリンガル理系人材",
          desc: "ビジネスレベルの日本語と英語を話せる20代の人材をご紹介します。",
        },
        {
          num: "III",
          title: "入社前から入社後までのフルサポート",
          desc: "ビザ取得から入社後の定着まで一貫してサポートいたします。",
        },
      ],
    },
    cta: {
      title: "こんな企業様はご相談ください",
      points: [
        "とにかく優秀な人材が欲しい企業",
        "海外との取引が多い企業",
        "日本人の採用がうまくいかない企業",
      ],
      btn: "お問い合わせする",
    },
    sec2: {
      num: "02",
      title: "JaLink Academy",
      subtitle: "日本語トレーニング（N5〜N2およびビジネス日本語）",
      desc: "インドネシア現地の職業訓練校と提携しており、幅広い業種での特定技能人材のご紹介が可能です。",
      industries: [
        { icon: Heart, label: "介護" },
        { icon: Bed, label: "宿泊" },
        { icon: Tractor, label: "農業" },
        { icon: Factory, label: "飲食料品製造業" },
        { icon: Utensils, label: "外食業" },
      ],
      flowTitle: "サービスの流れ",
      flow: [
        {
          icon: MessageSquare,
          title: "1. お問い合わせ",
          desc: "まずはお問い合わせフォームよりご相談ください。",
        },
        {
          icon: Users,
          title: "2. 候補者の集客",
          desc: "貴社の採用ニーズを可視化し募集します。",
        },
        {
          icon: FileText,
          title: "3. 面接・内定",
          desc: "面接の調整から内定後の書類作成まで行います。",
        },
        {
          icon: CheckCircle,
          title: "4. ビザ取得・入社",
          desc: "入国サポートと生活オリエンテーションを実施します。",
        },
      ],
    },
  },
};

export default function ServicePage() {
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

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Function to handle scrolling when a "View Details" button is clicked
  const scrollToSection = (id) => {
    const section = document.getElementById(`section-${id}`);
    if (section) {
      // Calculate offset to prevent the fixed navbar from covering the section title
      const yOffset = -100;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300">
      {/* --- NAVBAR --- */}
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- HERO SECTION (4 Grid Layout) --- */}
      <section className="pt-32 pb-24 px-6 bg-slate-900 min-h-[90vh] flex flex-col justify-center rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 text-teal-400 rounded-2xl mb-6"
          >
            <Globe size={32} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white tracking-widest mb-4"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-teal-400 font-medium tracking-widest uppercase"
          >
            {t.heroSub}
          </motion.p>
          <div className="w-24 h-px bg-slate-700 mx-auto mt-8"></div>
        </div>

        {/* 4 Cards Grid */}
        <motion.div
          className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {t.servicesMenu.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="relative h-48 md:h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
            >
              <Image
                src={`https://picsum.photos/seed/svc${idx}/800/600`}
                alt={item.title}
                fill
                className="object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-teal-950/60 group-hover:bg-teal-900/40 transition-colors duration-500"></div>
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white">
                <span className="text-2xl font-black text-teal-400 mb-2">
                  {item.id}
                </span>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 max-w-xs">{item.desc}</p>

                <button
                  onClick={() => scrollToSection(item.id)}
                  className="mt-4 px-6 py-2 bg-amber-500/90 hover:bg-amber-400 text-white font-bold rounded-full text-sm backdrop-blur-sm transition-colors opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-300"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- SECTION 01 --- */}
      <section id="section-01" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-20"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-baseline gap-4 mb-4"
            >
              <span className="text-5xl font-black text-teal-300">
                {t.sec1.num}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {t.sec1.title}
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-500 mb-8">
              {t.sec1.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="w-full h-[300px] md:h-[500px] relative rounded-[2rem] overflow-hidden shadow-xl mb-12"
            >
              <Image
                src="https://picsum.photos/seed/engineers/1200/600"
                alt="Engineers"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto text-center border-l-4 border-teal-500 pl-6 bg-slate-50 p-6 rounded-r-2xl"
            >
              {t.sec1.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 border-y border-slate-100 py-16"
          >
            {t.sec1.roles.map((role, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <role.icon size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {role.title}
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {role.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-32"
          >
            <motion.h3
              variants={fadeUp}
              className="text-center text-3xl font-bold mb-16 text-slate-900"
            >
              Numbers Speak For Us
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.sec1.stats.map((stat, idx) => (
                <motion.div key={idx} variants={fadeUp} className="text-center">
                  <div className="text-6xl font-black text-amber-500 mb-4 tracking-tighter">
                    {stat.num}
                  </div>
                  <div className="w-12 h-1 bg-teal-100 mx-auto mb-4"></div>
                  <p className="text-slate-700 font-bold">{stat.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h3
              variants={fadeUp}
              className="text-center text-3xl font-black mb-16 text-slate-900"
            >
              {t.sec1.reasonsTitle}
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.sec1.reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-slate-100 shadow-lg shadow-slate-200/50 rounded-[2rem] overflow-hidden flex flex-col group"
                >
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <Image
                      src={`https://picsum.photos/seed/reason${idx}/400/300`}
                      alt={reason.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-black text-teal-600 shadow-sm">
                      {reason.num}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-teal-700 mb-4">
                      {reason.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-24 bg-gradient-to-br from-teal-700 to-teal-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://picsum.photos/seed/pattern2/1920/1080')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://picsum.photos/seed/consult/800/600"
              alt="Consultation"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex-1 bg-white/10 backdrop-blur-lg p-10 rounded-[2rem] border border-white/20"
          >
            <motion.h3 variants={fadeUp} className="text-3xl font-bold mb-8">
              {t.cta.title}
            </motion.h3>
            <ul className="space-y-4 mb-10">
              {t.cta.points.map((pt, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeUp}
                  className="flex items-center gap-3 font-medium"
                >
                  <CheckCircle className="text-amber-400" /> {pt}
                </motion.li>
              ))}
            </ul>
            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl text-lg transition-colors shadow-lg shadow-amber-500/20"
            >
              {t.cta.btn}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 02 --- */}
      <section
        id="section-02"
        className="py-24 bg-slate-50 border-b border-slate-200 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-20"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-baseline gap-4 mb-4"
            >
              <span className="text-5xl font-black text-teal-300">
                {t.sec2.num}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {t.sec2.title}
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-slate-500 mb-8">
              {t.sec2.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="w-full h-[300px] md:h-[500px] relative rounded-[2rem] overflow-hidden shadow-xl mb-12 border-4 border-white"
            >
              <Image
                src="https://picsum.photos/seed/skilled/1200/600"
                alt="Skilled Workers"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto text-center"
            >
              {t.sec2.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-6 md:gap-12 mb-32"
          >
            {t.sec2.industries.map((ind, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div className="w-20 h-20 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-teal-400 group-hover:shadow-teal-500/40 transition-all duration-300">
                  <ind.icon size={32} />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-teal-600 transition-colors">
                  {ind.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-3xl mx-auto"
          >
            <motion.h3
              variants={fadeUp}
              className="text-center text-3xl font-black mb-16 text-slate-900"
            >
              {t.sec2.flowTitle}
            </motion.h3>

            <div className="space-y-4">
              {t.sec2.flow.map((step, idx) => (
                <div key={idx}>
                  <motion.div
                    variants={fadeUp}
                    className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl flex items-center gap-6 shadow-sm hover:border-teal-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                      <step.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-slate-600 text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                  {idx !== t.sec2.flow.length - 1 && (
                    <div className="flex justify-center py-2 text-slate-300">
                      <ArrowDown size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SUPER FOOTER --- */}
      <Footer lang={lang} />

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
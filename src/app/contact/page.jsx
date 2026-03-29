"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowUp,
  Send,
  Loader2,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. LANGUAGE DICTIONARY ---
const dict = {
  en: {
    hero: { title: "CONTACT", subtitle: "Get in Touch" },
    form: {
      name: "Name",
      nameFuri: "Name (Phonetic)",
      req: "Required",
      opt: "Optional",
      company: "Company Name",
      dept: "Department / Position",
      email: "Email Address",
      type: "Inquiry Type",
      typeSelect: "-- Please select an item --",
      typeOpts: [
        "About Indonesia HR Solution",
        "For universities/partners",
        "About CareerDiv. Platform",
        "Other",
      ],
      content: "Inquiry Details",
      contentPlaceholder: "Please enter the details of your inquiry here.",
      privacy: "I agree to the handling of personal information",
      privacyDesc: "Please read our Privacy Policy and agree before inquiring.",
      confirm: "I have confirmed the entered information",
      confirmDesc:
        "A confirmation screen will not be displayed. Please check your entries before sending.",
      submit: "Send Message",
      sending: "Sending...",
    },
  },
  id: {
    hero: { title: "KONTAK", subtitle: "Hubungi Kami" },
    form: {
      name: "Nama Lengkap",
      nameFuri: "Nama (Ejaan)",
      req: "Wajib",
      opt: "Opsional",
      company: "Nama Perusahaan",
      dept: "Departemen / Jabatan",
      email: "Alamat Email",
      type: "Jenis Pertanyaan",
      typeSelect: "-- Pilih kategori --",
      typeOpts: [
        "Tentang Solusi SDM Indonesia",
        "Untuk universitas/mitra",
        "Tentang Platform CareerDiv.",
        "Lainnya",
      ],
      content: "Detail Pertanyaan",
      contentPlaceholder: "Silakan masukkan detail pertanyaan Anda di sini.",
      privacy: "Saya setuju dengan penanganan informasi pribadi",
      privacyDesc:
        "Silakan baca Kebijakan Privasi kami dan setujui sebelum bertanya.",
      confirm: "Saya telah mengonfirmasi informasi yang dimasukkan",
      confirmDesc:
        "Layar konfirmasi tidak akan ditampilkan. Harap periksa entri Anda sebelum mengirim.",
      submit: "Kirim Pesan",
      sending: "Mengirim...",
    },
  },
  ja: {
    hero: { title: "CONTACT", subtitle: "お問い合わせ" },
    form: {
      name: "氏名",
      nameFuri: "氏名 (フリガナ)",
      req: "必須",
      opt: "任意",
      company: "企業名",
      dept: "部署・役職",
      email: "メールアドレス",
      type: "お問い合わせ項目",
      typeSelect: "-- 選択してください --",
      typeOpts: [
        "インドネシア人材ソリューションについて",
        "大学・提携先様向け",
        "キャリアプラットフォームについて",
        "その他",
      ],
      content: "お問い合わせ内容",
      contentPlaceholder: "お問い合わせ内容をご記入ください。",
      privacy: "個人情報の取り扱いについて同意する",
      privacyDesc:
        "お問い合わせの際には「個人情報の取り扱いについて」をお読みいただき、予め同意の上、お問い合わせください。",
      confirm: "確認した",
      confirmDesc:
        "確認画面は表示されません。送信ボタンを押す前に、入力内容に間違いがないかご確認ください。",
      submit: "送信する",
      sending: "送信中...",
    },
  },
};

export default function ContactPage() {
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

  // New state to handle loading animation on button
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    nameFuri: "",
    company: "",
    dept: "",
    email: "",
    type: "",
    content: "",
    privacy: false,
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --- REAL EMAIL SUBMISSION LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Sending data to FormSubmit API securely via AJAX
      const response = await fetch(
        "https://formsubmit.co/ajax/rint.jp23@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `New Inquiry from ${formData.company} (${formData.name})`, // Email Subject
            Name: formData.name,
            "Name (Phonetic)": formData.nameFuri,
            Company: formData.company,
            Department: formData.dept,
            Email: formData.email,
            Inquiry_Type: formData.type,
            Message: formData.content,
          }),
        },
      );

      if (response.ok) {
        alert(
          lang === "ja"
            ? "メッセージを送信しました！"
            : lang === "id"
              ? "Pesan berhasil dikirim!"
              : "Message sent successfully!",
        );
        // Clear form after success
        setFormData({
          name: "",
          nameFuri: "",
          company: "",
          dept: "",
          email: "",
          type: "",
          content: "",
          privacy: false,
          confirm: false,
        });
      } else {
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // --- ANIMATION SETTINGS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 bg-slate-900 rounded-b-[3rem] relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-800 pointer-events-none"></div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="w-20 h-20 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mb-6"
          >
            <Mail size={40} />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl font-black text-white tracking-widest mb-4 uppercase"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-teal-400 font-medium tracking-widest"
          >
            {t.hero.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Grid for Name & Furigana */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <label className="font-bold text-slate-700 flex items-center gap-2">
                {t.form.name}{" "}
                <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded uppercase tracking-wider">
                  {t.form.req}
                </span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <label className="font-bold text-slate-700 flex items-center gap-2">
                {t.form.nameFuri}{" "}
                <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded uppercase tracking-wider">
                  {t.form.req}
                </span>
              </label>
              <input
                type="text"
                name="nameFuri"
                required
                value={formData.nameFuri}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              />
            </motion.div>
          </div>

          {/* Company */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-8">
            <label className="font-bold text-slate-700 flex items-center gap-2">
              {t.form.company}{" "}
              <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded uppercase tracking-wider">
                {t.form.req}
              </span>
            </label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            />
          </motion.div>

          {/* Department */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-8">
            <label className="font-bold text-slate-700 flex items-center gap-2">
              {t.form.dept}{" "}
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">
                {t.form.opt}
              </span>
            </label>
            <input
              type="text"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-8">
            <label className="font-bold text-slate-700 flex items-center gap-2">
              {t.form.email}{" "}
              <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded uppercase tracking-wider">
                {t.form.req}
              </span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="xxx@xxxxx.xxx"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
            />
          </motion.div>

          {/* Inquiry Type */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-8">
            <label className="font-bold text-slate-700 flex items-center gap-2">
              {t.form.type}{" "}
              <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded uppercase tracking-wider">
                {t.form.req}
              </span>
            </label>
            <div className="relative">
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  {t.form.typeSelect}
                </option>
                {t.form.typeOpts.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Textarea */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-12">
            <label className="font-bold text-slate-700 flex items-center gap-2">
              {t.form.content}{" "}
              <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded uppercase tracking-wider">
                {t.form.req}
              </span>
            </label>
            <textarea
              name="content"
              required
              rows="6"
              placeholder={t.form.contentPlaceholder}
              value={formData.content}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all resize-none"
            ></textarea>
          </motion.div>

          {/* Consents */}
          <motion.div
            variants={fadeUp}
            className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 mb-12 flex flex-col gap-6"
          >
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  name="privacy"
                  required
                  checked={formData.privacy}
                  onChange={handleChange}
                  className="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded cursor-pointer checked:bg-teal-500 checked:border-teal-500 transition-colors"
                />
                <svg
                  className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                  {t.form.privacy} <span className="text-rose-500 ml-1">*</span>
                </span>
                <span className="text-sm text-slate-500 mt-1">
                  {t.form.privacyDesc}
                </span>
              </div>
            </label>

            <div className="w-full h-px bg-slate-200"></div>

            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  name="confirm"
                  required
                  checked={formData.confirm}
                  onChange={handleChange}
                  className="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded cursor-pointer checked:bg-teal-500 checked:border-teal-500 transition-colors"
                />
                <svg
                  className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                  {t.form.confirm} <span className="text-rose-500 ml-1">*</span>
                </span>
                <span className="text-sm text-slate-500 mt-1">
                  {t.form.confirmDesc}
                </span>
              </div>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className={`px-12 py-4 font-black rounded-full text-lg flex items-center gap-3 shadow-lg transition-colors ${isSubmitting ? "bg-teal-400 cursor-not-allowed text-white/80" : "bg-teal-500 hover:bg-teal-400 text-white shadow-teal-500/30"}`}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} />
              )}
              {isSubmitting ? t.form.sending : t.form.submit}
            </motion.button>
          </motion.div>
        </motion.form>
      </section>

      {/* --- SUPER FOOTER (Integrated Contact & Socials) --- */}
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

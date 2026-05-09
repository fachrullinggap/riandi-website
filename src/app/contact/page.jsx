"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowUp,
  Send,
  Loader2,
  Check,
  MessageCircle,
  ExternalLink
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. UPDATED DICTIONARY ---
const dict = {
  en: {
    hero: { title: "CONTACT US", subtitle: "Get in touch with our team" },
    form: {
      title: "Let's Talk About Your Plan",
      name: "Full Name",
      email: "Email Address",
      message: "Your Message",
      placeholderName: "Blake Johnson",
      placeholderEmail: "blake@example.com",
      placeholderMessage: "Tell us about your career goals or recruitment needs...",
      submitBtn: "Send Message",
      whatsappTitle: "Direct Support",
      whatsappDesc: "Prefer a faster response? Chat directly with our consultants via WhatsApp for immediate assistance.",
      whatsappBtn: "Contact Via WhatsApp",
      sending: "Sending...",
    },
    success: { title: "Success!", msg: "Your message has been sent. We will get back to you soon." }
  },
  id: {
    hero: { title: "KONTAK KAMI", subtitle: "Hubungi tim kami" },
    form: {
      title: "Mari Diskusikan Rencana Anda",
      name: "Nama Lengkap",
      email: "Alamat Email",
      message: "Pesan Anda",
      placeholderName: "Budi Santoso",
      placeholderEmail: "budi@email.com",
      placeholderMessage: "Ceritakan tentang tujuan karier atau kebutuhan rekrutmen Anda...",
      submitBtn: "Kirim Pesan",
      whatsappTitle: "Dukungan Langsung",
      whatsappDesc: "Ingin respon yang lebih cepat? Hubungi konsultan kami secara langsung melalui WhatsApp untuk bantuan segera.",
      whatsappBtn: "Hubungi Via WhatsApp",
      sending: "Mengirim...",
    },
    success: { title: "Berhasil!", msg: "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda." }
  },
  ja: {
    hero: { title: "お問い合わせ", subtitle: "チームにお気軽にご相談ください" },
    form: {
      title: "あなたのプランについてお聞かせください",
      name: "お名前",
      email: "メールアドレス",
      message: "メッセージ",
      placeholderName: "山田 太郎",
      placeholderEmail: "yamada@example.com",
      placeholderMessage: "キャリアの目標や採用ニーズについてお聞かせください...",
      submitBtn: "メッセージを送信",
      whatsappTitle: "ダイレクトサポート",
      whatsappDesc: "より迅速な対応をご希望ですか？WhatsAppで当社のコンサルタントに直接チャットして、すぐにお手伝いいたします。",
      whatsappBtn: "WhatsAppで相談する",
      sending: "送信中...",
    },
    success: { title: "送信完了", msg: "メッセージが送信されました。担当者より折り返しご連絡いたします。" }
  },
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

export default function ContactPage() {
  const [lang, setLang] = useState("en");
  const [pageUrl, setPageUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang");
    if (savedLang) setLang(savedLang);
    
    const url = new URL(window.location.href);
    url.searchParams.set("success", "true");
    setPageUrl(url.toString());

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      setShowSuccess(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, []);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("preferredLang", newLang);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = dict[lang];

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-teal-300">
      
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-24 right-6 z-[100] bg-teal-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <Check size={24} />
            <div>
              <p className="font-bold">{t.success.title}</p>
              <p className="text-sm opacity-90">{t.success.msg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 bg-slate-900 rounded-b-[3rem] relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-800 pointer-events-none"></div>
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10 text-center">
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-teal-400 font-medium tracking-widest uppercase text-sm">
            {t.hero.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-teal-600 via-teal-950 to-cyan-500 bg-clip-text text-transparent mb-16 leading-tight"
          >
            {t.form.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form Left Side */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              action="https://formsubmit.co/jalink.connect@gmail.com"
              method="POST"
              onSubmit={() => setIsSubmitting(true)}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={pageUrl} />
              <input type="hidden" name="_subject" value={`New Inquiry from ${formData.name}`} />

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">{t.form.name}</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder={t.form.placeholderName}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">{t.form.email}</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder={t.form.placeholderEmail}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">{t.form.message}</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={5}
                    placeholder={t.form.placeholderMessage}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-slate-200 mt-4"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  {isSubmitting ? t.form.sending : t.form.submitBtn}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Action Buttons Right Side */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-teal-50 p-8 md:p-10 rounded-[2.5rem] border border-teal-100 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-teal-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200">
                  <MessageCircle size={30} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  {t.form.whatsappTitle}
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {t.form.whatsappDesc}
                </p>
                <motion.a
                  href="https://wa.me/+6285860001198"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1ebd57] text-white font-bold rounded-2xl shadow-xl shadow-green-200 transition-all w-full justify-center"
                >
                  {t.form.whatsappBtn}
                  <ExternalLink size={18} />
                </motion.a>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-100 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            </div>

            <div className="bg-white p-8 border border-slate-100 rounded-[2rem] shadow-sm">
              <div className="flex items-center gap-4 text-slate-600 mb-2">
                <Mail className="text-teal-500" size={20} />
                <span className="font-medium">jalink.connect@gmail.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0 }} 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-4 bg-[#2f6f6f] text-white rounded-full shadow-[0_8px_30px_rgb(20,184,166,0.3)] hover:bg-teal-600 transition-colors z-[100] group"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
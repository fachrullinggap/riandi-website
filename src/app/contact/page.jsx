"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowUp,
  Send,
  Loader2,
  UploadCloud,
  FileCheck2,
  Check
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// --- 1. LANGUAGE DICTIONARY ---
const dict = {
  en: {
    hero: { title: "SUBMISSION", subtitle: "Candidate Profile" },
    form: {
      title: "Candidate Profile Submission Form",
      jobId: "Applied Job ID",
      name: "Candidate Name",
      location: "Current Location",
      japaneseLevel: "Japanese Level",
      currentSalary: "Current Salary",
      expectedSalary: "Expected Salary",
      joiningDate: "Current Joining Date",
      otherProcess: "Other Interview Process",
      selectOne: "Select one",
      jpLevels: ["Native", "N1", "N2", "N3", "N4", "N5", "None"],
      processOpts: ["None", "1st Interview", "2nd Interview", "Final Interview", "Offer Received"],
      uploadRirekisho: "Upload Rirekisho",
      uploadShokumu: "Upload Shokumukeirekisho",
      uploadEngCv: "Upload English CV (optional)",
      dropText: "Drop a file here or click to upload",
      maxSize: "Maximum file size: 10MB",
      format: "Format: pdf, doc, docx",
      privacy: "I agree to the handling of personal information",
      privacyDesc: "Please read our Privacy Policy and agree before inquiring.",
      confirm: "I have confirmed the entered information",
      confirmDesc: "A confirmation screen will not be displayed. Please check your entries before sending.",
      submitBtn: "Submit",
      sending: "Submitting...",
    },
    success: { title: "Success!", msg: "Profile submitted successfully." }
  },
  id: {
    hero: { title: "PENGIRIMAN", subtitle: "Profil Kandidat" },
    form: {
      title: "[KapanJepan Agent] Formulir Pengiriman Profil Kandidat",
      jobId: "ID Pekerjaan yang Dilamar",
      name: "Nama Kandidat",
      location: "Lokasi Saat Ini",
      japaneseLevel: "Tingkat Bahasa Jepang",
      currentSalary: "Gaji Saat Ini",
      expectedSalary: "Gaji yang Diharapkan",
      joiningDate: "Tanggal Bergabung Saat Ini",
      otherProcess: "Proses Wawancara Lainnya",
      selectOne: "Pilih salah satu",
      jpLevels: ["Native", "N1", "N2", "N3", "N4", "N5", "Tidak ada"],
      processOpts: ["Tidak ada", "Wawancara ke-1", "Wawancara ke-2", "Wawancara Akhir", "Menerima Tawaran"],
      uploadRirekisho: "Unggah Rirekisho",
      uploadShokumu: "Unggah Shokumukeirekisho",
      uploadEngCv: "Unggah CV Bahasa Inggris (opsional)",
      dropText: "Jatuhkan file di sini atau klik untuk mengunggah",
      maxSize: "Ukuran file maksimum: 10MB",
      format: "Format: pdf, doc, docx",
      privacy: "Saya setuju dengan penanganan informasi pribadi",
      privacyDesc: "Silakan baca Kebijakan Privasi kami dan setujui sebelum bertanya.",
      confirm: "Saya telah mengonfirmasi informasi yang dimasukkan",
      confirmDesc: "Layar konfirmasi tidak akan ditampilkan. Harap periksa entri Anda sebelum mengirim.",
      submitBtn: "Kirim Pesan",
      sending: "Mengirim...",
    },
    success: { title: "Berhasil!", msg: "Profil berhasil dikirim." }
  },
  ja: {
    hero: { title: "SUBMISSION", subtitle: "候補者プロフィール" },
    form: {
      title: "[KapanJepan Agent] 候補者プロフィール提出フォーム",
      jobId: "応募求人ID",
      name: "候補者名",
      location: "現住所",
      japaneseLevel: "日本語レベル",
      currentSalary: "現在の年収",
      expectedSalary: "希望年収",
      joiningDate: "入社可能日",
      otherProcess: "他社の選考状況",
      selectOne: "選択してください",
      jpLevels: ["ネイティブ", "N1", "N2", "N3", "N4", "N5", "なし"],
      processOpts: ["なし", "1次面接", "2次面接", "最終面接", "内定獲得"],
      uploadRirekisho: "履歴書のアップロード",
      uploadShokumu: "職務経歴書のアップロード",
      uploadEngCv: "英文CVのアップロード (任意)",
      dropText: "ここにファイルをドロップするか、クリックしてアップロード",
      maxSize: "最大ファイルサイズ: 10MB",
      format: "フォーマット: pdf, doc, docx",
      privacy: "個人情報の取り扱いについて同意する",
      privacyDesc: "お問い合わせの際には「個人情報の取り扱いについて」をお読みいただき、予め同意の上、お問い合わせください。",
      confirm: "確認した",
      confirmDesc: "確認画面は表示されません。送信ボタンを押す前に、入力内容に間違いがないかご確認ください。",
      submitBtn: "送信する",
      sending: "送信中...",
    },
    success: { title: "送信完了", msg: "プロフィールを送信しました。" }
  },
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

export default function ContactPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const [pageUrl, setPageUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang");
    if (savedLang) {
      setLang(savedLang);
    }
    
    // Set the redirect URL for FormSubmit to include a success parameter
    const url = new URL(window.location.href);
    url.searchParams.set("success", "true");
    setPageUrl(url.toString());

    // Check if the current URL has the success parameter
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

  const t = dict[lang];
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    Applied_Job_ID: "",
    Candidate_Name: "",
    Current_Location: "",
    Japanese_Level: "",
    Current_Salary: "",
    Expected_Salary: "",
    Current_Joining_Date: "",
    Other_Interview_Process: "",
    privacy: false,
    confirm: false,
  });

  // File States
  const [files, setFiles] = useState({
    Rirekisho: null,
    Shokumukeirekisho: null,
    English_CV: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        e.target.value = null;
        return;
      }
      setFiles(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-300">
      
      {/* --- SUCCESS NOTIFICATION POPUP --- */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 right-6 z-[100] bg-teal-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Check size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">{t.success.title}</h4>
              <p className="text-teal-50 text-sm">{t.success.msg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar lang={lang} handleLangChange={handleLangChange} theme="blend" />

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 bg-slate-900 rounded-b-[3rem] relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-800 pointer-events-none"></div>
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10 text-center flex flex-col items-center">
          <motion.div variants={fadeUp} className="w-20 h-20 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mb-6">
            <Mail size={40} />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black text-white tracking-widest mb-4 uppercase">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-teal-400 font-medium tracking-widest">
            {t.hero.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <motion.form
          action="https://formsubmit.co/rint.jp23@gmail.com"
          method="POST"
          encType="multipart/form-data"
          onSubmit={() => setIsSubmitting(true)}
          className="bg-white p-8 md:p-14 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* FormSubmit Configuration Hidden Inputs */}
          <input type="hidden" name="_subject" value={`New Candidate Profile: ${formData.Candidate_Name || 'Submission'}`} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          {pageUrl && <input type="hidden" name="_next" value={pageUrl} />}

          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 tracking-tight">
            {t.form.title}
          </motion.h2>

          {/* Text Inputs */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-6">
            <label className="text-slate-600 font-medium">{t.form.jobId} <span className="text-rose-500">*</span></label>
            <input type="text" name="Applied_Job_ID" required value={formData.Applied_Job_ID} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-6">
            <label className="text-slate-600 font-medium">{t.form.name} <span className="text-rose-500">*</span></label>
            <input type="text" name="Candidate_Name" required value={formData.Candidate_Name} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-6">
            <label className="text-slate-600 font-medium">{t.form.location} <span className="text-rose-500">*</span></label>
            <input type="text" name="Current_Location" required value={formData.Current_Location} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-6">
            <label className="text-slate-600 font-medium">{t.form.japaneseLevel} <span className="text-rose-500">*</span></label>
            <select name="Japanese_Level" required value={formData.Japanese_Level} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none cursor-pointer">
              <option value="" disabled>{t.form.selectOne}</option>
              {t.form.jpLevels.map((lvl, i) => <option key={i} value={lvl}>{lvl}</option>)}
            </select>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-6">
            <label className="text-slate-600 font-medium">{t.form.currentSalary} <span className="text-rose-500">*</span></label>
            <input type="text" name="Current_Salary" required value={formData.Current_Salary} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-6">
            <label className="text-slate-600 font-medium">{t.form.expectedSalary} <span className="text-rose-500">*</span></label>
            <input type="text" name="Expected_Salary" required value={formData.Expected_Salary} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-6">
            <label className="text-slate-600 font-medium">{t.form.joiningDate} <span className="text-rose-500">*</span></label>
            <input type="text" name="Current_Joining_Date" required value={formData.Current_Joining_Date} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
            <label className="text-slate-600 font-medium">{t.form.otherProcess} <span className="text-rose-500">*</span></label>
            <select name="Other_Interview_Process" required value={formData.Other_Interview_Process} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none cursor-pointer">
              <option value="" disabled>{t.form.selectOne}</option>
              {t.form.processOpts.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </select>
          </motion.div>

          {/* 1. RIREKISHO FILE UPLOAD */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-8">
            <label className="text-slate-600 font-medium">{t.form.uploadRirekisho} <span className="text-rose-500">*</span></label>
            <label className="border border-dashed border-slate-400 bg-white rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50/30 transition-colors">
              {files.Rirekisho ? (
                <div className="flex flex-col items-center text-teal-600">
                  <FileCheck2 className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-center">{files.Rirekisho.name}</span>
                  <span className="text-xs text-slate-500 mt-1">Click to change file</span>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-slate-500 mb-3" strokeWidth={1.5} />
                  <span className="text-slate-700 font-medium mb-1">{t.form.dropText}</span>
                  <span className="text-slate-400 text-sm">{t.form.maxSize}</span>
                </>
              )}
              <input 
                type="file" 
                name="Rirekisho"
                className="hidden" 
                required={!files.Rirekisho}
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "Rirekisho")}
              />
            </label>
            <span className="text-xs text-slate-500">{t.form.format}</span>
          </motion.div>

          {/* 2. SHOKUMUKEIREKISHO FILE UPLOAD */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-8">
            <label className="text-slate-600 font-medium">{t.form.uploadShokumu} <span className="text-rose-500">*</span></label>
            <label className="border border-dashed border-slate-400 bg-white rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50/30 transition-colors">
              {files.Shokumukeirekisho ? (
                <div className="flex flex-col items-center text-teal-600">
                  <FileCheck2 className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-center">{files.Shokumukeirekisho.name}</span>
                  <span className="text-xs text-slate-500 mt-1">Click to change file</span>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-slate-500 mb-3" strokeWidth={1.5} />
                  <span className="text-slate-700 font-medium mb-1">{t.form.dropText}</span>
                  <span className="text-slate-400 text-sm">{t.form.maxSize}</span>
                </>
              )}
              <input 
                type="file" 
                name="Shokumukeirekisho"
                className="hidden" 
                required={!files.Shokumukeirekisho}
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "Shokumukeirekisho")}
              />
            </label>
            <span className="text-xs text-slate-500">{t.form.format}</span>
          </motion.div>

          {/* 3. ENGLISH CV FILE UPLOAD (OPTIONAL) */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
            <label className="text-slate-600 font-medium">{t.form.uploadEngCv}</label>
            <label className="border border-dashed border-slate-400 bg-white rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50/30 transition-colors">
              {files.English_CV ? (
                <div className="flex flex-col items-center text-teal-600">
                  <FileCheck2 className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-center">{files.English_CV.name}</span>
                  <span className="text-xs text-slate-500 mt-1">Click to change file</span>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-slate-500 mb-3" strokeWidth={1.5} />
                  <span className="text-slate-700 font-medium mb-1">{t.form.dropText}</span>
                  <span className="text-slate-400 text-sm">{t.form.maxSize}</span>
                </>
              )}
              <input 
                type="file" 
                name="English_CV"
                className="hidden" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "English_CV")}
              />
            </label>
            <span className="text-xs text-slate-500">{t.form.format}</span>
          </motion.div>

          {/* Consents / Checkboxes */}
          <motion.div variants={fadeUp} className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 mb-10 flex flex-col gap-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacy}
                  onChange={handleChange}
                  name="privacy"
                  className="peer appearance-none w-6 h-6 border-2 border-slate-300 bg-white rounded cursor-pointer checked:bg-[#00c2a8] checked:border-[#00c2a8] transition-colors"
                />
                <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 group-hover:text-[#00c2a8] transition-colors">
                  {t.form.privacy} <span className="text-rose-500 ml-1">*</span>
                </span>
                <span className="text-sm text-slate-500 mt-1">{t.form.privacyDesc}</span>
              </div>
            </label>

            <div className="w-full h-px bg-slate-200"></div>

            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  required
                  checked={formData.confirm}
                  onChange={handleChange}
                  name="confirm"
                  className="peer appearance-none w-6 h-6 border-2 border-slate-300 bg-white rounded cursor-pointer checked:bg-[#00c2a8] checked:border-[#00c2a8] transition-colors"
                />
                <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 group-hover:text-[#00c2a8] transition-colors">
                  {t.form.confirm} <span className="text-rose-500 ml-1">*</span>
                </span>
                <span className="text-sm text-slate-500 mt-1">{t.form.confirmDesc}</span>
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
              className={`px-10 py-4 font-bold rounded-full text-lg flex items-center justify-center gap-3 transition-all ${isSubmitting ? "bg-[#00c2a8]/70 cursor-not-allowed text-white" : "bg-[#00c2a8] hover:bg-[#00a892] text-white shadow-lg shadow-[#00c2a8]/30"}`}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} className="-ml-1" />
              )}
              {isSubmitting ? t.form.sending : t.form.submitBtn}
            </motion.button>
          </motion.div>
        </motion.form>
      </section>

      <Footer lang={lang} t={t} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} onClick={scrollToTop} className="fixed bottom-8 right-8 p-4 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors z-[100] group">
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
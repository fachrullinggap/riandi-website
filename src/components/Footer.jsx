"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Globe, Mail, PhoneOutgoing, ArrowRightCircle } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

// --- FOOTER DICTIONARY ---
const footerDict = {
  en: {
    contactBox: { inquire: "Please feel free to inquire.", contactUs: "Contact us", newsletter: "E-mail Magazine Registration", hours: "Hours: 10:00 - 19:00 [excluding weekends & holidays]" },
    socials: { fb: "Facebook", insta: "Instagram", li: "Linkedin" },
    footer: { address: "Tokyo HQ: Asakusa, Taito-ku | Jakarta Branch: SCBD, South Jakarta", rights: "© 2026 Career Diversity Inc." }
  },
  id: {
    contactBox: { inquire: "Silakan hubungi kami.", contactUs: "Hubungi kami", newsletter: "Pendaftaran Majalah E-mail", hours: "Jam Kerja: 10:00 - 19:00 [kecuali akhir pekan & hari libur]" },
    socials: { fb: "Facebook", insta: "Instagram", li: "Linkedin" },
    footer: { address: "Kantor Pusat Tokyo: Asakusa, Taito-ku | Cabang Jakarta: SCBD, Jakarta Selatan", rights: "© 2026 Career Diversity Inc." }
  },
  ja: {
    contactBox: { inquire: "お気軽にお問い合わせください。", contactUs: "お問い合わせ", newsletter: "メールマガジン登録", hours: "受付時間 10:00-19:00 [ 土・日・祝日除く ]" },
    socials: { fb: "Facebook", insta: "Instagram", li: "Linkedin" },
    footer: { address: "東京本社：台東区浅草 | ジャカルタ支店：南ジャカルタ SCBD", rights: "© 2026 Career Diversity Inc." }
  }
};

export default function Footer({ lang }) {
  const router = useRouter();
  const t = footerDict[lang] || footerDict.en;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 px-6 border-t border-slate-900 rounded-t-[3rem] mt-12 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
      
      <motion.div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        
        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <div className="text-4xl font-black text-white flex items-center gap-3 mb-2 cursor-pointer" onClick={() => router.push('/')}>
            <Globe className="w-8 h-8 text-teal-400" /> CareerDiv.
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">{t.footer.address}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-start gap-3">
          <p className="text-slate-400 font-medium">{t.contactBox.inquire}</p>
          <div className="flex items-center gap-4">
            <PhoneOutgoing className="w-8 h-8 text-teal-500" />
            <a href="tel:0368240105" className="text-4xl font-extrabold text-teal-400 hover:text-white transition-colors">03-6824-0105</a>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-4 tracking-wider">{t.contactBox.hours}</p>
          <div className="flex flex-col w-full gap-3 mt-2">
            <button onClick={() => router.push('/contact')} className="bg-teal-500 hover:bg-teal-400 text-slate-900 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors w-full">
              <Mail size={18} /> {t.contactBox.contactUs} <ArrowRightCircle size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="grid grid-cols-2 gap-4 auto-rows-[90px]">
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#1877F2] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm hover:shadow-[#1877F2]/30">
              <FaFacebook className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">{t.socials.fb}</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#E1306C] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm hover:shadow-[#E1306C]/30">
              <FaInstagram className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">{t.socials.insta}</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#0077B5] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm hover:shadow-[#0077B5]/30">
              <FaLinkedin className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">{t.socials.li}</span>
            </a>
            <a href="https://wa.me/85860001198" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#25D366] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm hover:shadow-[#25D366]/40">
              <FaWhatsapp className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800/50 text-sm text-center font-medium">{t.footer.rights}</div>
    </footer>
  );
}
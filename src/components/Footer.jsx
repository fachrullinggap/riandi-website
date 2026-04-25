"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, PhoneOutgoing } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

// --- FOOTER DICTIONARY ---
const footerDict = {
  en: {
    contactBox: { inquire: "Please feel free to inquire.", hours: "Hours: 10:00 - 19:00 [excluding weekends & holidays]" },
    socials: { fb: "Facebook", insta: "Instagram", li: "Linkedin" },
    footer: { address: "DKI Jakarta, South Jakarta", rights: "© 2026 JaLink" }
  },
  id: {
    contactBox: { inquire: "Silakan hubungi kami.", hours: "Jam Kerja: 10:00 - 19:00 [kecuali akhir pekan & hari libur]" },
    socials: { fb: "Facebook", insta: "Instagram", li: "Linkedin" },
    footer: { address: "DKI Jakarta, South Jakarta", rights: "© 2026 JaLink" }
  },
  ja: {
    contactBox: { inquire: "お気軽にお問い合わせください。", hours: "受付時間 10:00-19:00 [ 土・日・祝日除く ]" },
    socials: { fb: "Facebook", insta: "Instagram", li: "Linkedin" },
    footer: { address: "ジャカルタ支店：南ジャカルタ", rights: "© 2026 JaLink" }
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
        
        {/* LOGO & ADDRESS */}
        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <div className="text-4xl font-black text-white flex items-center gap-4 mb-2 cursor-pointer" onClick={() => router.push('/')}>
            <Image 
              src="/favicon.ico" 
              alt="JaLink Logo" 
              width={56}
              height={56} 
              className="object-contain bg-white rounded-xl p-2 shadow-sm"
              unoptimized
            /> 
            JaLink
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">{t.footer.address}</p>
        </motion.div>

        {/* CONTACT INFORMATION */}
        <motion.div variants={fadeUp} className="flex flex-col items-start gap-4">
          <p className="text-slate-400 font-medium">{t.contactBox.inquire}</p>
          
          {/* Phone Display */}
          {/* <div className="flex items-center gap-4">
            <PhoneOutgoing className="w-8 h-8 text-teal-500" />
            <span className="text-3xl md:text-4xl font-extrabold text-teal-400">+62-858-6000-1198</span>
          </div> */}

          <div className="flex items-center gap-4 mt-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-teal-500">
               <PhoneOutgoing size={20} />
            </div>
            <span className="text-xl font-bold text-slate-200">+62-858-6000-1198</span>
          </div>

          {/* Email Display (Static Text) */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-teal-500">
               <Mail size={20} />
            </div>
            <span className="text-xl font-bold text-slate-200">rint.jp23@gmail.com</span>
          </div>

          <p className="text-xs text-slate-500 font-medium tracking-wider mt-2">{t.contactBox.hours}</p>
        </motion.div>

        {/* SOCIAL MEDIA GRID */}
        <motion.div variants={fadeUp}>
          <div className="grid grid-cols-2 gap-4 auto-rows-[90px]">
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#1877F2] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm">
              <FaFacebook className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">{t.socials.fb}</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#E1306C] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm">
              <FaInstagram className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">{t.socials.insta}</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#0077B5] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm">
              <FaLinkedin className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">{t.socials.li}</span>
            </a>
            <a href="https://wa.me/+6285860001198" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 bg-[#25D366] text-white rounded-2xl group hover:-translate-y-1 transition-all shadow-sm">
              <FaWhatsapp className="w-7 h-7 group-hover:scale-110 transition-transform" /> <span className="text-sm font-semibold">WhatsApp</span>
            </a>
          </div>
        </motion.div>

      </motion.div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800/50 text-sm text-center font-medium">{t.footer.rights}</div>
    </footer>
  );
}
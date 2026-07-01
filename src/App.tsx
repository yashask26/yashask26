import React, { useState } from "react";
import { 
  Mail, Phone, Linkedin, MapPin, GraduationCap, Award, Sparkles, 
  Code, Terminal, ArrowUpRight, Check, Briefcase, Smartphone, 
  ExternalLink, Brain, Layers, Cpu, Compass, BookOpen 
} from "lucide-react";
import { motion } from "motion/react";
import { RESUME_DATA } from "./data";
import ResumeChat from "./components/ResumeChat";
import NammaMetroSahayaDemo from "./components/NammaMetroSahayaDemo";
import CropDiseaseDetectionDemo from "./components/CropDiseaseDetectionDemo";

export default function App() {
  const [activeTab, setActiveTab] = useState<"about" | "internship" | "simulators" | "skills" | "education">("about");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-300 overflow-x-hidden">
      
      {/* Decorative Glassmorphic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a14]/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-display font-extrabold text-white text-base shadow-lg shadow-blue-500/25">
              YK
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-wide text-white block">YASHAS K</span>
              <span className="font-mono text-[9px] text-blue-400 font-semibold tracking-wider uppercase">Android & GenAI Engineer</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-display text-sm font-medium text-slate-300">
            <a href="#about-section" className="text-slate-400 hover:text-white transition-colors">About & AI Chat</a>
            <a href="#internship-section" className="text-slate-400 hover:text-white transition-colors">Internship</a>
            <a href="#simulators-section" className="text-slate-400 hover:text-white transition-colors">Simulated Projects</a>
            <a href="#skills-section" className="text-slate-400 hover:text-white transition-colors">Skills Index</a>
            <a href="#education-section" className="text-slate-400 hover:text-white transition-colors">Education</a>
          </nav>

          <a 
            href={`mailto:${RESUME_DATA.email}`}
            className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-display font-semibold text-xs text-white hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            Hire Yashas
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 md:py-16 space-y-16 md:space-y-24 relative z-10">
        
        {/* HERO SECTION */}
        <motion.section 
          id="hero-section"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-400 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              Available for Internships & ISE Full-time Roles
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]"
            >
              Building Smart Android Solutions with <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Generative AI</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              I am Yashas K, an Information Science and Engineering undergraduate from Bangalore. I combine standard Android workflows (Kotlin, Jetpack Compose) with state-of-the-art Generative AI models to design accessible, intelligent, and highly optimized apps.
            </motion.p>

            {/* Quick Contacts */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-slate-400 pt-4 border-t border-white/10"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{RESUME_DATA.location}</span>
              </div>
              <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{RESUME_DATA.email}</span>
              </a>
              <a href={`tel:${RESUME_DATA.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 {RESUME_DATA.phone}</span>
              </a>
              <a href={RESUME_DATA.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>linkedin.com/in/yashask26</span>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#simulators-section"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-display font-semibold text-sm rounded-full shadow-lg shadow-blue-500/15 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                Explore Simulated Projects
              </a>
              <a 
                href={RESUME_DATA.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-display font-medium text-sm rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
              >
                Connect on LinkedIn
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <motion.div 
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-2 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="p-2.5 bg-blue-500/10 text-blue-400 w-fit rounded-xl">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">{RESUME_DATA.education[0].cgpa}</h3>
              <p className="font-sans text-xs text-slate-400">B.E in Information Science & Engineering (2022-2026)</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-2 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="p-2.5 bg-purple-500/10 text-purple-400 w-fit rounded-xl">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">MindMatrix</h3>
              <p className="font-sans text-xs text-slate-400">Android Development & Generative AI Intern</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl col-span-2 space-y-3 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="p-2.5 bg-pink-500/10 text-pink-400 w-fit rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-white">Paper Presenter (SKITE 2025)</h4>
              <p className="font-sans text-xs text-slate-400">Developed a crop disease detection algorithm using CNNs, presenting at the national level conference in Bangalore.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* ABOUT & CHAT CO-LOCATION */}
        <section id="about-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-12 border-t border-white/10">
          
          {/* Summary Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Professional Summary</h2>
              <p className="font-sans text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {RESUME_DATA.summary}
              </p>
              <p className="font-sans text-sm text-slate-400 leading-relaxed">
                Whether implementing responsive, fluid UI components using Jetpack Compose, handling secure database records using Firebase, or leveraging AI SDK APIs, my focus remains constant: delivering outstanding usability combined with robust architectural performance.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-4">
              <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                Engineering Philosophy
              </h4>
              <div className="space-y-3 font-sans text-xs text-slate-300">
                <div className="flex gap-2">
                  <div className="p-0.5 bg-blue-500/10 text-blue-400 rounded mt-0.5"><Check className="w-3 h-3" /></div>
                  <p><strong>Clean Code Architecture</strong>: Separating business rules from presentation layers in Android utilizing MVVM schemas.</p>
                </div>
                <div className="flex gap-2">
                  <div className="p-0.5 bg-blue-500/10 text-blue-400 rounded mt-0.5"><Check className="w-3 h-3" /></div>
                  <p><strong>AI Integration Strategy</strong>: Incorporating serverless Large Language Models to enrich transit systems without introducing lag.</p>
                </div>
                <div className="flex gap-2">
                  <div className="p-0.5 bg-blue-500/10 text-blue-400 rounded mt-0.5"><Check className="w-3 h-3" /></div>
                  <p><strong>Impact-focused Agriculture</strong>: Elevating small-holder organic growers with real-time on-field Convolutional Neural Network diagnostics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Bot Column */}
          <div className="lg:col-span-7">
            <ResumeChat />
          </div>
        </section>

        {/* WORK EXPERIENCE / INTERNSHIP */}
        <section id="internship-section" className="space-y-8 pt-12 border-t border-white/10">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Professional Internship</h2>
            <p className="font-sans text-sm text-slate-400">Yashas K's industry tenure translating concepts into commercial-grade software assets.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-lg text-white">{RESUME_DATA.internship.role}</h3>
                <p className="font-sans font-medium text-sm text-blue-400">{RESUME_DATA.internship.company}</p>
              </div>
              <div className="font-mono text-xs text-slate-300 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 self-start md:self-auto">
                {RESUME_DATA.internship.duration}
              </div>
            </div>

            <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-4xl mb-6">
              {RESUME_DATA.internship.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-5 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  Key Android Tasks
                </h4>
                <ul className="space-y-2 font-sans text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></span>
                    Built highly custom UI pages using Jetpack Compose following Material 3 guidelines.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></span>
                    Integrated secure Firestore databases for persistent configuration synchronization.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></span>
                    Debugged rendering pipelines to minimize CPU overhead on low-budget smartphones.
                  </li>
                </ul>
              </div>

              <div className="space-y-3 p-5 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-blue-400" />
                  Key GenAI Adaptations
                </h4>
                <ul className="space-y-2 font-sans text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></span>
                    Leveraged Google AI Studio APIs to query language models within transit engines.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></span>
                    Engineered robust prompts to supply local language routing outputs.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></span>
                    Evaluated server-side proxy handlers to keep secure LLM credential arrays hidden.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SIMULATORS */}
        <section id="simulators-section" className="space-y-8 pt-12 border-t border-white/10">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Interactive Project Showcases</h2>
            <p className="font-sans text-sm text-slate-400">Run actual live, browser-rendered simulators of Yashas's software projects below.</p>
          </div>

          <div className="space-y-12">
            {/* Show Namma Metro Sahaya Simulator */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-purple-400 font-bold">PROJECT #1</span>
                <span className="text-slate-500">|</span>
                <span className="font-sans text-xs text-slate-300">Bengaluru Transit Assistant</span>
              </div>
              <NammaMetroSahayaDemo />
            </div>

            {/* Show Crop Disease Simulator */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-blue-400 font-bold">PROJECT #2</span>
                <span className="text-slate-500">|</span>
                <span className="font-sans text-xs text-slate-300">Agricultural CNN Pathology Diagnostics</span>
              </div>
              <CropDiseaseDetectionDemo />
            </div>
          </div>
        </section>

        {/* TECHNICAL STACK */}
        <section id="skills-section" className="space-y-8 pt-12 border-t border-white/10">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Technical Stack & Strengths</h2>
            <p className="font-sans text-sm text-slate-400">Categorized list of systems, languages, and core software structures Yashas is proficient in.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESUME_DATA.skills.map((cat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  {idx === 0 && <Code className="w-4 h-4 text-blue-400" />}
                  {idx === 1 && <Cpu className="w-4 h-4 text-purple-400" />}
                  {idx === 2 && <Layers className="w-4 h-4 text-pink-400" />}
                  <h3 className="font-display font-bold text-sm text-white tracking-wide uppercase">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl font-mono text-xs text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & SCHOLASTIC MILESTONES */}
        <section id="education-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-12 border-t border-white/10">
          
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Scholastic Records</h2>
            <p className="font-sans text-sm text-slate-400 leading-relaxed">
              Yashas's academic timeline, illustrating continuous distinction with an average ISE grade score of <strong>{RESUME_DATA.education[0].cgpa}</strong> at KNS Institute of Technology.
            </p>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-3">
              <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Featured Coursework
              </h4>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Relational Databases, Design & Analysis of Algorithms, Object-Oriented Kotlin Programming, Machine Learning Paradigms, Software Engineering Lifecycles, and Embedded Systems.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0a0a14] border-2 border-blue-400"></div>
                  
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2 hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-sans font-bold text-sm text-white">{edu.institution}</h4>
                      <span className="font-mono text-[10px] text-blue-400 font-semibold">{edu.duration}</span>
                    </div>
                    <p className="font-sans text-xs text-slate-300">{edu.degree}</p>
                    <div className="inline-flex font-mono text-[10px] text-slate-400 font-medium px-3 py-1 bg-[#0a0a14]/60 border border-white/10 rounded-full">
                      {edu.cgpa}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAPER PRESENTATION / RESEARCH */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-mono text-[10px] font-semibold uppercase">
                Symposium Attended
              </div>
              <h3 className="font-sans font-bold text-lg text-white">SKITE 2025 - National Research Conference</h3>
            </div>
            <div className="font-mono text-xs text-slate-400">KNSIT, Bangalore</div>
          </div>

          <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-4xl mb-4">
            Yashas successfully presented a research paper titled <strong>"Crop Disease Detection"</strong> at the National Conference on Smart Knowledge Discovery in Information Technology and Communication Engineering (SKITE 2025).
          </p>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            The paper addresses agricultural challenge mitigation, utilizing custom Convolutional Neural Networks (CNNs) to diagnose plant pathologies in real-time and provide local-language remediation suggestions to empower small-holder growers.
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0a0a14]/80 py-12 text-slate-500 font-sans text-xs mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-display font-extrabold text-[#0a0a14] text-[10px]">
              Y
            </div>
            <span className="text-slate-400 font-semibold tracking-wide">YASHAS K</span>
          </div>

          <p className="text-center md:text-right">
            © 2026 Yashas K. Created with Google AI Studio • All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Parse owner/repo to redirect correctly
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      const owner = match[1];
      const repo = match[2].replace(/\.git$/, "");
      setIsLoading(true);
      router.push(`/analyze/${owner}/${repo}`);
    } else {
      alert("Please enter a valid GitHub repository URL");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🧠 RepoBrain
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 mb-6">
              v1.0 is now live 🚀
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Google Maps for <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Open Source Codebases
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
          >
            Transform any repository into an interactive knowledge graph. 
            Understand architecture, map issues to files, and chat with your code using AI.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-zinc-950 border border-zinc-800 rounded-2xl p-2 gap-2 shadow-2xl">
              <input
                type="text"
                placeholder="Paste a GitHub repository URL (e.g., https://github.com/facebook/react)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 px-4 py-3"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  "Get Started"
                )}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.form>

          {/* New: Hero Mockup Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 w-full max-w-5xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="rounded-3xl border border-zinc-800 overflow-hidden shadow-[0_0_80px_-20px_rgba(168,85,247,0.2)]">
              <img 
                src="/repobrain_hero_mockup_1781105818624.png" 
                alt="RepoBrain knowledge graph mockup" 
                className="w-full h-auto brightness-90 group-hover:brightness-100 transition-all"
              />
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex items-center gap-6 text-sm text-zinc-500"
          >
            <span>Try with:</span>
            <button 
              onClick={() => setUrl("https://github.com/vercel/next.js")}
              className="hover:text-white transition-colors"
            >
              next.js
            </button>
            <button 
              onClick={() => setUrl("https://github.com/facebook/react")}
              className="hover:text-white transition-colors"
            >
              react
            </button>
            <button 
              onClick={() => setUrl("https://github.com/lucide-icons/lucide")}
              className="hover:text-white transition-colors"
            >
              lucide
            </button>
          </motion.div>
        </div>
      </main>

      {/* Feature Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-32 border-t border-zinc-900">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 9V3"/><path d="M12 21v-6"/><path d="M9 12H3"/><path d="M21 12h-6"/><path d="M19.07 4.93l-4.24 4.24"/><path d="M9.17 14.83l-4.24 4.24"/><path d="M19.07 19.07l-4.24-4.24"/><path d="M9.17 9.17L4.93 4.93"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white">Interactive Graph</h3>
            <p className="text-zinc-400 leading-relaxed">
              Visualize codebases as high-level modules and file dependencies. Navigate deep structures effortlessly.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white">Issue Mapping</h3>
            <p className="text-zinc-400 leading-relaxed">
              AI maps GitHub issues to likely affected files. Know where to start before you even clone the repo.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="m3.34 19 1.4-1.4"/><path d="M5.8 17.2a3 3 0 0 0-1.8-1.8"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white">AI Assistant</h3>
            <p className="text-zinc-400 leading-relaxed">
              Ask questions about the repo structure, routing, or logic and get grounded answers with file references.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-zinc-950 border-t border-zinc-900 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-500 text-sm">
            © 2026 RepoBrain. Built for modern builders.
          </div>
          <div className="flex gap-8 text-zinc-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

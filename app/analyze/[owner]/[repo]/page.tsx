"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnalysisResult } from "@/types";

export default function AnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const owner = params.owner as string;
  const repo = params.repo as string;

  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function analyzeRepo() {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: `https://github.com/${owner}/${repo}` }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to analyze repository");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (owner && repo) {
      analyzeRepo();
    }
  }, [owner, repo]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Analysis Failed</h1>
        <p className="text-zinc-400 mb-8 max-w-md">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-white text-black rounded-lg font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-blue-500/20 rounded-full" />
          <div className="absolute inset-2 border-4 border-blue-500 border-b-transparent rounded-full animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Analyzing Repository</h2>
        <p className="text-zinc-500 animate-pulse">
          Fetching {owner}/{repo} tree...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-zinc-500">{owner} /</span> {repo}
            </h1>
            <p className="text-zinc-500 text-sm">
              {data?.fileCount} files • {data?.moduleCount} modules
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Analyzed successfully
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto h-[600px] border border-zinc-900 rounded-2xl bg-zinc-950/50 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(circle at center, #3b82f6 0%, transparent 70%)', filter: 'blur(80px)'}} 
        />
        
        <div className="relative z-10 text-center px-12">
          <span className="text-4xl mb-4 block">🏗️</span>
          <h2 className="text-2xl font-bold mb-4">Architectural Modules</h2>
          <p className="text-zinc-500 mb-12 max-w-md mx-auto">
            We've identified the core modules of this repository. The interactive graph will be implemented in Stage 2.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.nodes
              .filter((n) => n.type === "module")
              .map((module) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-left hover:border-purple-500/50 transition-colors group"
                >
                  <div className="text-sm font-semibold mb-1 group-hover:text-purple-400">{module.label}</div>
                  <div className="text-xs text-zinc-500">{module.fileCount} files</div>
                </motion.div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

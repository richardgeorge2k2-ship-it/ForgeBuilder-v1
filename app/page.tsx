'use client'

import React from 'react'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { MutedText } from '@/components/ui/MutedText'

// --- Hardened UI Components for Homepage ---

function NavLink({ href, children, primary = false }: { href: string, children: React.ReactNode, primary?: boolean }) {
  if (primary) {
    return (
      <Link 
        href={href} 
        className="text-xs font-medium bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 transition-colors"
      >
        {children}
      </Link>
    )
  }
  return (
    <Link href={href} className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
      {children}
    </Link>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
      {children}
    </p>
  )
}

// --- Main Homepage ---

export default function Home() {
  console.log('// console.log(\'Homepage H1 rendered. Text:\', \'ForgeBuilder\')')
  console.log('// console.log(\'Homepage primary CTA rendered. Link:\', \'/signup\')')

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-100">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-[10px]">
            FB
          </div>
          <span className="text-sm font-medium tracking-tight">ForgeBuilder</span>
        </div>
        <div className="flex items-center space-x-8">
          <NavLink href="/login">Sign in</NavLink>
          <NavLink href="/signup" primary>Get started</NavLink>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-24 pb-32 space-y-8">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl font-medium tracking-tight leading-[1.1] text-slate-900">
            ForgeBuilder
          </h1>
          <h2 className="text-xl text-slate-500 leading-relaxed font-normal">
            The operational spine for real businesses.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
            Infrastructure before growth. Ownership before scale. Build on a foundation designed for durability and eventual detachment.
          </p>
          <div className="pt-4">
            <Link 
              href="/signup" 
              className="inline-block bg-slate-900 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Start operating
            </Link>
          </div>
        </div>
      </header>

      {/* The Spine */}
      <section className="border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SectionTitle>Infrastructure, not just a builder.</SectionTitle>
            <MutedText>
              Most tools lock you in. ForgeBuilder sets you free. We provide the database, billing, and routing architecture you need to run a real business.
            </MutedText>
            <ul className="space-y-3">
              {['Full data ownership', 'Direct Stripe integration', 'Clean routing architecture'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-xs text-slate-600">
                  <div className="w-1 h-1 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-video bg-white border border-slate-100 rounded-xl shadow-sm p-8 flex flex-col justify-center space-y-4">
            <div className="h-2 w-1/2 bg-slate-100 rounded" />
            <div className="h-2 w-3/4 bg-slate-50 rounded" />
            <div className="h-2 w-2/3 bg-slate-50 rounded" />
          </div>
        </div>
      </section>

      {/* SAS™ */}
      <section className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-24 space-y-16">
          <div className="max-w-xl space-y-4">
            <SectionTitle>Growth that observes.</SectionTitle>
            <MutedText>
              Our SAS™ engine monitors your system activity to identify conversion leaks and revenue opportunities. It doesn't spam. It doesn't guess. It provides actionable signals based on real behavior.
            </MutedText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Observe', desc: 'Continuous monitoring of billing and traffic events.' },
              { title: 'Recommend', desc: 'Actionable signals delivered to your dashboard.' },
              { title: 'Act', desc: 'Autonomous protection and re-engagement logic.' },
            ].map((step) => (
              <div key={step.title} className="space-y-3">
                <Kicker>{step.title}</Kicker>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portability */}
      <section className="border-t border-slate-100 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md space-y-6">
            <SectionTitle light>Built for the exit.</SectionTitle>
            <p className="text-sm text-slate-400 leading-relaxed">
              We architected ForgeBuilder with a planned detachment strategy. When you outgrow us, you take your Stripe account and your database with you. No rebuilds. No downtime.
            </p>
          </div>
          <div className="px-8 py-6 border border-slate-800 rounded-lg bg-slate-800/50">
            <Kicker>Migration Readiness</Kicker>
            <p className="text-xl font-medium">100% Portable</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-[8px]">
              FB
            </div>
            <span className="text-xs font-medium text-slate-500">© 2025 ForgeBuilder</span>
          </div>
          <div className="flex space-x-8">
            <Link href="/about" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">About</Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

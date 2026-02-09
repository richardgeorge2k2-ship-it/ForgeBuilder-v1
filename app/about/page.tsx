import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-100">
      <nav className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-5 w-5 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-[8px]">
            FB
          </div>
          <span className="text-xs font-medium tracking-tight">ForgeBuilder</span>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-20 space-y-16">
        <section className="space-y-6">
          <h1 className="text-3xl font-medium tracking-tight text-slate-900">Built for operators, not tourists.</h1>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Most modern software is built to keep you inside. They prioritize engagement over utility, and lock-in over leverage.
            </p>
            <p>
              ForgeBuilder was built with the opposite philosophy. We believe the best software is the kind that operates so reliably it becomes invisible.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">The Philosophy</h2>
          <div className="grid gap-8">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-slate-900">Infrastructure first</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Growth without a spine is just noise. We provide the database, billing, and routing architecture required to sustain a real business from day one.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-slate-900">Autonomous by design</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our SAS™ engine doesn't just collect data; it observes patterns and identifies leverage. It acts as a silent partner, flagging risks and suggesting growth moves while you focus on the work.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-slate-900">Planned detachment</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are a launch accelerator, not a permanent dependency. ForgeBuilder is architected so that when you outgrow us, you can take your data and your revenue streams with you.
              </p>
            </div>
          </div>
        </section>

        <section className="pt-12 border-t border-slate-100">
          <div className="p-8 bg-slate-50 rounded-xl space-y-4">
            <p className="text-sm text-slate-900 font-medium italic">
              "Infrastructure before growth. Ownership before scale."
            </p>
            <p className="text-xs text-slate-500">
              This is our internal mantra. It guides every decision we make, from the features we build to the way we handle your data.
            </p>
          </div>
        </section>

        <div className="pt-8 flex justify-center">
          <Link href="/signup" className="text-sm font-medium text-slate-900 hover:underline">
            Start building with ForgeBuilder →
          </Link>
        </div>
      </main>
    </div>
  )
}

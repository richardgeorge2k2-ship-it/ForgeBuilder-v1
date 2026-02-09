'use client'

import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-medium tracking-tight text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500">Launch and operate real businesses with full ownership.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Create account
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center">
          You will be able to create your first project immediately.
        </p>

        <div className="text-center">
          <Link href="/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

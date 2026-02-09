'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-medium tracking-tight text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to manage your projects.</p>
        </div>

        <form className="space-y-4">
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
            Sign in
          </button>
        </form>

        <div className="text-center">
          <Link href="/signup" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

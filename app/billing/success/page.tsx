'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Subscription Activated</h1>
          <p className="text-slate-500">
            Thank you for upgrading! Your account has been updated and you now have full access to your new features.
          </p>
        </div>
        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
          <Link href="/app/billing">Return to Billing</Link>
        </Button>
      </Card>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { XCircle } from 'lucide-react'

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <XCircle className="w-16 h-16 text-slate-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Checkout Cancelled</h1>
          <p className="text-slate-500">
            No changes were made to your account. If you had any trouble, please contact our support team.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href="/app/billing">Back to Billing</Link>
        </Button>
      </Card>
    </div>
  )
}

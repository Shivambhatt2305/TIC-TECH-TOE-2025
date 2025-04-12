"use client"

import { Suspense } from "react"
import RazorpayPayment from "@/payment-gateway"
import { Loader2 } from "lucide-react"

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2">Loading payment gateway...</span>
          </div>
        }
      >
        <RazorpayPayment amount={50000} description="Premium Shipping Service" />
      </Suspense>
    </div>
  )
}

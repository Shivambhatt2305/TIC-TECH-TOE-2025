"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import RazorpayPayment from "@/payment-gateway"

export default function PaymentButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-teal-500 
            rounded-full font-semibold text-white hover:from-green-600 hover:to-teal-600 transition-all duration-300 
            shadow-lg shadow-green-500/30 hover:shadow-green-500/50 text-sm md:text-base"
        >
          Make Payment
          <CreditCard className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <RazorpayPayment amount={50000} description="Premium Shipping Service" />
      </DialogContent>
    </Dialog>
  )
}

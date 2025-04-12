"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, DollarSign } from "lucide-react"

// This component would be imported into your welcome page
export default function RazorpayPayment({ amount = 1000, currency = "INR", description = "Shipping Service" }) {
  const [loading, setLoading] = useState(false)
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)
  const { toast } = useToast()

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadRazorpayScript = async () => {
      if (window.Razorpay) {
        setIsRazorpayLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true

      script.onload = () => {
        setIsRazorpayLoaded(true)
      }

      script.onerror = () => {
        console.error("Failed to load Razorpay SDK")
        setIsRazorpayLoaded(false)
      }

      document.body.appendChild(script)
    }

    loadRazorpayScript()

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      if (existingScript && existingScript.parentNode) {
        // Don't remove the script as it might be used by other components
        // Just clean up our state
      }
    }
  }, [])

  const makePayment = async () => {
    if (!isRazorpayLoaded) {
      toast({
        variant: "destructive",
        title: "Razorpay SDK not loaded",
        description: "Please check your internet connection and try again",
      })
      return
    }

    setLoading(true)

    try {
      // Make a request to your server to create an order
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          description,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      const options = {
        key: "rzp_test_ixWYqLo3p8P7S4", // Your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: "Next Generation Shipping",
        description: description,
        order_id: data.id,
        handler: async (response) => {
          // Make a request to your server to verify the payment
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyResponse.ok) {
            toast({
              title: "Payment Successful",
              description: `Payment ID: ${response.razorpay_payment_id}`,
            })
          } else {
            toast({
              variant: "destructive",
              title: "Payment Verification Failed",
              description: verifyData.message || "Something went wrong",
            })
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Shipping Address",
        },
        theme: {
          color: "#4F46E5",
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-center text-blue-800">Shipping Payment</CardTitle>
        <CardDescription className="text-center">Secure payment with Razorpay</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
          <CreditCard className="w-12 h-12 text-blue-600 mr-4" />
          <div>
            <p className="text-sm text-gray-600">Amount to pay</p>
            <p className="text-2xl font-bold text-blue-800">
              {(amount / 100).toFixed(2)} {currency}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" value={description} disabled className="bg-gray-50" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={makePayment}
          disabled={loading || !isRazorpayLoaded}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {loading ? "Processing..." : isRazorpayLoaded ? "Pay Now" : "Loading..."}
          <DollarSign className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

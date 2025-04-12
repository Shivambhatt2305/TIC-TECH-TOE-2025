import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { amount, currency, description } = await request.json()

    // Validate the request
    if (!amount || !currency) {
      return NextResponse.json({ message: "Amount and currency are required" }, { status: 400 })
    }

    // Create a Razorpay order
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`rzp_test_ixWYqLo3p8P7S4:m8hWj2v5Uu9yq0Z3yQabeOqT`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        notes: {
          description,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.description || "Failed to create Razorpay order")
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 },
    )
  }
}

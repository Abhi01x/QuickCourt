"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Trophy, ArrowLeft, CalendarIcon, Clock, Users, CreditCard, CheckCircle, MapPin, Star } from "lucide-react"

// Mock venue data (same as venue detail page)
const venueData = {
  1: {
    id: 1,
    name: "Elite Tennis Center",
    location: "Downtown Sports Complex, 123 Main St",
    rating: 4.9,
    reviewCount: 156,
    image: "/placeholder.svg?height=300&width=400",
    courts: [
      { id: 1, name: "Court 1", type: "Hard Court", price: 45, available: true },
      { id: 2, name: "Court 2", type: "Hard Court", price: 45, available: true },
      { id: 3, name: "Court 3", type: "Hard Court", price: 45, available: false },
      { id: 4, name: "Court 4", type: "Clay Court", price: 55, available: true },
      { id: 5, name: "Court 5", type: "Clay Court", price: 55, available: true },
      { id: 6, name: "Court 6", type: "Grass Court", price: 65, available: true },
      { id: 7, name: "Court 7", type: "Pickleball", price: 35, available: true },
      { id: 8, name: "Court 8", type: "Pickleball", price: 35, available: true },
    ],
  },
}

// Mock time slots
const timeSlots = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
]

const durations = [
  { value: "1", label: "1 hour", multiplier: 1 },
  { value: "1.5", label: "1.5 hours", multiplier: 1.5 },
  { value: "2", label: "2 hours", multiplier: 2 },
  { value: "3", label: "3 hours", multiplier: 3 },
]

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const venueId = Number.parseInt(params.venueId as string)
  const venue = venueData[venueId as keyof typeof venueData]

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCourt, setSelectedCourt] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [playerCount, setPlayerCount] = useState("2")
  const [specialRequests, setSpecialRequests] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
  })

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Venue Not Found</h1>
          <p className="text-muted-foreground mb-4">The venue you're trying to book doesn't exist.</p>
          <Link href="/venues">
            <Button>Browse All Venues</Button>
          </Link>
        </div>
      </div>
    )
  }

  const selectedCourtData = venue.courts.find((court) => court.id.toString() === selectedCourt)
  const selectedDurationData = durations.find((d) => d.value === selectedDuration)
  const totalPrice =
    selectedCourtData && selectedDurationData ? selectedCourtData.price * selectedDurationData.multiplier : 0

  const handleBooking = () => {
    console.log("[v0] Booking submitted:", {
      venue: venue.name,
      court: selectedCourtData?.name,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      players: playerCount,
      specialRequests,
      totalPrice,
      paymentData,
    })

    // Simulate booking process
    setTimeout(() => {
      router.push(`/booking-confirmation?venue=${venue.name}&court=${selectedCourtData?.name}&total=${totalPrice}`)
    }, 1500)
  }

  const canProceedToPayment = selectedDate && selectedCourt && selectedTime && selectedDuration
  const canCompleteBooking = canProceedToPayment && paymentData.cardNumber && paymentData.cardholderName

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/venues/${venue.id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Venue
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                1
              </div>
              <span className="font-medium">Select Details</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                3
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Venue Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <img
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h2 className="text-xl">{venue.name}</h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {venue.location}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span className="font-medium">{venue.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>

                {/* Date Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Court Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Court</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {venue.courts
                        .filter((court) => court.available)
                        .map((court) => (
                          <div
                            key={court.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedCourt === court.id.toString()
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedCourt(court.id.toString())}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{court.name}</h4>
                                <p className="text-sm text-muted-foreground">{court.type}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">${court.price}/hour</p>
                                <Badge variant="default" className="text-xs">
                                  Available
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Time and Duration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Time & Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="time">Start Time</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map((duration) => (
                              <SelectItem key={duration.value} value={duration.value}>
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Additional Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="players">Number of Players</Label>
                      <Select value={playerCount} onValueChange={setPlayerCount}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Player</SelectItem>
                          <SelectItem value="2">2 Players</SelectItem>
                          <SelectItem value="3">3 Players</SelectItem>
                          <SelectItem value="4">4 Players</SelectItem>
                          <SelectItem value="5+">5+ Players</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="requests">Special Requests (Optional)</Label>
                      <Textarea
                        id="requests"
                        placeholder="Any special requirements or requests..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Payment Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </CardTitle>
                    <CardDescription>Enter your payment details to complete the booking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Textarea
                        id="billingAddress"
                        placeholder="123 Main St, City, State, ZIP"
                        value={paymentData.billingAddress}
                        onChange={(e) => setPaymentData({ ...paymentData, billingAddress: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="font-medium">Secure Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Your payment information is encrypted and secure. This is a demo - no real charges will be
                          made.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                  </div>
                )}
                {selectedCourtData && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Court:</span>
                    <span className="font-medium">{selectedCourtData.name}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                )}
                {selectedDurationData && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{selectedDurationData.label}</span>
                  </div>
                )}
                {playerCount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Players:</span>
                    <span className="font-medium">{playerCount}</span>
                  </div>
                )}

                {totalPrice > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee:</span>
                      <span className="font-medium">$5</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">${totalPrice + 5}</span>
                    </div>
                  </>
                )}

                <div className="space-y-2 pt-4">
                  {currentStep === 1 && (
                    <Button className="w-full" disabled={!canProceedToPayment} onClick={() => setCurrentStep(2)}>
                      Proceed to Payment
                    </Button>
                  )}
                  {currentStep === 2 && (
                    <>
                      <Button className="w-full" disabled={!canCompleteBooking} onClick={handleBooking}>
                        Complete Booking
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentStep(1)}>
                        Back to Details
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

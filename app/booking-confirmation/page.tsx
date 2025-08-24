"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Clock, Users, Download, Share, Trophy } from "lucide-react"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const venue = searchParams.get("venue")
  const court = searchParams.get("court")
  const total = searchParams.get("total")

  // Generate a mock booking reference
  const bookingRef = `QC${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your court reservation has been successfully booked. Get ready to play!
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Booking Details
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">Confirmed</Badge>
              </CardTitle>
              <CardDescription>Booking Reference: {bookingRef}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{venue || "Elite Tennis Center"}</p>
                      <p className="text-sm text-muted-foreground">Downtown Sports Complex</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Today</p>
                      <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">3:00 PM - 4:00 PM</p>
                      <p className="text-sm text-muted-foreground">1 hour duration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{court || "Court 1"}</p>
                      <p className="text-sm text-muted-foreground">2 players</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Paid:</span>
                  <span className="text-xl font-bold text-primary">${total ? Number.parseInt(total) + 5 : 50}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Check your email</p>
                    <p className="text-sm text-muted-foreground">
                      We've sent a confirmation email with your booking details and QR code.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Arrive 15 minutes early</p>
                    <p className="text-sm text-muted-foreground">
                      Please arrive at the venue 15 minutes before your booking time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Show your booking confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      Present your QR code or booking reference at the front desk.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Button variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share Booking
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto">View My Bookings</Button>
            </Link>
            <Link href="/venues">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                Book Another Court
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="text-center mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{" "}
              <a href="mailto:support@quickcourt.com" className="text-primary hover:underline">
                support@quickcourt.com
              </a>{" "}
              or call{" "}
              <a href="tel:+15551234567" className="text-primary hover:underline">
                (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

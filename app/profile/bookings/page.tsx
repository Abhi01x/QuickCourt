"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, ArrowLeft, Search, Calendar, MapPin, Clock, Star, Download, RefreshCw, X } from "lucide-react"

// Mock booking data
const bookings = [
  {
    id: "QC123456",
    sport: "Tennis",
    venue: "Elite Tennis Center",
    court: "Court 2",
    date: "2024-01-15",
    time: "3:00 PM - 4:00 PM",
    status: "confirmed",
    price: 50,
    players: 2,
    type: "upcoming",
  },
  {
    id: "QC123457",
    sport: "Basketball",
    venue: "Victory Basketball Arena",
    court: "Full Court",
    date: "2024-01-16",
    time: "7:00 PM - 8:30 PM",
    status: "confirmed",
    price: 75,
    players: 8,
    type: "upcoming",
  },
  {
    id: "QC123458",
    sport: "Badminton",
    venue: "Champions Badminton Club",
    court: "Court 1",
    date: "2024-01-18",
    time: "6:00 PM - 7:00 PM",
    status: "pending",
    price: 40,
    players: 2,
    type: "upcoming",
  },
  {
    id: "QC123454",
    sport: "Tennis",
    venue: "Elite Tennis Center",
    court: "Court 1",
    date: "2024-01-10",
    time: "2:00 PM - 3:00 PM",
    status: "completed",
    price: 45,
    players: 2,
    type: "past",
    rating: 5,
  },
  {
    id: "QC123455",
    sport: "Basketball",
    venue: "Victory Basketball Arena",
    court: "Full Court",
    date: "2024-01-08",
    time: "8:00 PM - 9:30 PM",
    status: "completed",
    price: 75,
    players: 6,
    type: "past",
    rating: 4,
  },
  {
    id: "QC123453",
    sport: "Tennis",
    venue: "Elite Tennis Center",
    court: "Court 3",
    date: "2024-01-05",
    time: "4:00 PM - 5:00 PM",
    status: "cancelled",
    price: 45,
    players: 2,
    type: "past",
  },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sportFilter, setSportFilter] = useState("all")

  const upcomingBookings = bookings.filter((b) => b.type === "upcoming")
  const pastBookings = bookings.filter((b) => b.type === "past")

  const filterBookings = (bookingList: typeof bookings) => {
    return bookingList.filter((booking) => {
      const matchesSearch =
        booking.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter
      const matchesSport = sportFilter === "all" || booking.sport.toLowerCase() === sportFilter.toLowerCase()

      return matchesSearch && matchesStatus && matchesSport
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    console.log("[v0] Cancelling booking:", bookingId)
    // In real app, this would make an API call
  }

  const handleRescheduleBooking = (bookingId: string) => {
    console.log("[v0] Rescheduling booking:", bookingId)
    // In real app, this would redirect to reschedule flow
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">Manage your court reservations and booking history</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings by venue, sport, or reference..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sportFilter} onValueChange={setSportFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sports</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="badminton">Badminton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="history">History ({pastBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {filterBookings(upcomingBookings).length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                    <p className="text-muted-foreground mb-4">You don't have any upcoming court reservations.</p>
                    <Link href="/venues">
                      <Button>Book a Court</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                filterBookings(upcomingBookings).map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">
                                {booking.sport} - {booking.court}
                              </h3>
                              <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.venue}
                              </p>
                              <p className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(booking.date).toLocaleDateString()} • {booking.time}
                              </p>
                              <p className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {booking.players} players • ${booking.price}
                              </p>
                              <p className="text-xs">Booking Reference: {booking.id}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0 md:min-w-32">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRescheduleBooking(booking.id)}
                            className="bg-transparent"
                          >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="bg-transparent text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Cancel
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {filterBookings(pastBookings).length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No booking history</h3>
                    <p className="text-muted-foreground">Your completed bookings will appear here.</p>
                  </CardContent>
                </Card>
              ) : (
                filterBookings(pastBookings).map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">
                                {booking.sport} - {booking.court}
                              </h3>
                              <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                              {booking.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                                  <span className="text-sm">{booking.rating}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.venue}
                              </p>
                              <p className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(booking.date).toLocaleDateString()} • {booking.time}
                              </p>
                              <p className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {booking.players} players • ${booking.price}
                              </p>
                              <p className="text-xs">Booking Reference: {booking.id}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0 md:min-w-32">
                          {booking.status === "completed" && !booking.rating && (
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Star className="w-3 h-3 mr-1" />
                              Rate Venue
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                          {booking.status === "completed" && (
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Book Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

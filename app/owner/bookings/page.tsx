"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  ArrowLeft,
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  X,
  Eye,
} from "lucide-react"

// Mock booking data for facility owner
const bookings = [
  {
    id: "QC123456",
    customer: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    venue: "Elite Tennis Center",
    court: "Court 2",
    sport: "Tennis",
    date: "2024-01-15",
    time: "3:00 PM - 4:00 PM",
    duration: 1,
    players: 2,
    amount: 50,
    status: "confirmed",
    type: "upcoming",
    bookingDate: "2024-01-10",
  },
  {
    id: "QC123457",
    customer: {
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    venue: "Downtown Sports Complex",
    court: "Basketball Court 1",
    sport: "Basketball",
    date: "2024-01-16",
    time: "7:00 PM - 8:30 PM",
    duration: 1.5,
    players: 8,
    amount: 75,
    status: "pending",
    type: "upcoming",
    bookingDate: "2024-01-12",
  },
  {
    id: "QC123458",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    venue: "Elite Tennis Center",
    court: "Court 1",
    sport: "Tennis",
    date: "2024-01-18",
    time: "6:00 PM - 7:00 PM",
    duration: 1,
    players: 2,
    amount: 45,
    status: "pending",
    type: "upcoming",
    bookingDate: "2024-01-13",
  },
  {
    id: "QC123454",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    venue: "Elite Tennis Center",
    court: "Court 3",
    sport: "Tennis",
    date: "2024-01-10",
    time: "2:00 PM - 3:00 PM",
    duration: 1,
    players: 2,
    amount: 45,
    status: "completed",
    type: "past",
    bookingDate: "2024-01-08",
  },
  {
    id: "QC123455",
    customer: {
      name: "Alex Wilson",
      email: "alex.wilson@email.com",
      phone: "+1 (555) 567-8901",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    venue: "Downtown Sports Complex",
    court: "Volleyball Court 2",
    sport: "Volleyball",
    date: "2024-01-08",
    time: "8:00 PM - 9:30 PM",
    duration: 1.5,
    players: 12,
    amount: 90,
    status: "completed",
    type: "past",
    bookingDate: "2024-01-05",
  },
]

export default function OwnerBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [venueFilter, setVenueFilter] = useState("all")

  const upcomingBookings = bookings.filter((b) => b.type === "upcoming")
  const pastBookings = bookings.filter((b) => b.type === "past")

  const filterBookings = (bookingList: typeof bookings) => {
    return bookingList.filter((booking) => {
      const matchesSearch =
        booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.court.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter
      const matchesVenue = venueFilter === "all" || booking.venue === venueFilter

      return matchesSearch && matchesStatus && matchesVenue
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

  const handleApproveBooking = (bookingId: string) => {
    console.log("[v0] Approving booking:", bookingId)
    // In real app, this would make an API call
  }

  const handleRejectBooking = (bookingId: string) => {
    console.log("[v0] Rejecting booking:", bookingId)
    // In real app, this would make an API call
  }

  const venues = ["All Venues", "Elite Tennis Center", "Downtown Sports Complex", "Westside Athletic Hub"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/owner/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">Owner</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
            <p className="text-muted-foreground">Manage reservations across all your venues</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by customer name, booking ID, or court..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={venueFilter} onValueChange={setVenueFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue} value={venue === "All Venues" ? "all" : venue}>
                          {venue}
                        </SelectItem>
                      ))}
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
                    <p className="text-muted-foreground">No upcoming reservations match your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                filterBookings(upcomingBookings).map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={booking.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {booking.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{booking.customer.name}</h3>
                              <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                              <p className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.venue} - {booking.court}
                              </p>
                              <p className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                              <p className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {booking.time} ({booking.duration}h)
                              </p>
                              <p className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {booking.players} players
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Booking ID: {booking.id}</span>
                              <span>Booked: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />${booking.amount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0 lg:min-w-40">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" onClick={() => handleApproveBooking(booking.id)} className="w-full">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectBooking(booking.id)}
                                className="w-full bg-transparent text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
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
                    <p className="text-muted-foreground">No completed bookings match your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                filterBookings(pastBookings).map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={booking.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {booking.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{booking.customer.name}</h3>
                              <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                              <p className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.venue} - {booking.court}
                              </p>
                              <p className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                              <p className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {booking.time} ({booking.duration}h)
                              </p>
                              <p className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {booking.players} players
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Booking ID: {booking.id}</span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />${booking.amount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0 lg:min-w-32">
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
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

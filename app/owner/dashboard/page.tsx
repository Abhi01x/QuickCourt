"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  Bell,
  Settings,
  LogOut,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function OwnerDashboardPage() {
  const [userType] = useState("facility_owner") // This would come from auth context

  // Mock data for facility owner
  const ownerData = {
    name: "Sarah Wilson",
    venues: [
      {
        id: 1,
        name: "Elite Tennis Center",
        courts: 8,
        bookingsToday: 12,
        revenue: 1250,
        rating: 4.9,
        status: "active",
      },
      {
        id: 2,
        name: "Downtown Sports Complex",
        courts: 15,
        bookingsToday: 8,
        revenue: 980,
        rating: 4.7,
        status: "active",
      },
    ],
  }

  const totalRevenue = ownerData.venues.reduce((sum, venue) => sum + venue.revenue, 0)
  const totalBookings = ownerData.venues.reduce((sum, venue) => sum + venue.bookingsToday, 0)
  const totalCourts = ownerData.venues.reduce((sum, venue) => sum + venue.courts, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 ml-2">Owner</Badge>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/owner/dashboard" className="text-primary font-medium">
              Dashboard
            </Link>
            <Link href="/owner/venues" className="text-muted-foreground hover:text-foreground transition-colors">
              My Venues
            </Link>
            <Link href="/owner/bookings" className="text-muted-foreground hover:text-foreground transition-colors">
              Bookings
            </Link>
            <Link href="/owner/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {ownerData.name}!</h1>
          <p className="text-muted-foreground">Here's how your venues are performing today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Courts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourts}</div>
              <p className="text-xs text-muted-foreground">Across {ownerData.venues.length} venues</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on 245 reviews</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Venues */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Venues</CardTitle>
                  <CardDescription>Overview of your sports facilities</CardDescription>
                </div>
                <Link href="/owner/venues">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Venue
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ownerData.venues.map((venue) => (
                    <div key={venue.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{venue.name}</h4>
                          <p className="text-sm text-muted-foreground">{venue.courts} courts available</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {venue.bookingsToday} bookings today
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />${venue.revenue} revenue
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-current text-yellow-500" />
                          <span className="font-medium">{venue.rating}</span>
                        </div>
                        <Badge variant="default" className="mb-2">
                          {venue.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Link href={`/owner/venues/${venue.id}`}>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest reservations across your venues</CardDescription>
                </div>
                <Link href="/owner/bookings">
                  <Button variant="outline" className="bg-transparent">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "QC123456",
                      customer: "John Doe",
                      venue: "Elite Tennis Center",
                      court: "Court 2",
                      date: "Today",
                      time: "3:00 PM - 4:00 PM",
                      amount: 50,
                      status: "confirmed",
                    },
                    {
                      id: "QC123457",
                      customer: "Mike Chen",
                      venue: "Downtown Sports Complex",
                      court: "Basketball Court 1",
                      date: "Today",
                      time: "7:00 PM - 8:30 PM",
                      amount: 75,
                      status: "pending",
                    },
                    {
                      id: "QC123458",
                      customer: "Emily Davis",
                      venue: "Elite Tennis Center",
                      court: "Court 1",
                      date: "Tomorrow",
                      time: "6:00 PM - 7:00 PM",
                      amount: 45,
                      status: "confirmed",
                    },
                  ].map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {booking.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{booking.customer}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.venue} - {booking.court}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.date} • {booking.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary">${booking.amount}</p>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/owner/venues">
                  <Button className="w-full justify-start">
                    <Building2 className="w-4 h-4 mr-2" />
                    Manage Venues
                  </Button>
                </Link>
                <Link href="/owner/bookings">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Bookings
                  </Button>
                </Link>
                <Link href="/owner/analytics">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pending Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
                <CardDescription>Items that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Booking Approvals</span>
                    </div>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">New Reviews</span>
                    </div>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Maintenance Requests</span>
                    </div>
                    <Badge variant="secondary">1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                    <span className="font-medium text-secondary">$18,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Bookings</span>
                    <span className="font-medium">287</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">New Customers</span>
                    <span className="font-medium">42</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

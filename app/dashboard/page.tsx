"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Trophy, Calendar, MapPin, Clock, Star, LogOut, Plus, User, History, Search, Filter } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function DashboardPage() {
  const [userType] = useState("player")
  const [userData, setUserData] = useState(null)
  const [showAllVenues, setShowAllVenues] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken")
        if (!token) {
          router.push("/auth/login")
          return
        }

        const storedUserData = localStorage.getItem("userData")
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData)
          console.log("[v0] Loading user data from localStorage:", parsedUserData)

          setUserData({
            name: parsedUserData.name || "User",
            email: parsedUserData.email || "",
            phone: parsedUserData.phone || "",
            id: parsedUserData.id || "",
            role: parsedUserData.role || "user",
            // Generate random avatar based on user name or email
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUserData.name || parsedUserData.email || Math.random()}`,
          })
        } else {
          // If no user data in localStorage, redirect to login
          console.log("[v0] No user data found in localStorage, redirecting to login")
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/auth/login")
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    router.push("/auth/login")
  }

  const popularVenues = [
    {
      id: 1,
      name: "Elite Tennis Center",
      rating: 4.9,
      sport: "Tennis",
      image: "/outdoor-tennis-court.png",
      bookings: 156,
    },
    {
      id: 2,
      name: "Victory Basketball Arena",
      rating: 4.8,
      sport: "Basketball",
      image: "/outdoor-basketball-court.png",
      bookings: 142,
    },
    {
      id: 3,
      name: "Champions Badminton Club",
      rating: 4.7,
      sport: "Badminton",
      image: "/badminton-court.png",
      bookings: 98,
    },
  ]

  const popularSports = [
    { name: "Tennis", venues: 24, image: "/tennis-racket.png", color: "hsl(var(--primary))" },
    { name: "Basketball", venues: 18, image: "/basketball-action.png", color: "hsl(var(--secondary))" },
    { name: "Badminton", venues: 15, image: "/badminton-shuttlecock.png", color: "#10b981" },
    { name: "Football", venues: 12, image: "/football-action.png", color: "#f59e0b" },
  ]

  const bookingTrends = [
    { month: "Jan", bookings: 4, hours: 8 },
    { month: "Feb", bookings: 6, hours: 12 },
    { month: "Mar", bookings: 8, hours: 16 },
    { month: "Apr", bookings: 5, hours: 10 },
    { month: "May", bookings: 9, hours: 18 },
    { month: "Jun", bookings: 7, hours: 14 },
  ]

  const sportDistribution = [
    { sport: "Tennis", label: "Tennis", bookings: 15, color: "hsl(var(--primary))" },
    { sport: "Basketball", label: "Basketball", bookings: 6, color: "hsl(var(--secondary))" },
    { sport: "Badminton", label: "Badminton", bookings: 3, color: "#10b981" },
  ]

  const spendingData = [
    { month: "Jan", amount: 180 },
    { month: "Feb", amount: 240 },
    { month: "Mar", amount: 320 },
    { month: "Apr", amount: 200 },
    { month: "May", amount: 360 },
    { month: "Jun", amount: 280 },
  ]

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
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => setShowAllVenues(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              View All Venues
            </Button>
            <Link href="/profile/bookings" className="text-muted-foreground hover:text-foreground transition-colors">
              My Bookings
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            {userData && (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{userData.name}</p>
                  <p className="text-xs text-muted-foreground">{userData.email}</p>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData?.name || "User"}!</h1>
          <p className="text-muted-foreground">Ready for your next game?</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Venues</h2>
            <Button variant="outline" onClick={() => setShowAllVenues(true)} className="bg-transparent">
              View All Venues
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {popularVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">{venue.sport}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{venue.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span className="text-sm font-medium">{venue.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{venue.bookings} bookings</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Popular Sports</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {popularSports.map((sport, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${sport.color}20` }}
                  >
                    <img src={sport.image || "/placeholder.svg"} alt={sport.name} className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{sport.name}</h3>
                  <p className="text-sm text-muted-foreground">{sport.venues} venues</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {showAllVenues && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">All Venues</h2>
                  <Button variant="ghost" onClick={() => setShowAllVenues(false)}>
                    ✕
                  </Button>
                </div>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search venues..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Mock venue list - replace with actual data */}
                  {Array.from({ length: 8 }, (_, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={`/vibrant-sports-arena.png?key=fhpuu&height=80&width=80&query=sports venue ${i + 1}`}
                            alt={`Venue ${i + 1}`}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">Sports Center {i + 1}</h3>
                            <p className="text-sm text-muted-foreground mb-2">Multiple Sports</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current text-yellow-500" />
                                <span className="text-sm">4.{8 - (i % 3)}</span>
                              </div>
                              <span className="text-sm font-medium">$25/hr</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hours Played</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+8 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Favorite Sport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Tennis</div>
              <p className="text-xs text-muted-foreground">65% of bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Game</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">3:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Activity</CardTitle>
                <CardDescription>Your booking trends over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bookings: {
                      label: "Bookings",
                      color: "hsl(var(--primary))",
                    },
                    hours: {
                      label: "Hours",
                      color: "hsl(var(--secondary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={bookingTrends}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="bookings"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="hsl(var(--secondary))"
                        fill="hsl(var(--secondary))"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your scheduled games and court reservations</CardDescription>
                </div>
                <Link href="/venues">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Book Court
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      sport: "Tennis",
                      venue: "Elite Tennis Center",
                      date: "Today",
                      time: "3:00 PM - 4:00 PM",
                      court: "Court 2",
                      status: "confirmed",
                      reference: "QC123456",
                    },
                    {
                      sport: "Basketball",
                      venue: "Victory Basketball Arena",
                      date: "Tomorrow",
                      time: "7:00 PM - 8:30 PM",
                      court: "Full Court",
                      status: "confirmed",
                      reference: "QC123457",
                    },
                    {
                      sport: "Badminton",
                      venue: "Champions Badminton Club",
                      date: "Friday",
                      time: "6:00 PM - 7:00 PM",
                      court: "Court 1",
                      status: "pending",
                      reference: "QC123458",
                    },
                  ].map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {booking.sport} - {booking.court}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {booking.venue}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.date} • {booking.time}
                          </p>
                          <p className="text-xs text-muted-foreground">Ref: {booking.reference}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                        <div className="mt-2">
                          <Link href="/profile/bookings">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Manage
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest bookings and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Completed game",
                      venue: "Elite Tennis Center",
                      time: "2 hours ago",
                      rating: 5,
                    },
                    {
                      action: "Left review",
                      venue: "Victory Basketball Arena",
                      time: "1 day ago",
                      rating: 4,
                    },
                    {
                      action: "Booked court",
                      venue: "Champions Badminton Club",
                      time: "2 days ago",
                      rating: null,
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.venue}</p>
                      </div>
                      <div className="text-right">
                        {activity.rating && (
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            <span className="text-sm">{activity.rating}</span>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sport Preferences</CardTitle>
                <CardDescription>Your booking distribution by sport</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bookings: {
                      label: "Bookings",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sportDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="bookings"
                        nameKey="label"
                      >
                        {sportDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {sportDistribution.map((sport, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sport.color }} />
                        <span>{sport.sport}</span>
                      </div>
                      <span className="font-medium">{sport.bookings} bookings</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending</CardTitle>
                <CardDescription>Your court booking expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount ($)",
                      color: "hsl(var(--secondary))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/venues">
                  <Button className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Court
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/profile/bookings">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <History className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Favorite Venues */}
            <Card>
              <CardHeader>
                <CardTitle>Favorite Venues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Elite Tennis Center", rating: 4.9, bookings: 12 },
                    { name: "Victory Basketball Arena", rating: 4.8, bookings: 8 },
                    { name: "Champions Badminton Club", rating: 4.7, bookings: 4 },
                  ].map((venue, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{venue.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span className="text-xs text-muted-foreground">{venue.rating}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {venue.bookings} visits
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

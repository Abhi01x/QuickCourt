"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Star,
  Building2,
  Target,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

export default function OwnerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedVenue, setSelectedVenue] = useState("all")

  const revenueData = [
    { month: "Jan", revenue: 18500, bookings: 145 },
    { month: "Feb", revenue: 22100, bookings: 167 },
    { month: "Mar", revenue: 19800, bookings: 156 },
    { month: "Apr", revenue: 24750, bookings: 187 },
    { month: "May", revenue: 26300, bookings: 198 },
    { month: "Jun", revenue: 28900, bookings: 215 },
  ]

  const occupancyData = [
    { day: "Mon", occupancy: 65 },
    { day: "Tue", occupancy: 72 },
    { day: "Wed", occupancy: 78 },
    { day: "Thu", occupancy: 85 },
    { day: "Fri", occupancy: 92 },
    { day: "Sat", occupancy: 95 },
    { day: "Sun", occupancy: 88 },
  ]

  const hourlyBookings = [
    { hour: "6AM", bookings: 12 },
    { hour: "8AM", bookings: 24 },
    { hour: "10AM", bookings: 18 },
    { hour: "12PM", bookings: 32 },
    { hour: "2PM", bookings: 28 },
    { hour: "4PM", bookings: 45 },
    { hour: "6PM", bookings: 52 },
    { hour: "8PM", bookings: 38 },
    { hour: "10PM", bookings: 15 },
  ]

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 24750,
      previous: 22100,
      change: 12,
    },
    bookings: {
      current: 387,
      previous: 342,
      change: 13,
    },
    occupancy: {
      current: 78,
      previous: 72,
      change: 8,
    },
    customers: {
      current: 156,
      previous: 134,
      change: 16,
    },
  }

  const venuePerformance = [
    {
      name: "Elite Tennis Center",
      revenue: 12500,
      bookings: 187,
      occupancy: 85,
      rating: 4.9,
      change: 15,
    },
    {
      name: "Downtown Sports Complex",
      revenue: 18900,
      bookings: 245,
      occupancy: 72,
      rating: 4.7,
      change: 8,
    },
    {
      name: "Westside Athletic Hub",
      revenue: 0,
      bookings: 0,
      occupancy: 0,
      rating: 4.6,
      change: -100,
    },
  ]

  const topCustomers = [
    { name: "John Doe", bookings: 12, revenue: 540, sport: "Tennis" },
    { name: "Mike Chen", bookings: 8, revenue: 420, sport: "Basketball" },
    { name: "Emily Davis", bookings: 10, revenue: 380, sport: "Tennis" },
    { name: "Sarah Johnson", bookings: 6, revenue: 270, sport: "Badminton" },
    { name: "Alex Wilson", bookings: 7, revenue: 315, sport: "Volleyball" },
  ]

  const formatChange = (change: number) => {
    const isPositive = change > 0
    return (
      <span className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(change)}%
      </span>
    )
  }

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
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
              <p className="text-muted-foreground">Track performance across all your venues</p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Venues</SelectItem>
                  <SelectItem value="elite">Elite Tennis Center</SelectItem>
                  <SelectItem value="downtown">Downtown Sports Complex</SelectItem>
                  <SelectItem value="westside">Westside Athletic Hub</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  ${analyticsData.revenue.current.toLocaleString()}
                </div>
                {formatChange(analyticsData.revenue.change)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.bookings.current}</div>
                {formatChange(analyticsData.bookings.change)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Occupancy Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.occupancy.current}%</div>
                {formatChange(analyticsData.occupancy.change)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Active Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.customers.current}</div>
                {formatChange(analyticsData.customers.change)}
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Revenue & Booking Trends</CardTitle>
              <CardDescription>Track your performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue ($)",
                    color: "hsl(var(--secondary))",
                  },
                  bookings: {
                    label: "Bookings",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--secondary))" }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bookings"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Analytics Tabs */}
          <Tabs defaultValue="venues" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="venues">Venue Performance</TabsTrigger>
              <TabsTrigger value="customers">Top Customers</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="venues" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Venue Performance</CardTitle>
                  <CardDescription>Compare performance across all your venues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {venuePerformance.map((venue, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{venue.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{venue.bookings} bookings</span>
                              <span>{venue.occupancy}% occupancy</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current text-yellow-500" />
                                <span>{venue.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-secondary">${venue.revenue.toLocaleString()}</p>
                          {formatChange(venue.change)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>Your most valuable customers this period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCustomers.map((customer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{customer.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {customer.bookings} bookings • Prefers {customer.sport}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-secondary">${customer.revenue}</p>
                          <p className="text-sm text-muted-foreground">Total spent</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Peak Hours</CardTitle>
                    <CardDescription>Booking patterns throughout the day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        bookings: {
                          label: "Bookings",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourlyBookings}>
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Occupancy</CardTitle>
                    <CardDescription>Court utilization by day of week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        occupancy: {
                          label: "Occupancy (%)",
                          color: "hsl(var(--secondary))",
                        },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={occupancyData}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="occupancy"
                            stroke="hsl(var(--secondary))"
                            fill="hsl(var(--secondary))"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                    <CardDescription>Revenue breakdown for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gross Revenue</span>
                        <span className="font-medium">$24,750</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform Fees</span>
                        <span className="font-medium">-$1,238</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Fees</span>
                        <span className="font-medium">-$495</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Refunds</span>
                        <span className="font-medium">-$180</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Net Revenue</span>
                          <span className="text-secondary">$22,837</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Export Reports</CardTitle>
                    <CardDescription>Download detailed reports for your records</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Booking Report (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Revenue Report (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Customer Report (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Star className="w-4 h-4 mr-2" />
                      Reviews Report (PDF)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

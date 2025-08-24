"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  Building2,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle,
  Eye,
  Settings,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const platformGrowth = [
    { month: "Jan", users: 2100, venues: 120, bookings: 6800 },
    { month: "Feb", users: 2250, venues: 128, bookings: 7200 },
    { month: "Mar", users: 2400, venues: 135, bookings: 7800 },
    { month: "Apr", users: 2580, venues: 142, bookings: 8200 },
    { month: "May", users: 2720, venues: 148, bookings: 8600 },
    { month: "Jun", users: 2847, venues: 156, bookings: 8934 },
  ]

  const revenueBreakdown = [
    { category: "Platform Fees", amount: 11738, percentage: 85 },
    { category: "Premium Features", amount: 1560, percentage: 11 },
    { category: "Advertising", amount: 520, percentage: 4 },
  ]

  // Mock admin data
  const platformStats = {
    totalUsers: 2847,
    activeUsers: 1923,
    totalVenues: 156,
    pendingVenues: 12,
    totalBookings: 8934,
    totalRevenue: 234750,
    platformFees: 11738,
    disputes: 3,
  }

  const recentActivity = [
    {
      type: "venue_approval",
      message: "New venue 'Elite Sports Center' submitted for approval",
      time: "2 hours ago",
      status: "pending",
    },
    {
      type: "dispute",
      message: "Booking dispute reported by John Doe",
      time: "4 hours ago",
      status: "urgent",
    },
    {
      type: "user_signup",
      message: "15 new users registered today",
      time: "6 hours ago",
      status: "info",
    },
    {
      type: "payment",
      message: "Payment issue reported for booking #BK-2024-001",
      time: "8 hours ago",
      status: "warning",
    },
  ]

  const pendingApprovals = [
    {
      id: "VN-001",
      name: "Elite Sports Center",
      owner: "Mike Johnson",
      type: "Tennis & Basketball",
      submitted: "2024-01-15",
      status: "pending",
    },
    {
      id: "VN-002",
      name: "Downtown Athletic Hub",
      owner: "Sarah Chen",
      type: "Multi-sport",
      submitted: "2024-01-14",
      status: "under_review",
    },
    {
      id: "VN-003",
      name: "Westside Courts",
      owner: "Alex Wilson",
      type: "Tennis",
      submitted: "2024-01-13",
      status: "pending",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "warning":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "under_review":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
            <Badge className="bg-red-100 text-red-800 border-red-200">Admin</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Platform overview and management</p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/users">
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/venues">
                <Button variant="outline">
                  <Building2 className="w-4 h-4 mr-2" />
                  Manage Venues
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">{platformStats.activeUsers.toLocaleString()} active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Total Venues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformStats.totalVenues}</div>
                <p className="text-sm text-muted-foreground">{platformStats.pendingVenues} pending approval</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Platform Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">${platformStats.platformFees.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  From ${platformStats.totalRevenue.toLocaleString()} total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Active Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{platformStats.disputes}</div>
                <p className="text-sm text-muted-foreground">Disputes & reports</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Track user, venue, and booking growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "hsl(var(--primary))",
                  },
                  venues: {
                    label: "Venues",
                    color: "hsl(var(--secondary))",
                  },
                  bookings: {
                    label: "Bookings",
                    color: "#10b981",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={platformGrowth}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="users"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="venues"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--secondary))" }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bookings"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/admin/venues">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Building2 className="w-4 h-4 mr-2" />
                        Review Venue Applications ({platformStats.pendingVenues})
                      </Button>
                    </Link>
                    <Link href="/admin/disputes">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Handle Disputes ({platformStats.disputes})
                      </Button>
                    </Link>
                    <Link href="/admin/users">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Users className="w-4 h-4 mr-2" />
                        Manage Users
                      </Button>
                    </Link>
                    <Link href="/admin/analytics">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Platform performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment Processing</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Normal
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        245ms
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="approvals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Venue Approvals</CardTitle>
                  <CardDescription>Venues waiting for admin review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((venue, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{venue.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Owner: {venue.owner} • {venue.type}
                            </p>
                            <p className="text-xs text-muted-foreground">Submitted: {venue.submitted}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(venue.status)}>{venue.status.replace("_", " ")}</Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform events and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === "venue_approval" && <Building2 className="w-4 h-4 text-primary" />}
                          {activity.type === "dispute" && <AlertTriangle className="w-4 h-4 text-red-600" />}
                          {activity.type === "user_signup" && <Users className="w-4 h-4 text-blue-600" />}
                          {activity.type === "payment" && <DollarSign className="w-4 h-4 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>Platform revenue sources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        amount: {
                          label: "Amount ($)",
                          color: "hsl(var(--secondary))",
                        },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueBreakdown} layout="horizontal">
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" width={100} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="amount" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Venues</CardTitle>
                    <CardDescription>Highest revenue generating venues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Elite Tennis Center", revenue: 12500, bookings: 187 },
                        { name: "Downtown Sports Complex", revenue: 18900, bookings: 245 },
                        { name: "Westside Athletic Hub", revenue: 8750, bookings: 134 },
                        { name: "Central Court Club", revenue: 6200, bookings: 98 },
                      ].map((venue, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{venue.name}</p>
                            <p className="text-xs text-muted-foreground">{venue.bookings} bookings</p>
                          </div>
                          <p className="font-bold text-secondary">${venue.revenue.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
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


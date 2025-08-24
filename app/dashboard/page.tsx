"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  Building2,
  AlertTriangle,
  DollarSign,
  CheckCircle,
  Eye,
  BarChart3,
  Loader2,
  LogOut,
  Search,
  TrendingUp,
  Calendar,
  Ban,
  UserCheck,
  Trophy,
  User,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("authToken")
        if (!token) {
          router.push("/auth/login")
          return
        }

        const response = await fetch("/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch admin data")
        }

        const data = await response.json()

        // Check if user is admin
        if (data.role !== "admin") {
          router.push("/dashboard")
          return
        }

        setAdminData({
          name: data.name || "Admin",
          email: data.email || "",
          id: data.id || "",
          role: data.role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name || data.email || Math.random()}`,
        })

        localStorage.setItem("userData", JSON.stringify(data))
      } catch (error) {
        console.error("Error fetching admin data:", error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const platformGrowth = [
    { month: "Jan", users: 2100, venues: 120, bookings: 6800, revenue: 18500 },
    { month: "Feb", users: 2250, venues: 128, bookings: 7200, revenue: 21200 },
    { month: "Mar", users: 2400, venues: 135, bookings: 7800, revenue: 24800 },
    { month: "Apr", users: 2580, venues: 142, bookings: 8200, revenue: 28200 },
    { month: "May", users: 2720, venues: 148, bookings: 8600, revenue: 31600 },
    { month: "Jun", users: 2847, venues: 156, bookings: 8934, revenue: 34750 },
  ]

  const sportsData = [
    { name: "Tennis", value: 35, color: "#3b82f6" },
    { name: "Basketball", value: 28, color: "#f59e0b" },
    { name: "Badminton", value: 22, color: "#10b981" },
    { name: "Football", value: 15, color: "#ef4444" },
  ]

  const platformStats = {
    totalUsers: 2847,
    activeUsers: 1923,
    totalVenues: 156,
    pendingVenues: 12,
    totalBookings: 8934,
    totalRevenue: 234750,
    platformFees: 34750,
    disputes: 3,
    facilityOwners: 89,
    activeCourts: 324,
  }

  const pendingFacilities = [
    {
      id: "FAC-001",
      name: "Elite Sports Center",
      owner: "Mike Johnson",
      type: "Tennis & Basketball",
      submitted: "2024-01-15",
      status: "pending",
      location: "Downtown",
      courts: 6,
    },
    {
      id: "FAC-002",
      name: "Downtown Athletic Hub",
      owner: "Sarah Chen",
      type: "Multi-sport",
      submitted: "2024-01-14",
      status: "under_review",
      location: "City Center",
      courts: 8,
    },
    {
      id: "FAC-003",
      name: "Westside Courts",
      owner: "Alex Wilson",
      type: "Tennis",
      submitted: "2024-01-13",
      status: "pending",
      location: "Westside",
      courts: 4,
    },
  ]

  const recentUsers = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-20",
      bookings: 12,
    },
    {
      id: "USR-002",
      name: "Emma Davis",
      email: "emma@example.com",
      role: "owner",
      status: "active",
      joinDate: "2024-01-19",
      bookings: 0,
    },
    {
      id: "USR-003",
      name: "Robert Wilson",
      email: "robert@example.com",
      role: "user",
      status: "banned",
      joinDate: "2024-01-18",
      bookings: 5,
    },
  ]

  const reports = [
    {
      id: "RPT-001",
      type: "facility",
      title: "Inappropriate facility photos",
      reporter: "Jane Doe",
      facility: "Downtown Courts",
      status: "pending",
      priority: "medium",
      date: "2024-01-20",
    },
    {
      id: "RPT-002",
      type: "user",
      title: "Harassment in booking chat",
      reporter: "Mike Johnson",
      user: "BadUser123",
      status: "investigating",
      priority: "high",
      date: "2024-01-19",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "urgent":
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "active":
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "banned":
        return "bg-red-100 text-red-800 border-red-200"
      case "under_review":
      case "investigating":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              QuickCourt
            </span>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg">
              Admin Panel
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            {adminData && (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{adminData.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <Avatar className="w-10 h-10 ring-2 ring-red-100">
                  <AvatarImage src={adminData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                    {adminData.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600">Platform overview and management center</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg">
                <Building2 className="w-4 h-4 mr-2" />
                Manage Venues
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</div>
                <p className="text-sm text-green-600 font-medium">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  {platformStats.activeUsers.toLocaleString()} active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Facility Owners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{platformStats.facilityOwners}</div>
                <p className="text-sm text-orange-600 font-medium">{platformStats.pendingVenues} pending approval</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{platformStats.totalBookings.toLocaleString()}</div>
                <p className="text-sm text-blue-600 font-medium">{platformStats.activeCourts} active courts</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Platform Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">${platformStats.platformFees.toLocaleString()}</div>
                <p className="text-sm text-gray-600 font-medium">
                  From ${platformStats.totalRevenue.toLocaleString()} total
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Booking Activity Over Time
                </CardTitle>
                <CardDescription>Track platform growth and user engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bookings: { label: "Bookings", color: "#3b82f6" },
                    revenue: { label: "Revenue ($)", color: "#10b981" },
                  }}
                  className="h-[300px]"
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
                        dataKey="bookings"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange-600" />
                  Most Active Sports
                </CardTitle>
                <CardDescription>Popular sports by booking volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Bookings (%)", color: "#3b82f6" },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sportsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sportsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {sportsData.map((sport, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sport.color }}></div>
                        <span>{sport.name}</span>
                      </div>
                      <span className="font-medium">{sport.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="facilities" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="facilities">Facility Approval</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="reports">Reports & Moderation</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="facilities" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        Facility Approval Page
                      </CardTitle>
                      <CardDescription>Review and approve pending facility registrations</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search facilities..." className="pl-10 w-64" />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="under_review">Under Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingFacilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-6 border rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{facility.name}</h4>
                            <p className="text-gray-600 mb-1">
                              Owner: <span className="font-medium">{facility.owner}</span> • {facility.type}
                            </p>
                            <p className="text-sm text-gray-500">
                              📍 {facility.location} • {facility.courts} courts • Submitted: {facility.submitted}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(facility.status)}>{facility.status.replace("_", " ")}</Badge>
                          <Button size="sm" variant="outline" className="hover:bg-blue-50 bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            Review Details
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-600" />
                        User Management Page
                      </CardTitle>
                      <CardDescription>Manage all users and facility owners</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search users..." className="pl-10 w-64" />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="user">Users</SelectItem>
                          <SelectItem value="owner">Owners</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-6 border rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 ring-2 ring-gray-200">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{user.name}</h4>
                            <p className="text-gray-600 mb-1">{user.email}</p>
                            <p className="text-sm text-gray-500">
                              Joined: {user.joinDate} • {user.bookings} bookings
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(user.role)}>{user.role}</Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          <Button size="sm" variant="outline" className="hover:bg-blue-50 bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View History
                          </Button>
                          {user.status === "active" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 hover:text-red-600 bg-transparent"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Ban User
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-green-50 hover:text-green-600 bg-transparent"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Unban User
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Reports & Moderation Page
                      </CardTitle>
                      <CardDescription>Handle user reports and moderate content</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Reports</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-6 border rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{report.title}</h4>
                            <p className="text-gray-600 mb-1">
                              Reporter: <span className="font-medium">{report.reporter}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Target: {report.facility || report.user} • {report.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(report.priority)}>{report.priority} priority</Badge>
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          <Button size="sm" variant="outline" className="hover:bg-blue-50 bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            Investigate
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      User Registration Trends
                    </CardTitle>
                    <CardDescription>Monthly user growth analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        users: { label: "New Users", color: "#3b82f6" },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={platformGrowth}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Earnings Simulation Chart
                    </CardTitle>
                    <CardDescription>Revenue projection and growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        revenue: { label: "Revenue ($)", color: "#10b981" },
                      }}
                      className="h-[250px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={platformGrowth}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Admin Profile
                  </CardTitle>
                  <CardDescription>Manage your administrator account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20 ring-4 ring-purple-100">
                      <AvatarImage src={adminData?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                        {adminData?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{adminData?.name || "Admin"}</h3>
                      <p className="text-gray-600">{adminData?.email}</p>
                      <Badge className="mt-2 bg-gradient-to-r from-red-500 to-orange-500 text-white">
                        Administrator
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <Input defaultValue={adminData?.name || ""} className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input defaultValue={adminData?.email || ""} className="mt-1" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <Input placeholder="Enter phone number" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <Input defaultValue="Platform Administration" className="mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Update Profile
                    </Button>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  ArrowLeft,
  Search,
  Users,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  // Mock user data
  const users = [
    {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      bookings: 12,
      totalSpent: 540,
    },
    {
      id: "USR-002",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 234-5678",
      role: "facility_owner",
      status: "active",
      joinDate: "2023-12-10",
      lastActive: "1 day ago",
      bookings: 0,
      totalSpent: 0,
      venues: 2,
    },
    {
      id: "USR-003",
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 345-6789",
      role: "user",
      status: "suspended",
      joinDate: "2024-01-08",
      lastActive: "1 week ago",
      bookings: 3,
      totalSpent: 180,
    },
    {
      id: "USR-004",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 456-7890",
      role: "facility_owner",
      status: "pending",
      joinDate: "2024-01-20",
      lastActive: "3 hours ago",
      bookings: 0,
      totalSpent: 0,
      venues: 1,
    },
    {
      id: "USR-005",
      name: "Alex Wilson",
      email: "alex.wilson@email.com",
      phone: "+1 (555) 567-8901",
      role: "user",
      status: "active",
      joinDate: "2023-11-22",
      lastActive: "5 minutes ago",
      bookings: 28,
      totalSpent: 1260,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "facility_owner":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "user":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
            <Badge className="bg-red-100 text-red-800 border-red-200">Admin</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">User Management</h1>
              <p className="text-muted-foreground">Manage platform users and their accounts</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Export Users
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="facility_owner">Facility Owners</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <Badge className={getRoleColor(user.role)}>{user.role.replace("_", " ")}</Badge>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Joined {user.joinDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>Last active: {user.lastActive}</span>
                          {user.role === "user" && (
                            <>
                              <span>{user.bookings} bookings</span>
                              <span>${user.totalSpent} spent</span>
                            </>
                          )}
                          {user.role === "facility_owner" && user.venues && <span>{user.venues} venues</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {user.status === "active" ? (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Ban className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                      ) : user.status === "suspended" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 bg-transparent"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Activate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 bg-transparent"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

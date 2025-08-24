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
  Building2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Star,
  DollarSign,
} from "lucide-react"

export default function AdminVenuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock venue data
  const venues = [
    {
      id: "VN-001",
      name: "Elite Tennis Center",
      owner: "Mike Johnson",
      location: "Downtown, NY",
      sports: ["Tennis", "Squash"],
      status: "pending",
      submitted: "2024-01-15",
      courts: 6,
      rating: 0,
      bookings: 0,
      revenue: 0,
    },
    {
      id: "VN-002",
      name: "Downtown Sports Complex",
      owner: "Sarah Chen",
      location: "Midtown, NY",
      sports: ["Basketball", "Volleyball", "Tennis"],
      status: "approved",
      submitted: "2023-12-10",
      courts: 12,
      rating: 4.7,
      bookings: 245,
      revenue: 18900,
    },
    {
      id: "VN-003",
      name: "Westside Athletic Hub",
      owner: "Alex Wilson",
      location: "West Side, NY",
      sports: ["Tennis", "Badminton"],
      status: "under_review",
      submitted: "2024-01-13",
      courts: 8,
      rating: 0,
      bookings: 0,
      revenue: 0,
    },
    {
      id: "VN-004",
      name: "Central Court Club",
      owner: "Emily Davis",
      location: "Central Park, NY",
      sports: ["Tennis"],
      status: "rejected",
      submitted: "2024-01-08",
      courts: 4,
      rating: 0,
      bookings: 0,
      revenue: 0,
    },
    {
      id: "VN-005",
      name: "Brooklyn Sports Arena",
      owner: "David Kim",
      location: "Brooklyn, NY",
      sports: ["Basketball", "Volleyball"],
      status: "approved",
      submitted: "2023-11-20",
      courts: 10,
      rating: 4.9,
      bookings: 187,
      revenue: 12500,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || venue.status === statusFilter
    return matchesSearch && matchesStatus
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
              <h1 className="text-3xl font-bold mb-2">Venue Management</h1>
              <p className="text-muted-foreground">Review and manage venue applications</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Building2 className="w-4 h-4 mr-2" />
                Export Venues
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
                      placeholder="Search venues by name, owner, or location..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Venues List */}
          <Card>
            <CardHeader>
              <CardTitle>Venues ({filteredVenues.length})</CardTitle>
              <CardDescription>Review venue applications and manage approved venues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVenues.map((venue, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{venue.name}</h4>
                          <Badge className={getStatusColor(venue.status)}>{venue.status.replace("_", " ")}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Owner: {venue.owner}</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{venue.location}</span>
                          </div>
                          <span>{venue.courts} courts</span>
                          <span>{venue.sports.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Submitted: {venue.submitted}</span>
                          </div>
                          {venue.status === "approved" && (
                            <>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                <span>{venue.rating} rating</span>
                              </div>
                              <span>{venue.bookings} bookings</span>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                <span>${venue.revenue} revenue</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                      {venue.status === "pending" || venue.status === "under_review" ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700 bg-transparent"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      ) : venue.status === "approved" ? (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <XCircle className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 bg-transparent"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Reactivate
                        </Button>
                      )}
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

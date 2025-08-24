"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Trophy,
  ArrowLeft,
  Building2,
  Plus,
  Search,
  Star,
  MapPin,
  Clock,
  Users,
  Edit,
  Eye,
  Camera,
  Wifi,
  Car,
  ShowerHead,
} from "lucide-react"

// Mock venue data for facility owner
const venues = [
  {
    id: 1,
    name: "Elite Tennis Center",
    location: "Downtown Sports Complex, 123 Main St",
    image: "/placeholder.svg?height=200&width=300",
    courts: 8,
    sports: ["Tennis", "Pickleball"],
    rating: 4.9,
    reviewCount: 156,
    status: "active",
    occupancyRate: 85,
    monthlyRevenue: 12500,
    amenities: ["Indoor Courts", "Pro Shop", "Parking", "WiFi", "Locker Rooms"],
    openHours: "6:00 AM - 11:00 PM",
    priceRange: "$35-65",
  },
  {
    id: 2,
    name: "Downtown Sports Complex",
    location: "Central District, 456 Oak Ave",
    image: "/placeholder.svg?height=200&width=300",
    courts: 15,
    sports: ["Basketball", "Volleyball", "Badminton"],
    rating: 4.7,
    reviewCount: 203,
    status: "active",
    occupancyRate: 72,
    monthlyRevenue: 18900,
    amenities: ["Multiple Courts", "Sound System", "Parking", "Concessions", "Showers"],
    openHours: "7:00 AM - 10:00 PM",
    priceRange: "$25-80",
  },
  {
    id: 3,
    name: "Westside Athletic Hub",
    location: "West End, 789 Pine St",
    image: "/placeholder.svg?height=200&width=300",
    courts: 6,
    sports: ["Squash", "Racquetball"],
    rating: 4.6,
    reviewCount: 89,
    status: "maintenance",
    occupancyRate: 0,
    monthlyRevenue: 0,
    amenities: ["Glass Courts", "Viewing Area", "Pro Shop", "Parking"],
    openHours: "Temporarily Closed",
    priceRange: "$30-50",
  },
]

export default function OwnerVenuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null)

  const filteredVenues = venues.filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "maintenance":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-3 h-3" />
      case "parking":
        return <Car className="w-3 h-3" />
      case "locker rooms":
      case "showers":
        return <ShowerHead className="w-3 h-3" />
      default:
        return <Users className="w-3 h-3" />
    }
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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Venues</h1>
            <p className="text-muted-foreground">Manage your sports facilities and courts</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Venue
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Venues Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img src={venue.image || "/placeholder.svg"} alt={venue.name} className="w-full h-full object-cover" />
                <Badge className={`absolute top-3 right-3 bg-background/90`} variant={getStatusColor(venue.status)}>
                  {venue.status}
                </Badge>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-3 right-3 w-8 h-8 bg-background/80 hover:bg-background/90"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{venue.name}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium">{venue.rating}</span>
                  </div>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{venue.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {venue.sports.map((sport) => (
                      <Badge key={sport} variant="secondary" className="text-xs">
                        {sport}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Courts</p>
                      <p className="font-medium">{venue.courts}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reviews</p>
                      <p className="font-medium">{venue.reviewCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occupancy</p>
                      <p className="font-medium">{venue.occupancyRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Revenue</p>
                      <p className="font-medium text-secondary">${venue.monthlyRevenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{venue.openHours}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.slice(0, 3).map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                    {venue.amenities.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{venue.amenities.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/owner/venues/${venue.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/owner/venues/${venue.id}/edit`} className="flex-1">
                      <Button className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No venues found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search criteria." : "You haven't added any venues yet."}
              </p>
              {!searchQuery && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Venue
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

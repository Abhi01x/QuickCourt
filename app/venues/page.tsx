"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Search,
  MapPin,
  Star,
  Clock,
  Users,
  Wifi,
  Car,
  ShowerHead,
  Coffee,
  Filter,
  Grid3X3,
  List,
} from "lucide-react"

// Mock venue data
const venues = [
  {
    id: 1,
    name: "Elite Tennis Center",
    location: "Downtown Sports Complex, 123 Main St",
    rating: 4.9,
    reviewCount: 156,
    priceRange: "$35-65",
    image: "/placeholder.svg?height=300&width=400",
    sports: ["Tennis", "Pickleball"],
    amenities: ["Indoor Courts", "Pro Shop", "Parking", "WiFi", "Locker Rooms"],
    openHours: "6:00 AM - 11:00 PM",
    courts: 8,
    featured: true,
  },
  {
    id: 2,
    name: "Victory Basketball Arena",
    location: "Westside Athletic Hub, 456 Oak Ave",
    rating: 4.8,
    reviewCount: 203,
    priceRange: "$45-80",
    image: "/placeholder.svg?height=300&width=400",
    sports: ["Basketball", "Volleyball"],
    amenities: ["Full Court", "Sound System", "Locker Rooms", "Parking", "Concessions"],
    openHours: "7:00 AM - 10:00 PM",
    courts: 3,
    featured: true,
  },
  {
    id: 3,
    name: "Champions Badminton Club",
    location: "Central Recreation Center, 789 Pine St",
    rating: 4.7,
    reviewCount: 89,
    priceRange: "$25-45",
    image: "/placeholder.svg?height=300&width=400",
    sports: ["Badminton"],
    amenities: ["Multiple Courts", "Equipment Rental", "Coaching", "WiFi", "Showers"],
    openHours: "6:00 AM - 10:00 PM",
    courts: 12,
    featured: false,
  },
  {
    id: 4,
    name: "Ace Squash Complex",
    location: "North Sports District, 321 Elm St",
    rating: 4.6,
    reviewCount: 67,
    priceRange: "$30-50",
    image: "/placeholder.svg?height=300&width=400",
    sports: ["Squash", "Racquetball"],
    amenities: ["Glass Courts", "Viewing Area", "Pro Shop", "Parking", "Café"],
    openHours: "6:30 AM - 9:30 PM",
    courts: 6,
    featured: false,
  },
  {
    id: 5,
    name: "Premier Volleyball Center",
    location: "South Athletic Complex, 654 Maple Dr",
    rating: 4.5,
    reviewCount: 124,
    priceRange: "$40-70",
    image: "/placeholder.svg?height=300&width=400",
    sports: ["Volleyball", "Beach Volleyball"],
    amenities: ["Sand Courts", "Indoor Courts", "Tournament Hosting", "Parking", "Showers"],
    openHours: "7:00 AM - 11:00 PM",
    courts: 10,
    featured: false,
  },
  {
    id: 6,
    name: "Urban Futsal Arena",
    location: "East Sports Hub, 987 Cedar Blvd",
    rating: 4.4,
    reviewCount: 91,
    priceRange: "$50-90",
    image: "/placeholder.svg?height=300&width=400",
    sports: ["Futsal", "Indoor Soccer"],
    amenities: ["Artificial Turf", "Scoreboards", "Locker Rooms", "Parking", "Concessions"],
    openHours: "8:00 AM - 10:00 PM",
    courts: 4,
    featured: false,
  },
]

const sports = ["All Sports", "Tennis", "Basketball", "Badminton", "Squash", "Volleyball", "Futsal"]
const priceRanges = ["All Prices", "$0-30", "$30-50", "$50-70", "$70+"]

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("All Sports")
  const [selectedPrice, setSelectedPrice] = useState("All Prices")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === "All Sports" || venue.sports.includes(selectedSport)
    const matchesPrice = selectedPrice === "All Prices" // Simplified price filtering

    return matchesSearch && matchesSport && matchesPrice
  })

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-3 h-3" />
      case "parking":
        return <Car className="w-3 h-3" />
      case "locker rooms":
      case "showers":
        return <ShowerHead className="w-3 h-3" />
      case "café":
      case "concessions":
        return <Coffee className="w-3 h-3" />
      default:
        return <Users className="w-3 h-3" />
    }
  }

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
            <Link href="/venues" className="text-primary font-medium">
              Find Courts
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              List Your Facility
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Sports Facilities</h1>
          <p className="text-muted-foreground">Discover and book premium courts and venues near you</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search venues, locations, or sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* View Toggle and Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">{filteredVenues.length} venues found</p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "" : "bg-transparent"}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "" : "bg-transparent"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Venues */}
        {searchQuery === "" && selectedSport === "All Sports" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Venues</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {venues
                .filter((v) => v.featured)
                .map((venue) => (
                  <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <img
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">Featured</Badge>
                      <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {venue.rating}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {venue.name}
                        <span className="text-lg font-bold text-primary">{venue.priceRange}/hr</span>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {venue.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {venue.sports.map((sport) => (
                          <Badge key={sport} variant="secondary">
                            {sport}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {venue.openHours}
                        </span>
                        <span>{venue.courts} courts</span>
                      </div>
                      <Link href={`/venues/${venue.id}`}>
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Venues */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {searchQuery || selectedSport !== "All Sports" ? "Search Results" : "All Venues"}
          </h2>

          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={venue.image || "/placeholder.svg"}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {venue.rating}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{venue.name}</span>
                      <span className="text-sm font-bold text-primary whitespace-nowrap ml-2">
                        {venue.priceRange}/hr
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{venue.location}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {venue.sports.slice(0, 2).map((sport) => (
                        <Badge key={sport} variant="secondary" className="text-xs">
                          {sport}
                        </Badge>
                      ))}
                      {venue.sports.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{venue.sports.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{venue.courts} courts</span>
                      <span>•</span>
                      <span>{venue.reviewCount} reviews</span>
                    </div>
                    <Link href={`/venues/${venue.id}`}>
                      <Button className="w-full" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVenues.map((venue) => (
                <Card key={venue.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={venue.image || "/placeholder.svg"}
                          alt={venue.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{venue.name}</h3>
                            <p className="text-muted-foreground flex items-center gap-1 mb-2">
                              <MapPin className="w-4 h-4" />
                              {venue.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-4 h-4 fill-current text-yellow-500" />
                              <span className="font-medium">{venue.rating}</span>
                              <span className="text-muted-foreground">({venue.reviewCount})</span>
                            </div>
                            <p className="text-lg font-bold text-primary">{venue.priceRange}/hr</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {venue.sports.map((sport) => (
                            <Badge key={sport} variant="secondary">
                              {sport}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {venue.openHours}
                          </span>
                          <span>{venue.courts} courts available</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {venue.amenities.slice(0, 4).map((amenity) => (
                            <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                          {venue.amenities.length > 4 && (
                            <span className="text-xs text-muted-foreground">+{venue.amenities.length - 4} more</span>
                          )}
                        </div>

                        <Link href={`/venues/${venue.id}`}>
                          <Button>View Details & Book</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No venues found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all available venues.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedSport("All Sports")
                setSelectedPrice("All Prices")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  MapPin,
  Star,
  Phone,
  Mail,
  Wifi,
  Car,
  ShowerHead,
  Coffee,
  Users,
  Calendar,
  ArrowLeft,
  Share,
  Heart,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock venue data (in real app, this would come from API)
const venueData = {
  1: {
    id: 1,
    name: "Elite Tennis Center",
    location: "Downtown Sports Complex, 123 Main St, City, State 12345",
    rating: 4.9,
    reviewCount: 156,
    priceRange: "$35-65",
    phone: "(555) 123-4567",
    email: "info@elitetenniscenter.com",
    website: "www.elitetenniscenter.com",
    description:
      "Premier tennis facility featuring 8 indoor courts with professional-grade surfaces. Our center offers a complete tennis experience with pro shop, coaching services, and tournament hosting capabilities.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    sports: ["Tennis", "Pickleball"],
    amenities: [
      { name: "Indoor Courts", icon: "court" },
      { name: "Pro Shop", icon: "shop" },
      { name: "Parking", icon: "car" },
      { name: "WiFi", icon: "wifi" },
      { name: "Locker Rooms", icon: "shower" },
      { name: "Coaching Available", icon: "users" },
      { name: "Tournament Hosting", icon: "trophy" },
      { name: "Equipment Rental", icon: "racket" },
    ],
    openHours: {
      Monday: "6:00 AM - 11:00 PM",
      Tuesday: "6:00 AM - 11:00 PM",
      Wednesday: "6:00 AM - 11:00 PM",
      Thursday: "6:00 AM - 11:00 PM",
      Friday: "6:00 AM - 11:00 PM",
      Saturday: "7:00 AM - 10:00 PM",
      Sunday: "7:00 AM - 10:00 PM",
    },
    courts: [
      { id: 1, name: "Court 1", type: "Hard Court", price: 45, available: true },
      { id: 2, name: "Court 2", type: "Hard Court", price: 45, available: true },
      { id: 3, name: "Court 3", type: "Hard Court", price: 45, available: false },
      { id: 4, name: "Court 4", type: "Clay Court", price: 55, available: true },
      { id: 5, name: "Court 5", type: "Clay Court", price: 55, available: true },
      { id: 6, name: "Court 6", type: "Grass Court", price: 65, available: true },
      { id: 7, name: "Court 7", type: "Pickleball", price: 35, available: true },
      { id: 8, name: "Court 8", type: "Pickleball", price: 35, available: true },
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 days ago",
        comment:
          "Excellent facility with well-maintained courts. The staff is professional and the booking system is seamless. Highly recommend!",
      },
      {
        id: 2,
        user: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 week ago",
        comment:
          "Great courts and amenities. The pro shop has everything you need and the coaching staff is top-notch.",
      },
      {
        id: 3,
        user: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2 weeks ago",
        comment:
          "Love playing here! The clay courts are my favorite. Only minor issue is parking can get busy during peak hours.",
      },
    ],
  },
}

export default function VenueDetailPage() {
  const params = useParams()
  const venueId = Number.parseInt(params.id as string)
  const venue = venueData[venueId as keyof typeof venueData]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Venue Not Found</h1>
          <p className="text-muted-foreground mb-4">The venue you're looking for doesn't exist.</p>
          <Link href="/venues">
            <Button>Browse All Venues</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getAmenityIcon = (iconType: string) => {
    switch (iconType) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "car":
        return <Car className="w-4 h-4" />
      case "shower":
        return <ShowerHead className="w-4 h-4" />
      case "coffee":
        return <Coffee className="w-4 h-4" />
      case "users":
        return <Users className="w-4 h-4" />
      case "trophy":
        return <Trophy className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/venues" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Venues
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsFavorited(!isFavorited)}>
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-current text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={venue.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${venue.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm">
              <Camera className="w-3 h-3 inline mr-1" />
              {currentImageIndex + 1} / {venue.images.length}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {venue.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${venue.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Venue Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4" />
                    {venue.location}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span className="font-medium">{venue.rating}</span>
                      <span className="text-muted-foreground">({venue.reviewCount} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {venue.sports.map((sport) => (
                        <Badge key={sport} variant="secondary">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{venue.priceRange}</p>
                  <p className="text-sm text-muted-foreground">per hour</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courts">Courts</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Venue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{venue.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hours of Operation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(venue.openHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="font-medium">{day}</span>
                          <span className="text-muted-foreground">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{venue.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{venue.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{venue.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courts" className="space-y-4">
                <div className="grid gap-4">
                  {venue.courts.map((court) => (
                    <Card key={court.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{court.name}</h4>
                            <p className="text-sm text-muted-foreground">{court.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">${court.price}/hour</p>
                            <Badge variant={court.available ? "default" : "secondary"}>
                              {court.available ? "Available" : "Booked"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {venue.amenities.map((amenity, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {getAmenityIcon(amenity.icon)}
                          <span className="font-medium">{amenity.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="space-y-6">
                  {venue.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{review.user}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-current text-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Venue</CardTitle>
                <CardDescription>Select your preferred date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/book/${venue.id}`}>
                  <Button className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Check Availability
                  </Button>
                </Link>
                <div className="text-center text-sm text-muted-foreground">
                  <p>Quick booking available</p>
                  <p>Instant confirmation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

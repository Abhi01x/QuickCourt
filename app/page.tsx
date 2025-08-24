import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Star, Calendar, Trophy, Target, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Find Courts
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              List Your Facility
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            <Zap className="w-3 h-3 mr-1" />
            Book Courts Instantly
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Your Game, Your Court, Your Time
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover and book premium sports facilities instantly. From tennis courts to basketball arenas, find the
            perfect venue for your next game with real-time availability and seamless booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                <Target className="w-5 h-5 mr-2" />
                Start Playing Today
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courts */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Courts Near You</h2>
            <p className="text-muted-foreground">Premium facilities ready for your next game</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Elite Tennis Center",
                location: "Downtown Sports Complex",
                rating: 4.9,
                price: "$45/hour",
                image: "/placeholder.svg?height=200&width=300",
                amenities: ["Indoor Courts", "Pro Shop", "Parking"],
              },
              {
                name: "Victory Basketball Arena",
                location: "Westside Athletic Hub",
                rating: 4.8,
                price: "$60/hour",
                image: "/placeholder.svg?height=200&width=300",
                amenities: ["Full Court", "Sound System", "Locker Rooms"],
              },
              {
                name: "Champions Badminton Club",
                location: "Central Recreation Center",
                rating: 4.7,
                price: "$35/hour",
                image: "/placeholder.svg?height=200&width=300",
                amenities: ["Multiple Courts", "Equipment Rental", "Coaching"],
              },
            ].map((court, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={court.image || "/placeholder.svg"}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {court.rating}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {court.name}
                    <span className="text-lg font-bold text-primary">{court.price}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {court.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {court.amenities.map((amenity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose QuickCourt?</h2>
            <p className="text-muted-foreground">Everything you need for seamless sports facility booking</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Real-Time Booking",
                description: "See live availability and book instantly with our smart scheduling system",
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Connect with other players, read reviews, and build your sports network",
              },
              {
                icon: Target,
                title: "Perfect Match",
                description: "Find courts that match your skill level, budget, and preferred playing times",
              },
              {
                icon: Zap,
                title: "Instant Confirmation",
                description: "Get immediate booking confirmation with QR codes and digital receipts",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of athletes who trust QuickCourt for their sports facility needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Create Account
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">QuickCourt</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The premier platform for sports facility booking and community building.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Players</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Find Courts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Book Games
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Join Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Owners</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    List Facility
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 QuickCourt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

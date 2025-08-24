"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, ArrowLeft, Camera, MapPin, Calendar, Star, Award, Target, Edit, Plus } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate tennis player with 10+ years of experience. Love playing competitive matches and meeting new players.",
    dateOfBirth: "1990-05-15",
    emergencyContact: "Jane Doe - (555) 987-6543",
  })

  const [sportsPreferences, setSportsPreferences] = useState([
    { sport: "Tennis", skillLevel: "Advanced", yearsPlaying: 10, favorite: true },
    { sport: "Basketball", skillLevel: "Intermediate", yearsPlaying: 5, favorite: false },
    { sport: "Badminton", skillLevel: "Beginner", yearsPlaying: 1, favorite: false },
  ])

  const handleSave = () => {
    console.log("[v0] Profile updated:", profileData)
    setIsEditing(false)
  }

  const updateProfileData = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuickCourt</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {profileData.firstName} {profileData.lastName}
                      </h1>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profileData.location}
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "default" : "outline"}
                      className={isEditing ? "" : "bg-transparent"}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {sportsPreferences
                      .filter((s) => s.favorite)
                      .map((sport) => (
                        <Badge key={sport.sport} className="bg-primary/10 text-primary border-primary/20">
                          <Trophy className="w-3 h-3 mr-1" />
                          {sport.sport} Player
                        </Badge>
                      ))}
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      Member since 2023
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="sports">Sports & Skills</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => updateProfileData("firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => updateProfileData("lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => updateProfileData("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => updateProfileData("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => updateProfileData("location", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => updateProfileData("dateOfBirth", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => updateProfileData("bio", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => updateProfileData("emergencyContact", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Name - Phone Number"
                    />
                  </div>
                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sports & Skill Levels</CardTitle>
                  <CardDescription>Manage your sports preferences and skill levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sportsPreferences.map((sport, index) => (
                      <div key={sport.sport} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {sport.sport}
                              {sport.favorite && <Star className="w-4 h-4 fill-current text-yellow-500" />}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {sport.skillLevel} • {sport.yearsPlaying} years experience
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              sport.skillLevel === "Advanced"
                                ? "default"
                                : sport.skillLevel === "Intermediate"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {sport.skillLevel}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Sport
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Games</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">127</div>
                    <p className="text-xs text-muted-foreground">+12 this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-xs text-muted-foreground">86 wins, 41 losses</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Hours Played</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">254</div>
                    <p className="text-xs text-muted-foreground">Average 2h per game</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Venues Visited</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">Across 3 cities</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance by Sport</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sport: "Tennis", games: 89, wins: 62, winRate: 70 },
                      { sport: "Basketball", games: 28, wins: 18, winRate: 64 },
                      { sport: "Badminton", games: 10, wins: 6, winRate: 60 },
                    ].map((stat) => (
                      <div key={stat.sport} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{stat.sport}</p>
                          <p className="text-sm text-muted-foreground">{stat.games} games played</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{stat.winRate}%</p>
                          <p className="text-xs text-muted-foreground">
                            {stat.wins}W - {stat.games - stat.wins}L
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Century Club", description: "Played 100+ games", earned: true, date: "Dec 2024" },
                        { title: "Court Explorer", description: "Visited 15+ venues", earned: true, date: "Nov 2024" },
                        {
                          title: "Winning Streak",
                          description: "Won 10 games in a row",
                          earned: true,
                          date: "Oct 2024",
                        },
                        {
                          title: "Marathon Player",
                          description: "Play 500+ hours",
                          earned: false,
                          progress: "254/500",
                        },
                        {
                          title: "Social Butterfly",
                          description: "Play with 50+ different players",
                          earned: false,
                          progress: "32/50",
                        },
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.earned ? "bg-yellow-500/10 text-yellow-500" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Award className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            {achievement.earned ? (
                              <p className="text-xs text-yellow-600">Earned {achievement.date}</p>
                            ) : (
                              <p className="text-xs text-muted-foreground">Progress: {achievement.progress}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Goals & Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { goal: "Improve Tennis Ranking", target: "Reach Advanced+", progress: 75 },
                        { goal: "Play More Regularly", target: "3 games per week", progress: 60 },
                        { goal: "Try New Sports", target: "Add 2 new sports", progress: 50 },
                        { goal: "Tournament Ready", target: "Join local tournament", progress: 25 },
                      ].map((goal, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <p className="font-medium">{goal.goal}</p>
                            <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">{goal.target}</p>
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

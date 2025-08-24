"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Trophy,
  ArrowLeft,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  Trash2,
} from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    bookingConfirmations: true,
    reminders: true,
    promotions: false,
    newVenues: true,
    socialUpdates: false,
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    timezone: "America/New_York",
    currency: "USD",
    distanceUnit: "miles",
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showStats: true,
    showBookingHistory: false,
    allowMessages: true,
  })

  const handleSaveSettings = () => {
    console.log("[v0] Settings saved:", { notifications, preferences, privacy })
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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="booking-confirmations" className="text-base font-medium">
                        Booking Confirmations
                      </Label>
                      <p className="text-sm text-muted-foreground">Get notified when your bookings are confirmed</p>
                    </div>
                    <Switch
                      id="booking-confirmations"
                      checked={notifications.bookingConfirmations}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, bookingConfirmations: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reminders" className="text-base font-medium">
                        Booking Reminders
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive reminders before your games</p>
                    </div>
                    <Switch
                      id="reminders"
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotions" className="text-base font-medium">
                        Promotions & Offers
                      </Label>
                      <p className="text-sm text-muted-foreground">Get notified about special deals and discounts</p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-venues" className="text-base font-medium">
                        New Venues
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Be the first to know about new venues in your area
                      </p>
                    </div>
                    <Switch
                      id="new-venues"
                      checked={notifications.newVenues}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newVenues: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="social-updates" className="text-base font-medium">
                        Social Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Updates from players you follow and community events
                      </p>
                    </div>
                    <Switch
                      id="social-updates"
                      checked={notifications.socialUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, socialUpdates: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Methods</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>Email Notifications</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-muted-foreground" />
                      <span>Push Notifications</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span>SMS Notifications</span>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    App Preferences
                  </CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="w-4 h-4" />
                              Light
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="w-4 h-4" />
                              Dark
                            </div>
                          </SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={preferences.currency}
                        onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="distance">Distance Unit</Label>
                    <Select
                      value={preferences.distanceUnit}
                      onValueChange={(value) => setPreferences({ ...preferences, distanceUnit: value })}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miles">Miles</SelectItem>
                        <SelectItem value="kilometers">Kilometers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control who can see your information and activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="profile-visibility" className="text-base font-medium">
                      Profile Visibility
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">Who can see your profile information</p>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-stats" className="text-base font-medium">
                        Show Statistics
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow others to see your game statistics</p>
                    </div>
                    <Switch
                      id="show-stats"
                      checked={privacy.showStats}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showStats: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-booking-history" className="text-base font-medium">
                        Show Booking History
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow others to see venues you've visited</p>
                    </div>
                    <Switch
                      id="show-booking-history"
                      checked={privacy.showBookingHistory}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showBookingHistory: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-messages" className="text-base font-medium">
                        Allow Messages
                      </Label>
                      <p className="text-sm text-muted-foreground">Let other players send you messages</p>
                    </div>
                    <Switch
                      id="allow-messages"
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Add New Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="billing-email">Billing Email</Label>
                    <Input id="billing-email" value="john.doe@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Input id="billing-address" placeholder="123 Main St, City, State, ZIP" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible actions that will affect your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleSaveSettings} size="lg">
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

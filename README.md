# QuickCourt - Sports Facility Booking Platform

A comprehensive sports facility booking platform that connects players with courts and venues, enabling real-time reservations and community building.

## 🏆 Features

### For Players
- **Real-time Court Booking** - Instant availability and booking confirmation
- **Smart Search & Filters** - Find courts by location, sport, price, and amenities
- **Community Features** - Connect with other players and build your sports network
- **Booking Management** - Track your reservations with status updates
- **Rating System** - Rate and review venues to help other players

### For Venue Owners
- **Facility Management** - List and manage your sports facilities
- **Real-time Analytics** - Track bookings, revenue, and facility utilization
- **Automated Scheduling** - Prevent double bookings with smart conflict resolution
- **Revenue Optimization** - Dynamic pricing and promotional tools

### For Administrators
- **Comprehensive Dashboard** - Global stats, user management, and system monitoring
- **Facility Approval** - Review and approve new venue listings
- **User Moderation** - Manage user accounts, handle reports, and maintain platform quality
- **Analytics & Reports** - Detailed insights into platform performance

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: JWT-based auth with role-based access control
- **API**: RESTful API with Next.js API routes
- **Database**: External API integration with proxy routes
- **Deployment**: Vercel-ready configuration

## 📱 User Roles

### Player Dashboard
- Browse popular venues and sports
- Search and filter available courts
- Make instant bookings with QR code confirmation
- Manage booking history and status

### Owner Dashboard
- Add and manage facilities
- View booking analytics and revenue
- Handle facility scheduling and availability
- Respond to player reviews and feedback

### Admin Dashboard
- System-wide analytics and monitoring
- User and venue management
- Content moderation and reporting
- Platform configuration and settings

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Abhi01x/quickcourt.git
   cd quickcourt
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a `.env.local` file with your API configuration:
   \`\`\`env
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

\`\`\`
quickcourt/
├── app/
│   ├── dashboard/          # User dashboard
│   ├── admin/dashboard/    # Admin panel
│   ├── owner/dashboard/    # Owner dashboard
│   ├── auth/              # Authentication pages
│   ├── venues/            # Venue listings and details
│   ├── book/              # Booking flow
│   └── api/               # API proxy routes
├── components/
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature-specific components
├── lib/
│   ├── api-config.ts      # API configuration
│   └── utils.ts           # Utility functions
└── public/                # Static assets
\`\`\`

## 🔧 API Integration

The platform uses proxy API routes to handle external API communication:

- `/api/auth/me` - User authentication and profile
- `/api/user/popular-venue` - Popular venues data
- `/api/user/popular-sports` - Popular sports data
- `/api/user/get-venue` - Venue listings
- `/api/user/get-venuesearch` - Venue search functionality

## 🎨 Design System

- **Colors**: Professional blue and green palette with neutral grays
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Mobile-first responsive design with consistent spacing
- **Components**: shadcn/ui component library for consistency

## 🚦 Getting Started

1. **Sign Up/Login** - Create your account or login with existing credentials
2. **Choose Your Role** - Player, Owner, or Admin access
3. **Explore Venues** - Browse popular venues and sports in your area
4. **Make a Booking** - Select your preferred court, date, and time
5. **Manage Bookings** - Track your reservations and booking history

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏅 Hackathon Ready

This project is designed for hackathon presentations with:
- **Working MVP** - Core booking functionality implemented
- **Multiple User Roles** - Comprehensive platform for all stakeholders
- **Real-time Features** - Live booking and availability updates
- **Professional UI** - Polished interface ready for demo
- **Scalable Architecture** - Built for growth and expansion

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**QuickCourt** - Making sports facility booking simple, fast, and social! 🏸🏀⚽🎾

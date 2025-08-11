# RailientCRM 🚀

A modern CRM application built with Next.js 15, featuring an enhanced Kanban board for lead management and seamless integration with Supabase PostgreSQL.

## ✨ Key Features

### 🎯 **Primary Achievement: Kanban Board Integration**
- **Drag-and-drop Kanban board** with 5-stage pipeline
- **Dual view system**: Switch between Table and Kanban views for leads
- **Visual feedback** during drag operations with smooth animations
- **Real-time updates** ready for database integration

### 🏗️ **Core CRM Functionality**
- **Interactive Dashboard** with analytics widgets and recent activity
- **Leads Management** with comprehensive table view and Kanban board
- **Responsive Navigation** with sidebar and search functionality
- **User Authentication** with Supabase (bypassed in development)

### 🎨 **Modern Tech Stack**
- **Next.js 15** with App Router
- **Tailwind CSS 4** with custom theme variables
- **shadcn/ui** component library
- **Supabase** for authentication and PostgreSQL database
- **@hello-pangea/dnd** for drag-and-drop functionality
- **TypeScript** for type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for production)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RailientCRM
   ```

2. **Install dependencies**
   ```bash
   cd railientcrm
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   # Add your Supabase credentials (optional for development)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

### 🔧 Development Mode
- **Authentication bypassed** - Direct access to CRM features
- **Mock user session** - Uses `dev@example.com` for testing
- **Visual indicator** - "DEV MODE" badge in header

## 📁 Project Structure

```
railientcrm/
├── src/
│   ├── app/
│   │   ├── auth/login/          # Authentication pages
│   │   ├── crm/
│   │   │   ├── dashboard/       # Analytics dashboard
│   │   │   └── leads/           # Leads management with Kanban
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── crm/                 # CRM-specific components
│   │   │   ├── leads/
│   │   │   │   ├── leads-kanban.tsx  # 🎯 Enhanced Kanban board
│   │   │   │   └── leads-table.tsx   # Table view
│   │   │   ├── sidebar.tsx      # Navigation sidebar
│   │   │   └── header.tsx       # Top header with search
│   │   └── ui/                  # shadcn/ui components
│   └── lib/
│       ├── supabase.ts          # Supabase client config
│       └── utils.ts             # Utility functions
├── components.json              # shadcn/ui configuration
└── package.json
```

## 🎨 UI Components

Built with **shadcn/ui** and **Tailwind CSS 4**:
- ✅ Button, Input, Card, Table, Dialog
- ✅ Form components with validation
- ✅ Badge, Tabs, Label components
- ✅ Responsive design system

## 🗄️ Database Integration

### Supabase PostgreSQL Schema
- **Organizations** - Multi-tenant support
- **Leads** - Lead management with status tracking
- **Accounts** - Company/account management
- **Contacts** - Contact information
- **Pipeline Stages** - Kanban board stages
- **Activities** - Activity tracking

### Row Level Security (RLS)
- Organization-based data isolation
- User permission management
- Secure API endpoints

## 🎯 Kanban Board Features

### 5-Stage Pipeline
1. **New Leads** - Fresh incoming leads
2. **Contacted** - Initial contact made
3. **Qualified** - Qualified prospects
4. **Proposal Sent** - Proposals submitted
5. **Closed Won** - Successfully closed deals

### Interactive Features
- **Drag & Drop** - Move leads between stages
- **Visual Feedback** - Smooth animations and hover effects
- **Lead Cards** - Display name, company, email, phone, value
- **Status Badges** - Source tracking and value display
- **Real-time Updates** - Ready for live database sync

## 🔐 Authentication

### Development Mode
- **Bypassed authentication** for easy testing
- **Mock user session** with development credentials
- **Visual dev mode indicator**

### Production Mode
- **Supabase Auth** integration
- **Email/password authentication**
- **Protected routes** with automatic redirects
- **Session management**

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📈 Migration from NextCRM

This project successfully migrates NextCRM from MongoDB to Supabase PostgreSQL:

- ✅ **Complete UI/UX preservation**
- ✅ **Enhanced Kanban board integration**
- ✅ **Modern tech stack upgrade**
- ✅ **Improved performance and scalability**

See `MIGRATION_PUNCHLIST.md` for detailed migration progress.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using Next.js 15, Tailwind CSS 4, and Supabase**

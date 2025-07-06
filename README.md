# TypeBlade

A dynamic, rhythm-sensitive typing-practice web app built with React + Phaser.js on the frontend, a Node.js backend with Supabase (Postgres, Auth, Realtime, Storage) and Stripe payments, all containerized and hosted on Fly.io.

## 🎯 Features

- **Rhythm-based typing practice** with Phaser.js game engine
- **Real-time multiplayer** typing challenges via Supabase Realtime
- **User authentication** and profiles via Supabase Auth
- **Subscription management** with Stripe integration
- **Progressive difficulty** and performance tracking
- **Leaderboards** and social features

## 🏗️ Architecture

```
typeblade/
├── frontend/          # React + Phaser.js + Vite
├── api/              # Node.js backend (Express/Fastify)
├── supabase/         # Database migrations & Edge Functions
├── .github/          # GitHub Actions CI/CD
└── docker/           # Docker configurations
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker
- Supabase CLI
- Fly.io CLI

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd typeblade
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy example env files
   cp frontend/.env.example frontend/.env.local
   cp api/.env.example api/.env
   ```

3. **Start Supabase locally:**
   ```bash
   supabase start
   ```

4. **Start all services:**
   ```bash
   npm run dev:all
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Start React + Phaser frontend |
| `npm run dev:api` | Start Node.js backend |
| `npm run dev:all` | Start frontend, API, and Supabase |
| `npm run build` | Build all packages |
| `npm run test` | Run all tests |
| `npm run deploy` | Deploy to Fly.io |

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Phaser.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express/Fastify + TypeScript
- **Database**: Supabase (PostgreSQL) + Auth + Realtime
- **Payments**: Stripe + Supabase Edge Functions
- **Hosting**: Fly.io (Docker containers)
- **CI/CD**: GitHub Actions
- **Testing**: Jest + React Testing Library + Supertest

## 📁 Project Structure

### Frontend (`/frontend`)
- Vite + React + TypeScript setup
- Phaser.js game scenes and components
- Tailwind CSS for styling
- Supabase client integration
- Stripe Checkout integration

### Backend (`/api`)
- Express/Fastify server with TypeScript
- Stripe webhook handlers
- Supabase server-side client
- Authentication middleware
- Game logic API endpoints

### Supabase (`/supabase`)
- Database migrations
- Edge Functions for Stripe integration
- Row Level Security (RLS) policies
- Real-time subscriptions

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env.local`):
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**Backend** (`.env`):
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 🚀 Deployment

### Fly.io Deployment

1. **Build and deploy:**
   ```bash
   npm run deploy
   ```

2. **Or manually:**
   ```bash
   flyctl deploy
   ```

### Environment Setup

1. **Supabase Project:**
   - Create new project at [supabase.com](https://supabase.com)
   - Run migrations: `supabase db push`

2. **Stripe Account:**
   - Create account at [stripe.com](https://stripe.com)
   - Configure webhooks to point to your API

3. **Fly.io App:**
   - Create app: `flyctl apps create typeblade`
   - Set secrets: `flyctl secrets set SUPABASE_URL=...`

## 🧪 Testing

```bash
# Frontend tests
npm run test:frontend

# Backend tests  
npm run test:api

# All tests
npm run test
```

## 📝 Development Workflow

1. **Feature Development:**
   - Create feature branch: `git checkout -b feature/typing-game`
   - Develop with `npm run dev:all`
   - Write tests for new functionality
   - Submit PR with comprehensive description

2. **Database Changes:**
   - Create migration: `supabase migration new add_user_profiles`
   - Test locally: `supabase db reset`
   - Deploy: `supabase db push`

3. **API Changes:**
   - Update TypeScript interfaces
   - Add/update endpoints
   - Update tests
   - Deploy to staging first

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/srich3/typeblade/issues)
- **Discussions**: [GitHub Discussions](https://github.com/srich3/typeblade/discussions)
- **Documentation**: [Wiki](https://github.com/srich3/typeblade/wiki)

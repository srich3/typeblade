#!/bin/bash

# TypeBlade Setup Script
echo "🚀 Setting up TypeBlade project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "⚠️  Supabase CLI is not installed. Installing..."
    npm install -g supabase
fi

echo "✅ Supabase CLI version: $(supabase --version)"

# Check if Fly.io CLI is installed
if ! command -v flyctl &> /dev/null; then
    echo "⚠️  Fly.io CLI is not installed. Please install from https://fly.io/docs/hands-on/install-flyctl/"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Create environment files
echo "🔧 Creating environment files..."

# Frontend environment
if [ ! -f "frontend/.env.local" ]; then
    cp frontend/env.example frontend/.env.local
    echo "✅ Created frontend/.env.local"
else
    echo "⚠️  frontend/.env.local already exists"
fi

# Backend environment
if [ ! -f "api/.env" ]; then
    cp api/env.example api/.env
    echo "✅ Created api/.env"
else
    echo "⚠️  api/.env already exists"
fi

# Initialize Supabase
echo "🗄️  Initializing Supabase..."
supabase init

# Start Supabase locally
echo "🚀 Starting Supabase locally..."
supabase start

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in frontend/.env.local and api/.env"
echo "2. Run 'npm run dev:all' to start all services"
echo "3. Open http://localhost:3000 to view the frontend"
echo "4. Open http://localhost:8080/api/health to test the backend"
echo "5. Open http://localhost:54323 to access Supabase Studio"
echo ""
echo "Happy coding! 🎯" 
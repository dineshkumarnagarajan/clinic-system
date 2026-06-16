#!/bin/bash

# Clinic System - Quick Setup Script
# This script sets up the project and starts development environment

echo "🏥 Clinic System - Setup Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker not found. Skipping Docker setup."
    echo "You can still run the project manually."
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm globally..."
    npm install -g pnpm
fi

echo "✅ Prerequisites check completed"

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file..."
    cp .env.example .env
    echo "✅ .env created. Update it with your values if needed."
fi

# Install dependencies
echo "📥 Installing dependencies..."
pnpm install

echo ""
echo "🎉 Setup completed!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Choose an option to start:"
echo ""
echo "   Option A - Using Docker (recommended):"
echo "   $ docker-compose -f docker-compose.dev.yml up"
echo ""
echo "   Option B - Manual start:"
echo "   $ pnpm dev"
echo ""
echo "Then access:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "Demo login:"
echo "   Email: clinician@hospital.com"
echo "   Password: password123"
echo ""

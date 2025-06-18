# RapidKISK Team - Interactive Collaboration Game

An interactive educational React-based simulation that teaches team collaboration skills through engaging, scenario-driven decision-making experiences.

## Features

- **Interactive Decision Trees**: Navigate through 42 different scenarios across three main character paths
- **Educational Content**: Learn team collaboration, conflict resolution, and project management skills
- **Progress Tracking**: Monitor your learning journey with built-in progress indicators
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Academic UI**: Professional interface designed for educational environments

## Deployment Options

### Option 1: Replit Deployment (Recommended)

1. Click the "Deploy" button in your Replit interface
2. Your app will be automatically built and deployed
3. You'll receive a public URL like `https://your-app-name.replit.app`

### Option 2: GitHub Pages

1. **Fork/Clone this repository** to your GitHub account

2. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Source: "GitHub Actions"

3. **Push to main branch** - the deployment will happen automatically via GitHub Actions

4. **Access your deployed app** at: `https://yourusername.github.io/repository-name`

### Option 3: Manual Static Build

For other hosting providers:

```bash
# Install dependencies
npm install

# Build static version
npx vite build --config vite.config.static.ts

# Deploy the 'dist' folder to your hosting provider
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── lib/           # Utilities and storage
├── server/                # Express backend (for local dev)
├── shared/                # Shared types and schemas
├── attached_assets/       # Game illustrations
└── .github/workflows/     # GitHub Actions for deployment
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: Wouter
- **UI Components**: Radix UI, shadcn/ui
- **Build Tool**: Vite
- **State Management**: React Query
- **Animations**: Framer Motion

## Game Content

The application includes:
- **42 scenarios** covering various team collaboration challenges
- **3 character paths**: "I have a team", "I don't have a team yet", "I don't have a project topic"
- **End-state scenarios**: Success, seeking help, project cancellation, and happiness outcomes
- **Learning materials**: Concepts, resources, and progress tracking

## License

MIT License - feel free to use this for educational purposes.

## Support

For questions about deployment or usage, refer to the documentation in your hosting platform or create an issue in this repository.
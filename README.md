# Simple Node.js Service

A simple Node.js web service with an automated CI/CD pipeline for deployment to staging and production environments.

## 📋 Overview

This project demonstrates a complete automated deployment pipeline using GitHub Actions, Docker, and Render. It includes:
- Simple Express.js web application
- Automated testing with Jest
- Docker containerization
- Multi-environment deployment (Staging & Production)

## 🚀 Features

- **Express.js Server**: Lightweight web server serving static files
- **Automated Testing**: Jest test suite with Supertest
- **Dockerized**: Production-ready Docker container
- **CI/CD Pipeline**: Automated build, test, and deployment workflow
- **Multi-Environment**: Separate staging and production deployments

## 🛠️ Technology Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js 5.2.1
- **Testing**: Jest 30.2.0, Supertest 7.1.4
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Hosting**: Render (Staging & Production)
- **Registry**: Docker Hub

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Pranavv2006/Simple_nodejsService.git

# Navigate to project directory
cd Simple_nodejsService

# Install dependencies
npm install

# Run the application
npm start

# Run tests
npm test
```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated deployment with three main jobs:

### 1. Build and Test
- Triggers on push to `main` or `staging` branches
- Triggers on pull requests to `main`
- Checks out code
- Sets up Node.js 18
- Installs dependencies
- Runs test suite

### 2. Deploy to Staging
- Runs after successful build and test
- Triggers on push to `staging` branch or pull requests
- Deploys to Render staging environment via deploy hook

### 3. Deploy to Production
- Runs after successful build and test
- Triggers only on push to `main` branch (merge/direct push)
- Builds and pushes Docker image to Docker Hub
- Deploys to Render production environment via deploy hook

## 🔐 Required Secrets

Configure these secrets in your GitHub repository settings:

- `DOCKER_USERNAME`: Docker Hub username
- `DOCKERHUB_TOKEN`: Docker Hub access token
- `RENDER_STAGING_DEPLOY_HOOK`: Render staging deploy hook URL
- `RENDER_DEPLOY_HOOK`: Render production deploy hook URL

## 📝 Workflow

```
┌─────────────────┐
│  Push to main   │
│  or staging     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Build & Test    │
│ - Setup Node    │
│ - Install deps  │
│ - Run tests     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────┐
│ Staging │ │ Production   │
│ Deploy  │ │ Deploy       │
│         │ │ - Docker     │
│         │ │ - Push Image │
└─────────┘ └──────────────┘
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Pranavv2006**
- GitHub: [@Pranavv2006](https://github.com/Pranavv2006)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
# StudyPoint Education Platform

StudyPoint is a full-stack education technology (EdTech) platform built using the MERN stack and structured around the MVC architecture. It enables students to browse, enroll in, and review online courses, while allowing instructors to create and manage rich course content.

The platform includes user authentication, course management, progress tracking, password reset, ratings and reviews, contact management, media uploads, email notifications, and secure online payments through Razorpay.

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Redux Toolkit
- Fetch API
- React Router
- Responsive UI

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt
- Nodemailer
- MVC architecture

### Integrations
- Razorpay — payment processing
- Cloudinary — image/video storage
- MongoDB Atlas — database
- GitHub Actions — CI/CD
- Vercel — frontend deployment
- Docker — backend containerization
- Azure Container Instances (ACI) — container deployment

---

# Architecture

```text
                         StudyPoint
                             |
             +---------------+---------------+
             |                               |
        React Frontend                 Node/Express API
             |                               |
          Vercel                       Docker Container
                                             |
                                      Azure Container
                                         Instances
                                             |
                    +------------------------+-------------------+
                    |                        |                   |
                MongoDB                  Cloudinary          Razorpay
                Atlas                  Media Storage         Payments
                    |
                User/Course/
                Progress Data
```

---

# Deployment

## Frontend Deployment

The React frontend is deployed to Vercel and connected to the GitHub repository.

The frontend communicates with the backend through REST APIs using the Fetch API.

GitHub Actions can be used to automate the frontend build and deployment workflow.

```text
GitHub Repository
       |
       v
GitHub Actions
       |
       v
Frontend Build
       |
       v
Vercel
```

## Backend Deployment with Docker on Azure

The backend is containerized using Docker and deployed to **Azure Container Instances (ACI)**.

### Dockerfile

The backend uses a lightweight Node.js Alpine image:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]
```

The application listens on the port supplied through the `PORT` environment variable and binds to `0.0.0.0` so that it can receive requests from outside the container.

### Docker Image

The backend Docker image is tagged as:

```text
mdakram2002/study_point:1
```

The image can be built locally with:

```bash
cd server
docker build -t mdakram2002/study_point:1 .
```

It can then be pushed to Docker Hub:

```bash
docker push mdakram2002/study_point:1
```

### Local Docker Testing

For local testing, environment variables are supplied through the `.env` file:

```bash
docker run -p 4000:4000 --env-file .env mdakram2002/study_point:1
```

If the container is configured to listen on port 80, the host-to-container mapping can be:

```bash
docker run -p 4000:80 --env-file .env mdakram2002/study_point:1
```

The important rule is:

```text
-p <host-port>:<container-port>
```

The container port must match the port on which the Node.js application is actually listening.

### Azure Container Instances Deployment

The Dockerized backend was deployed to Azure using **Azure Container Instances (ACI)**.

Deployment configuration:

- Azure service: Azure Container Instances
- Region: Central India
- OS: Linux
- SKU: Standard
- Networking: Public
- Public DNS label: `studypoint`
- Container port: `80`
- Container image: `mdakram2002/study_point:1`

The Azure deployment created a publicly accessible container endpoint using the configured DNS label.

```text
Docker Image
     |
     v
Docker Hub
     |
     v
Azure Container Instances
     |
     v
Public DNS + Port 80
     |
     v
Node.js / Express Backend
```

This deployment allows the backend to run as a Docker container in Azure without managing the underlying server infrastructure.

> Note: Azure Container Instances (ACI) is different from Azure App Service/Web App for Containers. This project backend is currently deployed using **Azure Container Instances**.

---

# Backend Overview

The backend is structured using Node.js and Express.js following MVC principles.

```text
server/
├── config/
├── controllers/
├── email/
├── middlewares/
├── models/
├── routes/
├── utils/
├── .dockerignore
├── Dockerfile
├── index.js
├── package.json
└── package-lock.json
```

The backend provides RESTful APIs for authentication, courses, categories, profiles, payments, sections, subsections, ratings/reviews, password reset, and contact management.

---

# Frontend Overview

The frontend is built using React.js and Tailwind CSS.

It communicates with backend REST APIs using the Fetch API and manages application state using Redux Toolkit.

The frontend handles:

- Authentication
- Course catalog
- Course details
- Course enrollment
- Payment flow
- Student dashboard
- Instructor course management
- Password reset
- Ratings and reviews
- Profile management
- Contact form
- Course sections and subsections
- Video/lecture content

---

# Frontend Structure

```text
client/
├── public/
├── src/
│   ├── Assets/
│   ├── components/
│   │   ├── common/
│   │   ├── ContactPage/
│   │   └── core/
│   │       ├── AboutPage/
│   │       ├── Auth/
│   │       ├── Catalog/
│   │       ├── Course/
│   │       ├── Dashboard/
│   │       ├── HomePage/
│   │       └── ViewCourses/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── reducer/
│   ├── services/
│   │   ├── operations/
│   │   └── slices/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── index.jsx
├── package.json
├── package-lock.json
├── tailwind.config.js
└── webpack.config.js
```

`node_modules`, build artifacts, and `.env` files are intentionally omitted from the repository structure because they should not be committed to Git.

---

# Core Features

## Authentication

- User signup and login
- JWT-based authentication
- Secure authentication cookies
- Password hashing using bcrypt
- Protected routes
- Role-based access control
- Email verification using OTP

## Course Management

Instructors can:

- Create courses
- Update courses
- Delete courses
- Upload course thumbnails
- Create sections and subsections
- Upload lecture/video content
- Manage course content

Students can:

- Browse courses
- View course details
- Enroll in courses
- Track course progress
- Access course lectures
- Rate and review courses

## Password Reset

The password reset flow includes:

1. User submits their email.
2. The backend verifies the account.
3. A reset token is generated.
4. The reset link is sent through email.
5. The token and expiration are validated.
6. The new password is securely hashed and stored.

## Category Management

The backend provides APIs to:

- Create categories
- Retrieve all categories
- Retrieve category details
- Retrieve courses associated with categories
- Retrieve popular/top-selling courses

## Payment Integration

Razorpay is integrated for course payments.

The payment flow:

```text
Student
   |
   v
Select Course
   |
   v
Create Payment
   |
   v
Razorpay
   |
   v
Verify Payment
   |
   v
Create Enrollment
   |
   v
Send Confirmation Email
```

Payment and enrollment data is handled by the backend.

## Sections and Subsections

### Sections
- Create section
- Update section
- Delete section
- Associate sections with courses

### Subsections
- Create subsection
- Upload video content
- Update subsection
- Delete subsection
- Associate subsections with sections

## Profile Management

Provides CRUD functionality for user profiles, including retrieving and updating user information.

## Rating and Review System

- Only enrolled students can review courses.
- Duplicate reviews are prevented.
- Course rating references are updated after a review.
- Average course ratings are calculated using MongoDB aggregation.
- Reviews can be retrieved with user and course information.

## Contact Us

The contact system:

- Captures user queries
- Stores contact information in MongoDB
- Sends confirmation emails to users
- Notifies the StudyPoint administrator
- Maintains queries for tracking

---

# Backend Structure

```text
server/
├── config/
│   ├── cloudinary.js
│   ├── database.js
│   └── razorpay.js
├── controllers/
│   ├── files/
│   ├── Auth.js
│   ├── Category.js
│   ├── ContactUs.js
│   ├── Course.js
│   ├── CourseProgrss.js
│   ├── Payments.js
│   ├── Profile.js
│   ├── RatingAndRevi.js
│   ├── ResetPassword.js
│   ├── Section.js
│   └── SubSection.js
├── email/
│   └── templates/
│       ├── courseEnrollEmail.js
│       ├── emailVerification.js
│       ├── passwordUpdate.js
│       └── PaymentSuccess.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── category.js
│   ├── ContactUs.js
│   ├── Course.js
│   ├── CourseProgres.js
│   ├── OTP.js
│   ├── Profile.js
│   └── User.js
├── routes/
│   ├── ContactUs.js
│   ├── Course.js
│   ├── Payments.js
│   ├── Profile.js
│   └── User.js
├── utils/
│   ├── imageUploader.js
│   ├── mailSender.js
│   ├── SecToDuration.js
│   └── validation.js
├── .dockerignore
├── Dockerfile
├── index.js
├── package.json
└── package-lock.json
```

---

# Email System

StudyPoint uses Nodemailer for transactional emails.

Email templates include:

### Course Enrollment
Sends an enrollment confirmation email containing the student's name and enrolled course.

### Email Verification
Sends an OTP for account verification.

### Password Update
Notifies users when their password has been successfully updated.

### Payment Success
Sends payment/enrollment confirmation after successful course payment.

---

# Utilities

### `mailSender`
Handles email delivery through Nodemailer.

### `validation`
Validates emails, usernames, and other user-provided data.

### `imageUploader`
Handles image and video uploads through Cloudinary.

---

# Environment Variables

Environment variables are required for database access, authentication, email, media uploads, and payment processing.

Example:

```env
# Example values only — do NOT use these in production
PORT=4000

# Database
MONGO_URI=mongodb+srv://example_user:EXAMPLE_PASSWORD@cluster0.example.mongodb.net/studypoint

# Authentication
JWT_SECRET=example_jwt_secret_do_not_use_in_production

# Cloudinary
CLOUDINARY_CLOUD_NAME=example_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=EXAMPLE_CLOUDINARY_SECRET

# Razorpay
RAZORPAY_KEY_ID=rzp_test_EXAMPLE123456
RAZORPAY_SECRET=EXAMPLE_RAZORPAY_SECRET

# Email
MAIL_HOST=smtp.example.com
MAIL_USER=example@example.com
MAIL_PASS=EXAMPLE_EMAIL_APP_PASSWORD
```

**The values above are fake examples only. Never commit real private keys, IDs, secrets, passwords, API credentials, database credentials, or `.env` files to GitHub or Docker images.**

For Azure deployment, configure the required environment variables through the container/deployment configuration rather than hard-coding secrets in the application.

---

# Prerequisites

- Node.js LTS
- npm
- Git
- Docker Desktop
- MongoDB instance / MongoDB Atlas
- Cloudinary account
- Razorpay account
- Email/Nodemailer configuration
- Azure account (for Azure deployment)
- Docker Hub account (for publishing the Docker image)

---

# Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/mdakram2002/Study_Point.git
cd Study_Point
```

## 2. Backend Setup

```bash
cd server
npm install
```

Create:

```text
server/.env
```

and add the required environment variables.

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend normally runs on:

```text
http://localhost:4000
```

depending on the configured `PORT`.

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Configure the frontend environment variable for the backend API.

Start the frontend:

```bash
npm start
```

or:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:3000
```

depending on the development configuration.

---

# Docker Setup

From the project root:

```bash
cd server
```

Build the Docker image:

```bash
docker build -t mdakram2002/study_point:1 .
```

Run the container:

```bash
docker run -p 4000:4000 --env-file .env mdakram2002/study_point:1
```

Verify the running container:

```bash
docker ps
```

---

# CI/CD

The project uses GitHub Actions to automate deployment workflows.

## GitHub Actions Workflows

### Frontend CI Workflow (`.github/workflows/frontend-ci.yml`)

Triggers on push/PR to main branch for client changes:
- Runs on Ubuntu latest with Node.js 18
- Installs dependencies with `npm ci`
- Builds React application with `npm run build`
- Uploads build artifacts

The frontend is deployed to Vercel via Git integration, which triggers automatically on push to main.

### Backend CI/CD Workflow (`.github/workflows/backend-ci-cd.yml`)

Triggers on push/PR to main branch for server changes:

**CI Job:**
- Runs on Ubuntu latest with Node.js 18
- Installs dependencies with `npm ci --omit=dev`
- Runs lint and tests (if configured)

**Build and Deploy Job (main branch only):**
- Builds Docker image from `server/` directory
- Tags image with Git commit SHA and `latest`
- Pushes to Docker Hub
- Logs into Azure using service principal
- Updates existing Azure Container Instance with new Docker image
- Verifies deployment

## Required GitHub Secrets

Configure these in **Settings → Secrets and variables → Actions**:

**Docker Hub:**
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password or access token
- `DOCKER_IMAGE_NAME` - (Optional) Full image name, e.g., `yourusername/study_point`

**Azure Container Instances:**
- `AZURE_CREDENTIALS` - Azure service principal credentials in JSON format
- `AZURE_RESOURCE_GROUP` - (Optional) Azure resource group name, defaults to `study_point`
- `AZURE_CONTAINER_GROUP` - (Optional) Azure Container Instance name, defaults to `studypoint`

## Azure Service Principal Setup

To create the service principal for GitHub Actions:

```bash
az login
az ad sp create-for-rbac \
  --name "github-actions-studypoint" \
  --role Contributor \
  --scopes /subscriptions/{your-subscription-id}/resourceGroups/study_point \
  --json-auth
```

Copy the JSON output and add it as the `AZURE_CREDENTIALS` secret in GitHub.

## Deployment Flow

```text
Developer
    |
    v
Git Push to main
    |
    v
GitHub
    |
    v
GitHub Actions
    |
    +----------------------+
    |                      |
    v                      v
Frontend CI             Backend CI/CD
    |                      |
    v                      v
  Vercel               Docker Build
(Git integration)           |
                            v
                      Docker Hub
                            |
                            v
                  Azure Container Instances
```

This reduces manual deployment steps and makes application updates easier to deliver consistently.

---

# Project Goals

StudyPoint demonstrates practical experience in:

- Full-stack web development
- REST API development
- MVC architecture
- Authentication and authorization
- Database-driven applications
- Payment gateway integration
- Cloud media storage
- Email automation
- Docker containerization
- Cloud deployment on Azure
- CI/CD with GitHub Actions
- Frontend deployment with Vercel

---

# Repository

GitHub: https://github.com/mdakram2002/Study_Point


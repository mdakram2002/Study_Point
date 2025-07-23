## StudyPoint Education Platform
- StudyPoint is a full-stack education technology (ed-tech) platform built using the MERN stack, structured with the MVC architecture. It enables students to browse, enroll in, and review online courses, while allowing instructors to create and manage rich course content. The platform supports full user authentication, modular course management, real-time progress tracking, and secure online payments — offering a seamless digital learning experience for both learners and educators.

+ Backend Overview
- The backend is structured using Node.js, Express, and MongoDB, following MVC principles with well-defined routes, controllers, models, middleware, and utilities.

+ Frontend Overview
- Built using React.js for the UI and Tailwind CSS for modern styling. Integrated with backend APIs using the Fetch API (built-in browser API), ensuring a smooth and dynamic user experience. Handles authentication, course catalog, payment flow, and profile management from the client side. Deployed using CI/CD pipeline via GitHub Actions to Vercel, ensuring automated testing and seamless delivery of frontend updates. Features responsive design and optimized components for performance and accessibility.

# Project Root
- ├── client (Frontend)
- │   ├── build
- │   ├── node_modules
- │   ├── public
- │   ├── src
- │   │   ├── Assets
- │   │   ├── components
- │   │   │   ├── common
- │   │   │   │   ├── Confirmation.jsx
- │   │   │   │   ├── Footer.jsx
- │   │   │   │   ├── IconButton.jsx
- │   │   │   │   ├── Navbar.jsx
- │   │   │   │   ├── RatingStars.jsx
- │   │   │   │   ├── ReviewSlider.jsx
- │   │   │   │   └── Tab.jsx
- │   │   │   ├── ContactPage
- │   │   │   │   ├── ContactData.jsx
- │   │   │   │   ├── ContactFor.jsx
- │   │   │   │   └── ContactUsForm.jsx
- │   │   │   └── core
- │   │   │       ├── AboutPage
- │   │   │       │   ├── ContactFor.jsx
- │   │   │       │   ├── LearningGi.jsx
- │   │   │       │   ├── Quote.jsx
- │   │   │       │   └── StatsComp.jsx
- │   │   │       ├── Auth
- │   │   │       │   ├── LoginForm.jsx
- │   │   │       │   ├── OpenRoute.jsx
- │   │   │       │   ├── PrivateRoute.jsx
- │   │   │       │   └── ProfileDro.jsx
- │   │   │       ├── Catalog
- │   │   │       ├── Course
- │   │   │       ├── Dashboard
- │   │   │       ├── HomePage
- │   │   │       └── ViewCourses
- │   │   ├── data
- │   │   ├── hooks
- │   │   ├── pages
- │   │   │   ├── About.jsx
- │   │   │   ├── Catalog.jsx
- │   │   │   ├── Contact.jsx
- │   │   │   ├── CourseDetails.jsx
- │   │   │   ├── Dashboard.jsx
- │   │   │   ├── Error.jsx
- │   │   │   ├── ForgotPasswo.jsx
- │   │   │   ├── Home.jsx
- │   │   │   ├── Login.jsx
- │   │   │   ├── Signup.jsx
- │   │   │   ├── UpdatePassw.jsx
- │   │   │   ├── VerifyEmail.jsx
- │   │   │   └── ViewCourses.jsx
- │   │   ├── reducer
- │   │   │   └── Index.jsx
- │   │   ├── services
- │   │   │   ├── operations
- │   │   │   │   ├── apiConnector.jsx
- │   │   │   │   ├── apis.jsx
- │   │   │   │   └── studentFeatur.jsx
- │   │   │   └── slices
- │   │   │       ├── authSlice.jsx
- │   │   │       ├── cartSlice.jsx
- │   │   │       ├── courseSlice.jsx
- │   │   │       ├── profileSlice.jsx
- │   │   │       └── viewCourseSli.jsx
- │   │   ├── utils
- │   │   │   └── api.js
- │   │   ├── App.css
- │   │   ├── App.jsx
- │   │   ├── index.css
- │   │   └── index.jsx
- │   ├── .env
- │   ├── .gitignore
- │   ├── package-lock.json
- │   ├── package.json
- │   ├── README.md
- │   ├── tailwind.config.js
- │   ├── web.config
- │   └── webpack.config.js
- └── server (Backend)
- ├── config
- │   ├── cloudinary.js
- │   ├── database.js
- │   └── razorpay.js
- ├── controllers
- │   ├── files
- │   ├── Auth.js
- │   ├── Category.js
- │   ├── ContactUs.js
- │   ├── Course.js
- │   ├── CourseProgrss.js
- │   ├── Payments.js
- │   ├── Profile.js
- │   ├── RatingAndRevi.js
- │   ├── ResetPassword.js
- │   ├── Section.js
- │   └── SubSection.js
- ├── email\templates
- │   ├── courseEnrollEmail.js
- │   ├── emailVerification.js
- │   ├── passwordUpdate.js
- │   └── PaymentSuccess.js
- ├── middlewares
- │   └── auth.js
- ├── models
- │   ├── category.js
- │   ├── ContactUs.js
- │   ├── Course.js
- │   ├── CourseProgres.js
- │   ├── OTP.js
- │   ├── Profile.js
- │   └── User.js
- ├── node_modules
- ├── routes
- │   ├── ContactUs.js
- │   ├── Course.js
- │   ├── Payments.js
- │   ├── Profile.js
- │   └── User.js
- ├── utils
- │   ├── imageUploader.js
- │   ├── mailSender.js
- │   ├── SecToDuration.js
- │   └── validation.js
- ├── .env
- ├── .gitignore
- ├── index.js
- ├── package-lock.json
- └── package.json


## FRONTEND ##
- Built using React.js and Tailwind CSS for UI. Interacts with backend APIs via the Fetch API. Deployed to Vercel via GitHub Actions CI/CD.

+ 🔒 Authentication (Client-Side Handling)
- Manages user input for signup/login forms. Sends credentials to the backend for verification. Stores and manages JWT tokens (e.g., in local storage or context) for session persistence. Redirects users based on authentication status using OpenRoute and PrivateRoute. Handles profile dropdown display (ProfileDro.jsx).

+ 🎓 Course Management (Client-Side Rendering & Interaction)
- Renders course listings (Catalog components). Facilitates course creation forms for instructors (data input). Displays course details (CourseDetails.jsx). Handles user interactions like course enrollment.

+ 🔁 Password Reset (Client-Side Forms & Flow)
- Presents "Forgot Password" form (ForgotPasswo.jsx) to capture email. Handles OTP input and verification (VerifyEmail.jsx). Provides "Update Password" form (UpdatePassw.jsx) for new password submission.

+ 🗂️ Category Management (Client-Side Display)
- Displays available categories. Filters and renders courses based on selected categories (Catalog.jsx). Presents detailed category pages (Category Page Details are consumed and rendered here).

+ 💳 Payment Integration (Client-Side Payment Flow)
- Initiates payment flow by sending course and user data to the backend. Integrates with Razorpay's frontend SDK for secure payment collection. Confirms payment status and updates UI.

+ 📚 Sections and SubSections (Client-Side Content Display & Interaction)
- Renders course sections and subsections (ViewCourses.jsx, CourseDetails.jsx). Handles UI for creating, updating, and deleting sections/subsections by sending data to backend. Displays video content and lecture details.

+ 👤 Profile Management (Client-Side UI & Data Display)
- Provides user interface for viewing and editing profile details (Dashboard.jsx). Sends updated profile data to the backend. Displays user-specific information.

+ ⭐ Rating & Review System (Client-Side Input & Display)
- Offers forms for users to submit ratings and reviews. Displays average ratings and all reviews for courses. Validates user eligibility for reviews (e.g., enrolled status).

+ 📬 Contact Us Feature (Client-Side Form Submission)
- Presents a contact form (ContactUsForm.jsx). Captures user input (name, email, message). Submits query data to the backend API. Provides feedback to the user upon successful submission.

+ 📦 Utilities (Frontend Helpers)
- apiConnector.jsx: Manages base API URLs and common request configurations.
- apis.jsx: Defines API endpoints for easy access.
- studentFeatur.jsx: Contains functions for student-specific operations (e.g., course enrollment, payment initiation).
- api.js: General-purpose utility for making Fetch API calls.

+ 📧 State Management (Redux Slices)
- authSlice.jsx: Manages authentication state (user login status, token).
- cartSlice.jsx: Handles shopping cart state (items, total).
- courseSlice.jsx: Manages course-related data (listings, selected course).
- profileSlice.jsx: Stores and updates user profile information.
- viewCourseSli.jsx: Manages state related to viewing specific course content (progress, active section/subsection).


### BACKEND ###
+ 🔒 Authentication (Auth Controller)
- Handles signup, login, and token generation. Uses JWT for authentication and sets secure HTTP-only cookies. Passwords are encrypted using bcrypt. Fetches data from the request body, validates user data (checks if already registered), verifies passwords for existing users, generates JWT tokens, creates authentication cookies, and sends a response back to the client.

+ 🎓 Course Management (Course Controller)
- Allows instructors to create and manage courses. Validates course data, uploads thumbnails to Cloudinary, and updates relevant schemas. Ensures each course is linked to instructors and categories. Processes the request body to extract necessary details, including the course thumbnail. Course data is validated to ensure no fields are left empty. Images are uploaded to Cloudinary for optimized storage. A new course entry is then created in the database, added to the instructor’s user schema, and the Category schema is updated accordingly. Finally, a response is sent back confirming the successful creation of the course.

+ 🔁 Password Reset
- ResetPassword Controller: The system first retrieves the email address from the request body and checks whether a user exists for that email. If the user is found, an email verification process is initiated. A token is generated and stored in the user’s record along with an expiration time. A reset URL is created and sent to the user's email, informing them that their password reset request has been successfully processed.

- ResetPasswordToken Controller: Responsible for verifying and processing the password reset request. It fetches the data from the request body, validates it, and retrieves the user details from the database using the provided token. The token's expiration time is checked, after which the new password is hashed and updated in the database. Finally, a response is sent to confirm the password change.

+ 🗂️ Category Management
- Create Category: Data is fetched from the request body, validated, and stored in the database as a new entry. Once completed, a response is sent to the instructor confirming the successful creation of the category.
- Show All Categories: Retrieves all categories from the database, including their names and descriptions, and returns them in the response.
- Category Page Details: Fetches details of a specific category, including its associated courses, other available categories, and the top-selling courses based on enrollments.

+ 💳 Payment Integration
- Integrated Razorpay for handling course payments. Enrollments are validated and recorded after successful payment. Sends enrollment confirmation email using Nodemailer. This project is a backend service for managing course payments and student enrollments using Razorpay for payment processing. It allows users to enroll in courses by making secure payments and ensures that each transaction is properly validated. The system uses MongoDB to store course and user details, while Nodemailer handles email notifications for enrollment confirmations.

+ 📚 Sections and SubSections
- Create Section: Fetches data from the request body, validates sectionName and courseId, creates a section, updates the course with the new section's object ID, and populates Section and SubSection using the populate function. Returns a response indicating successful section creation.
- Update Section: Takes input data from the request body, validates the data, updates the section data using findByIdAndUpdate from the database, and returns a response that the section is updated successfully.
- Delete Section: Takes sectionId from the request body, validates it, fetches and deletes the section from the database using findByIdAndDelete, and returns a response that the section is deleted.

+ SubSection Controller
- Create SubSection: Fetches data from the request body, validates sectionId, title, timeDuration, description, and videoFile, uploads the video to Cloudinary, creates a new SubSection, updates the corresponding Section by adding the SubSection ID, populates the Section with subSections, and returns a response that the SubSection is created successfully.
- Update SubSection: Takes input data from the request body, validates the sectionId, updates the SubSection data using findByIdAndUpdate from the database, and returns a response that the SubSection is updated successfully.
- Delete SubSection: Takes sectionId from the request body, validates the sectionId, deletes the SubSection using findByIdAndDelete from the database, and returns a response that the SubSection is deleted successfully.

+ 👤 Profile Management
- CRUD operations for user profiles. Fetches and updates details using userId. Handles getting user data, validating it, finding the profile in the database using userId, and updating, deleting, and getting all details of the user.

+ ⭐ Rating & Review System
- Only enrolled users can rate and review courses. Prevents duplicate reviews and updates course with rating references.
- Create Rating and Review: Retrieves rating, review, and courseId from the request body and validates them. Ensures that the user is enrolled in the course and has not already reviewed it. Creates a new rating and review entry, updates the course by adding the review’s Object ID, and returns a response indicating that the rating and review were created successfully.
- Get Average Rating: Retrieves courseId from the request parameters and validates it. Uses aggregation to calculate the average rating of the course. If ratings exist, returns the calculated average; otherwise, returns a response indicating that no ratings are available.

- Get All Ratings and Reviews: Fetches all rating and review entries from the database, sorts them in descending order of rating, and populates user and course details. Returns the retrieved reviews along with a success response.

+ 📬 Contact Us Feature
- Captures user queries (name, email, message, etc.). Sends confirmation to user and notification to StudyPoint admin. Data stored for tracking and analytics. Retrieves the user's first name, last name, email, contact number, message, and userId (if registered) from the request body and validates them. Stores the query in the database for tracking. Sends a confirmation email to the user acknowledging the receipt of their query and notifies the StudyPoint admin about the new inquiry. Returns a response indicating that the query has been submitted successfully.

+ 🛡️ Middleware
- Pre-save Hook: Triggers after an OTP is submitted, ensuring that the OTP is processed and sent via email before being saved in the database.

+ 📦 Utilities
- mailSender: Sends OTP and notifications using the Nodemailer package.
- validation: Ensures all email addresses, usernames, and other input fields are properly verified for accuracy. If any fields contain invalid data, the system returns a response prompting the user to provide correct details.
- imageUploader: Integrates with Cloudinary for managing the uploading of images, including thumbnails, videos, and lecture content, ensuring optimized performance and storage.

+ 📧 Email Templates, CourseEnrollEmail
- Functionality: This function generates an HTML email template to confirm course enrollment. It takes name (student’s name) and courseName as parameters and returns a structured email message.
- Structure: The email includes a StudyPoint logo, a confirmation message, and a personalized greeting for the student. It also highlights the enrolled course and provides a call-to-action button linking to the user's dashboard.
- Styling: The email is styled for a clean and professional appearance, using CSS to format the text, layout, and call-to-action button. The design ensures responsiveness and a good user experience.
- Support Information: The email contains a support section with a contact email for any queries, ensuring students can seek assistance if needed.

+ EmailVerification
- Functionality: This function generates an HTML email template for OTP verification. It takes an otp parameter and returns a formatted email to help users verify their accounts during registration or authentication.
- Structure: The email includes the StudyPoint logo, a personalized greeting, and a confirmation message. It highlights the OTP prominently and provides instructions on its usage and validity period (5 minutes).
- Styling: The email is designed with a clean and professional layout, using CSS for readability and responsiveness. The OTP is displayed in bold to ensure visibility.
- Security & Support: It advises users to ignore the message if they did not request an OTP. A support section with a contact email is included for assistance, ensuring users can reach out for help if needed.

+ PasswordUpdate
- Functionality: This function generates an HTML email template to notify users that their password has been successfully updated. It takes email and name as parameters and returns a formatted email.
- Structure: The email includes the StudyPoint logo, a confirmation message, and a personalized greeting. It displays the user's email associated with the password change and provides a security warning in case the update was unauthorized.
- Styling: Designed with a clean and professional layout, using CSS for readability and responsiveness. The highlighted email field ensures clarity for the user.
- Security & Support: It warns users to contact support immediately if they did not initiate the password update. A support section with a contact email is included for assistance, ensuring users can secure their accounts if needed.

+ 🔄 Deployment (CI/CD)
- CI/CD Pipeline: Configured via GitHub Actions for automatic build and deploy.
- Deployment: Frontend deployed to Vercel and connected with backend hosted vercel.
- Ensures zero-downtime deployment and quick delivery of updates.

+ Prerequisites
- Node.js (LTS version recommended)
- npm (Node Package Manager) or Yarn
- MongoDB instance (local or cloud-hosted)
- Cloudinary account (for image/video uploads)
- Razorpay account (for payment integration)

# Setup Steps
Clone the Repository:

Bash

git clone https://github.com/mdakram2002/study_point
cd StudyPoint
Backend Setup:

Navigate to the server directory:

Bash

cd server
Install backend dependencies:

Bash

npm install
# OR
yarn install
Create a .env file in the server directory and add your environment variables (e.g., MongoDB URI, JWT secret, Cloudinary credentials, Razorpay keys, Nodemailer configuration). Refer to your backend code for required variables.

Start the backend server:

Bash

npm start
# OR if you have nodemon installed globally for development:
nodemon index.js
The backend will typically run on http://localhost:4000 (or your configured port).

Frontend Setup:

Open a new terminal and navigate to the client directory:

Bash

cd ../client
Install frontend dependencies:

Bash

npm install
# OR
yarn install
Create a .env file in the client directory and add any necessary frontend environment variables (e.g., REACT_APP_BASE_URL pointing to your backend API).

Start the frontend development server:

Bash

npm start
# OR
npm run dev
The frontend application will usually open in your browser at http://localhost:3000.



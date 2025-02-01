## StudyPoint Backend Part

- The backend development of StudyPoint follows a structured flow, beginning with the installation of all necessary NPM packages, including bcrypt, cookie-parser, dotenv, express, jsonwebtoken, mongoose, nodemailer, nodemon, and otp-generator. Once the required packages are installed,

- The next step is to create a database to store and manage application data efficiently.

# Controllers:

- Auth: Auth Controller, data is fetched from the request body sent by the frontend. The provided user data is validated to check if the user is already registered. If the user exists, the password is verified, a JWT token is generated, authentication cookies are created, and a response is sent back to the client.

- Course: The Course Controller handles course creation and validation. It processes the request body to extract necessary details, including the course thumbnail. The course data is validated to ensure that no fields are left empty. Images are uploaded to Cloudinary for optimized storage. A new course entry is then created in the database, added to the instructor’s user schema, and the Category schema is updated accordingly. Finally, a response is sent back confirming the successful creation of the course.

- ResetPassword: The Reset Password functionality, the system first retrieves the email address from the request body and checks whether a user exists for that email. If the user is found, an email verification process is initiated. A token is generated and stored in the user’s record along with an expiration time. A reset URL is created and sent to the user's email, informing them that their password reset request has been successfully processed.

- ResetPasswordToken: The Reset Password Token Controller is responsible for verifying and processing the password reset request. It fetches the data from the request body, validates it, and retrieves the user details from the database using the provided token. The token's expiration time is checked, after which the new password is hashed and updated in the database. Finally, a response is sent to confirm the password change.

- Category: Category Controller, data is fetched from the request body, validated, and stored in the database as a new entry. Once completed, a response is sent to the instructor confirming the successful creation of the category.

*** Payment integration ***
- Payment: This project is a backend service for managing course payments and student enrollments using Razorpay for payment processing. It allows users to enroll in courses by making secure payments and ensures that each transaction is properly validated. The system uses MongoDB to store course and user details, while Nodemailer handles email notifications for enrollment confirmations.

*** Section ***
- Create Section: Fetch the data from the request body and validate sectionName and courseId, Create section and Update course with the new section's object ID and update Section and SubSection using populate function then return the response to the client that Section is created Successfully.

- Update Section: Taking input data from request body and validate the data Update the section data using findByIdAndUpdate form DB and return response that sectin is updated successfully.

- Delete Section: Taking input SectionId from request body and validate the SectionId and fetch the section from Database using findByIdAndDelete form DB and return response to the client that Section is deleted.

*** SubSection ***
- Create Subsection: Create SubSection: Fetch the data from the request body, validate sectionId, title, timeDuration, description, and videoFile, upload the video to Cloudinary, create a new SubSection, update the corresponding Section by adding the SubSection ID, populate the Section with subSections, and return the response that the SubSection is created successfully.

- Update SubSection: Take input data from the request body, validate the sectionId, update the SubSection data using findByIdAndUpdate from the database, and return the response that the SubSection is updated successfully.

- Delete SubSection: Take input sectionId from the request body, validate the sectionId, delete the SubSection using findByIdAndDelete from the database, and return the response that the SubSection is deleted successfully.

*** Profile ***
- Get data, userId and validate the data find Profile in database using userId and update and mainetain the Profile like update, delete and get all details of user.

# Middleware:

- The backend also includes a middleware that is implemented as a pre-save hook. This middleware is triggered after an OTP is submitted, ensuring that the OTP is processed and sent via email before being saved in the database.

# Models:

- The backend architecture follows a structured schema model, which includes User, Profile, Course, CourseProgress, Section, Subsection, Category, RatingAndReview, and OTP. Each schema serves as a blueprint defining the structure and organization of the data within the database.

# Utils:

- mailSender: The mailSender utility is used for OTP verification via the Nodemailer package.

- Validation: Additionally, email addresses, usernames, and names are validated to ensure accuracy. If any of these fields contain invalid data, the system returns a response prompting the user to provide the correct details.

- imageUploader: Cloudinary integration is also implemented to manage the uploading of images, including thumbnails, videos, and lecture content, ensuring optimized performance and storage.

# Email\Templates

- CourseEnrollEmail:

- EmailVerification:

- PasswordUpdate:
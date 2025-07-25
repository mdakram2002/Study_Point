exports.courseEnrollmentEmail = (name, courseName) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Course Enrollment Email Verification</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }
        .message {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .body {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }
        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }
        .highlight {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="https://studyPoint-edtech-project.vercel.app">
            <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyPoint Logo">
        </a>
        <div class="message">Course Registration Confirmation</div>
        <div class="body">
            <p>Dear ${name},</p>
            <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>.
                We are excited to have you as a participant!</p>
            <p>Please log in to your learning dashboard to access the course materials and start your learning with us.</p>
            <a class="cta" href="https://studyPoint-edtech-project.vercel.app/dashboard">Go To Dashboard</a>
            <div class="support">If you have any questions or need help, please feel free to reach out to me at
                <a href="mailto:infostudypoint2024@gmail.com">infostudypoint2024@gmail.com</a>. We are here to help you.
            </div>
        </div>
    </div>
</body>
</html>`;
}

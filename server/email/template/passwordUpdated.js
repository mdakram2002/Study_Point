exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8" />
          <title>Password Updated Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 15px;
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
                  font-size: 14px;
                  margin-bottom: 20px;
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
                  <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyPoint Logo" title="StudyPoint Logo">
              </a>
              <div class="message">Password Update Confirmation</div>
              <div class="body">
                  <p>Hey ${name},</p>
                  <p>Your password has been updated successfully for the email <span class="highlight">${email}</span>.</p>
                  <p>If you did not request this password change, please contact us immediately to secure your account.</p>
              </div>
              <div class="support">If you have any questions or need help, please feel free to reach out to me at
                  <a href="mailto:mdakramdev@gmail.com">mdakramdev@gmail.com</a>. We are here to help you.
              </div>
          </div>
      </body>
      </html>`;
};

export const resetPasswordTemplate = (otp_code: string) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #dc3545;
      margin: 20px 0;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://yourlogo.com/logo.png" alt="Your Logo" class="logo">
    <h2>Password Reset Request</h2>
    <p>We received a request to reset your password. Use the OTP below to proceed:</p>
    <p class="otp">${otp_code}</p>
    <p>If you did not request this, you can safely ignore this email.</p>
    <p class="footer">This OTP will expire in 10 minutes.</p>
  </div>
</body>
</html>
`;
};

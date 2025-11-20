export const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 30px;
      color: #222;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background-color: #2e7d32; /* green */
      color: white;
      text-align: center;
      padding: 20px 10px;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 30px 25px;
      line-height: 1.6;
      text-align: center;
    }
    .otp-box {
      display: inline-block;
      padding: 15px 25px;
      margin: 20px 0;
      font-size: 2rem;
      font-weight: 700;
      color: #2e7d32;
      background: #e8f5e9; /* light green */
      border: 2px dashed #2e7d32;
      border-radius: 8px;
      letter-spacing: 5px;
    }
    .footer {
      background: #f1f8f1;
      text-align: center;
      padding: 15px;
      font-size: 0.8rem;
      color: #555;
      border-top: 1px solid #d0f0d0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      TambayFind OTP Verification
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your One-Time Password (OTP) for <strong>TambayFind</strong> is:</p>

      <div class="otp-box">
        ${otp}
      </div>

      <p>Please use this code within 10 minutes to verify your account.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      © 2025 TambayFind. All rights reserved.
    </div>  
  </div>
</body>
</html>
`;

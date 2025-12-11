import "dotenv/config";
import transporter from "../configs/nodemailer.config";
import { SendEmailOption } from "../type";

const generateSendOTPTemplate = (email: string, otp: string) => {
    return `
  <div style="
      font-family: 'Georgia', serif;
      background-color: #fdf8e7;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #e2d7c3;
      max-width: 550px;
      margin: auto;
      color: #4a3f35;
    ">
      
    <h2 style="text-align: center; margin-bottom: 10px; color: #3a2f28;">
      📖 GoodPages Verification
    </h2>

    <p style="font-size: 15px; line-height: 1.6;">
      Xin chào <strong>${email}</strong>,
    </p>

    <p style="font-size: 15px; line-height: 1.6;">
      Chúng tôi vừa nhận được yêu cầu xác minh từ tài khoản của bạn tại 
      <strong>GoodPages</strong> — nơi lưu giữ và chia sẻ niềm yêu thích sách.
    </p>

    <div style="
        background: #fffaf1;
        border-left: 4px solid #c5a46d;
        padding: 16px;
        margin: 24px 0;
        border-radius: 4px;
        text-align: center;
      ">
      <p style="margin: 0 0 6px; font-size: 14px;">Mã OTP của bạn:</p>
      <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 6px;
          color: #8b5e34;
        ">
        ${otp}
      </div>
      <p style="margin-top: 8px; font-size: 14px; color: #7a6a58;">
        Mã này sẽ hết hạn sau <strong>5 phút</strong>.
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6;">
      Nếu bạn không yêu cầu mã này, hãy bỏ qua email.  
      Tài khoản của bạn vẫn an toàn — giống như một cuốn sách quý trong thư viện được khóa cẩn thận.
    </p>

    <p style="margin-top: 30px; font-size: 14px; color: #6b5b4a; text-align: center;">
      Trân trọng,<br>
      <strong>GoodPages Team</strong>
    </p>

    <hr style="margin-top: 26px; border: none; border-top: 1px dashed #c5b8a5;">
    <p style="font-size: 12px; text-align: center; color: #8d816f;">
      Đây là email tự động, vui lòng không trả lời lại.
    </p>
  </div>
  `;
}

const sendEmail = async ({ to, subject, html, text }: SendEmailOption) => {
    const mailOptions = {
        from: `"GoodPages" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(">>> email info:", info);
    return info;
}

export {
    sendEmail,
    generateSendOTPTemplate
}
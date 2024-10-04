import nodemailer from 'nodemailer';

export const createTransporter = () => {
  // Create and return a reusable transporter object using the default SMTP transport
  return nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    // service: 'sandbox.smtp.mailtrap.io', // Use your email provider or SMTP details
    port: 587,
    auth: {
      user: process.env.EMAIL_USER, // Environment variable for the email
      pass: process.env.EMAIL_PASSWORD // Environment variable for the password
    }
  });
};

export const sendEmail = async (
  to: string,
  propertyName: string,
  username: string,
  inspectionDate: string,
  meetLink: string
) => {
  const transporter = createTransporter();

  // Set up email options
  const mailOptions = {
    from: `support@cribins.com`, // Sender email
    to, // Recipient email
    subject: `${propertyName} Inspection`, // Email subject
    html: `sandbox.smtp.mailtrap.io
    <div className="bg-gray-50 p-6 font-sans text-gray-800">
    <div className="bg-blue-600 text-white p-4 text-center rounded-t-lg">
      <h1 className="text-2xl font-bold">${propertyName} Inspection</h1>
    </div>
    <div className="bg-white p-6 rounded-b-lg shadow-lg">
      <p className="text-lg">Hello ${username},</p>
      <p className="mt-4">
       We are pleased to inform you that a virtual inspection for <span className="font-semibold">${propertyName}</span> has been scheduled.
      </p>
      <p className="mt-4">
        The virtual inspection is set to take place on <span className="font-semibold">${inspectionDate}</span>.
      </p>
       <div className="mt-4">
              You can join the inspection via Google Meet using the link below:
            </div>
            <Button
              href={${meetLink}}
              className="bg-blue-600 text-white py-2 px-4 rounded mt-6 block text-center hover:bg-blue-700"
            >
              Join Virtual
              </Button>
              </div>
              </div>

      <p className="mt-4">
      Please make sure you are available at the scheduled time, and ensure you have a stable internet connection. If you need to reschedule, feel free to contact us.
      </p>
      <div className="mt-6">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">View Property Details</button>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        If you have any questions, feel free to reply to this email or contact us at support@cribins.com.
      </p>
    </div>
    <div className="bg-gray-100 text-center py-4 mt-4 rounded-b-lg">
      <p>&copy; 2024 Cribins. All rights reserved.</p>
    </div>
  </div>
    
    
    ` // HTML content
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

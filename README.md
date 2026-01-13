# Developer Portfolio

A personal portfolio built with Next.js, Tailwind CSS, and MongoDB.

Live Demo: [https://port-folio-sigma-teal.vercel.app/#about]

## Tech Stack

*   **Framework:** Next.js
*   **Styling:** Tailwind CSS, SCSS
*   **Database:** MongoDB
*   **Email Service:** Nodemailer (Gmail SMTP)
*   **Hosting:** Vercel / Netlify

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd PortFolio
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Environment Configuration

Create a \`.env.local\` file in the root directory. This file is ignored by git and contains your secrets.

**Copy the following into \`.env.local\` and fill in the values:**

\`\`\`env
NEXT_PUBLIC_GTM = 
NEXT_PUBLIC_APP_URL = http://localhost:3000

# Telegram Notification (Optional)
TELEGRAM_BOT_TOKEN = 
TELEGRAM_CHAT_ID = 

# Email Service (Required for Contact Form)
# Use an App Password for Gmail, not your login password
EMAIL_ADDRESS = your_email@gmail.com
GMAIL_PASSKEY = your_gmail_app_password

# Database (Required)
# Ensure the password in the URI is URL-encoded (e.g., @ -> %40)
MONGODB_URI = mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=DataBase
\`\`\`

### 4. Run the development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  **Important:** Go to **Settings > Environment Variables** in Vercel.
4.  Add all the variables from your \`.env.local\` (especially `MONGODB_URI`, `EMAIL_ADDRESS`, `GMAIL_PASSKEY`).
5.  Deploy.

### MongoDB Atlas Whitelist

If you deploy to Vercel/Netlify, their IP addresses change dynamically. You must allow access from anywhere in MongoDB Atlas.

1.  Go to MongoDB Atlas > Network Access.
2.  Add IP Address.
3.  Select **Allow Access from Anywhere** (`0.0.0.0/0`).
4.  Confirm.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

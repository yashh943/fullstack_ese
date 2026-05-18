# AI-Based Employee Performance Analytics & Recommendation System

This is a complete MERN stack application designed for HR professionals to manage employees, track performance, view analytics, and generate AI-powered insights, rankings, and recommendations.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, React Router, Recharts, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT Auth
- **AI Integration**: OpenRouter (using Mistral 7B)

---

## 🚀 Setup Instructions

### 1. MongoDB Setup (MANUAL STEP)
You need a MongoDB database to run this project.
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. Create a new cluster and click "Connect".
3. Add your IP address to the Network Access list.
4. Create a database user and password.
5. Copy the connection string (it looks like `mongodb+srv://<username>:<password>@cluster0.mongodb.net/...`).

### 2. OpenRouter API Setup (MANUAL STEP)
You need an OpenRouter key for AI features.
1. Go to [OpenRouter](https://openrouter.ai/) and create an account.
2. Navigate to Keys and generate a new API Key.
3. Copy the key.

### 3. Environment Variables (MANUAL STEP)
Create a `.env` file in the `server` folder.
You can copy `.env.example` to `.env`:

```env
PORT=5000
MONGODB_URI=paste_your_mongodb_connection_string_here
JWT_SECRET=create_any_random_secret_string_here
OPENROUTER_API_KEY=paste_your_openrouter_api_key_here
FRONTEND_URL=http://localhost:5173
```

---

## 💻 Installation & Running Locally

1. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Seed Dummy Data (Optional but recommended)**
   ```bash
   cd server
   node seeder.js
   ```

3. **Start Backend Server**
   ```bash
   cd server
   npm start
   ```

4. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

5. **Start Frontend Dev Server**
   ```bash
   cd client
   npm run dev
   ```

Open your browser and navigate to `http://localhost:5173`.
You can sign up for a new account, or if you ran the seeder script, you can sign in with any email (or register a new one).

---

## ☁️ Deployment Guide (Render)

This project is configured for easy deployment on [Render](https://render.com/).

1. **Push code to GitHub (MANUAL STEP)**
   - Create a new repository on GitHub.
   - Run the following commands in the root folder:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```

2. **Deploy on Render (MANUAL STEP)**
   - Sign in to Render and click **New > Blueprint**.
   - Connect your GitHub repository.
   - Render will detect the `render.yaml` file and automatically create both the Backend API and Frontend Static Site.
   
3. **Configure Environment Variables on Render (MANUAL STEP)**
   - Once the services are created in Render, go to the Dashboard for your `ai-employee-analytics-api` service.
   - Go to the **Environment** tab.
   - Add your `MONGODB_URI` and `OPENROUTER_API_KEY` (Render does not sync these from `render.yaml` for security reasons).
   - Once the frontend is deployed, copy its URL and set it as `FRONTEND_URL` in the backend's environment variables.
   - Go to your `ai-employee-analytics-client` service on Render, go to the Environment tab, and update `VITE_API_URL` to point to your new Render backend URL (e.g., `https://ai-employee-analytics-api.onrender.com/api`).

---

## 🧪 API Testing
A `postman_collection.json` file is located in the `server` folder.
You can import this directly into Postman or Thunder Client to test all backend routes.

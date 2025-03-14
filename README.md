# 🎵 Lyric Match

**Lyric Match** is a full-stack web application that challenges users to guess the title of an English song based on a short snippet of its lyrics, generated using the Gemini API.

---

## 🚀 Features
- AI-generated lyric snippets using the Gemini API.
- Interactive UI with hints and answer checking.
- Professional styling using **Tailwind CSS**.
- Fully responsive design.
- Hints displayed progressively.

---

## 🏗️ Tech Stack
**Frontend:**  
- React (with Vite)  
- Tailwind CSS  

**Backend:**  
- Node.js (with Express.js)  
- Gemini API (LLM integration)  
- dotenv (for environment variables)  

---
### Installation

1. **Clone the repository**

```bash
 git clone https://github.com/madhuusudhan/Lyric-Match.git
```
2. **Set up backend**

      a. Go to the backend folder 

    
       cd lyric-match/backend

      b. Install dependencies

       npm install

      c. Create a .env file and add your Gemini API key:

       GEMINI_API_KEY=your-gemini-api-key

      d. Start the backend server 
        
        npm run dev
3.**Set up Frontend**


   a. Go to the frontend folder 

    
    cd lyric-match/frontend

  b. Install dependencies

    npm install

  c. Set up Vite proxy (in vite.config.js):

        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';
        export default defineConfig({
                plugins: [react()],
                server: {
                    proxy: {
                        '/api': 'http://localhost:3000',
        },
    },
    });


  d. replace ```${import.meta.env.VITE_API_URL}```and Start the frontend server 
        
      npm run dev

### 🌍 Deployment
hosted on [render](https://lyricmatch.onrender.com/)
## API Endpoints

### 1. Fetch Lyrics
- **Method:** `GET`
- **Endpoint:** `/api/fetchLyrics`
- **Description:** Fetches a short snippet of song lyrics and hints.

**Example Response:**
```json
{
  "message": "Lyrics fetched successfully",
  "snippet": "Sample lyrics snippet...",
  "hints": ["Artist: Sample Artist", "Year: 2022"]
}
```
### 2.Check Answer

- **Method:** `POST`  
- **Endpoint:** `/api/check-answer`  
- **Description:** Compares the user’s guess with the actual song title.  

**Request Body:**  
```json
{
  "userAnswer": "Song Title",
  "actualTitle": "Correct Song Title"
}
```
**✅ Correct Answer:**
```json 
{
  "isCorrect": true,
  "message": "Correct Answer!"
}
```
**❌ InCorrect Answer:**
```json 
{
  "isCorrect": false,
  "message": "Wrong Answer!"
}
```

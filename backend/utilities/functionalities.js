import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompts, songs } from "./text.js";
import { configDotenv } from "dotenv";
configDotenv();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getRandomSong = () => songs[Math.floor(Math.random() * songs.length)];

export const fetchLyrics = async (req, res) => {
    const song = getRandomSong();
    const prompt = {
        contents: [
            {
                parts: [
                    { text: `${prompts[0]}` },
                    { text: `Song Details:
                        Title: ${song.title}
                        Artist: ${song.artist}
                        Year: ${song.year}` }
                ]
            }
        ]
    };

    try {
        const output = await model.generateContent(prompt);
        const result = output.response.text().trim();  
        res.status(200).json({
            message: "Lyrics fetched successfully",
            snippet: result,
            hints: [
                 `Sung by ${song.artist}`,
                 `It was released in the year ${song.year}`,
            ],
            actualTitle: song.title,
        });
    } catch (error) {
        console.error("Error generating lyrics:", error);
        res.status(500).json({ message: "Error generating lyrics" });
    }
};

export const checkAnswer = async (req, res) => {
    const { userAnswer, actualTitle } = req.body;

    const prompt = {
        contents: [
            {
                parts: [
                    { text: `${prompts[1]}` },
                    { text: `User's Answer: ${userAnswer}` },
                    { text: `Correct Answer: ${actualTitle}` }
                ]
            }
        ]
    };

    try {
        const output = await model.generateContent(prompt);
        const result = output.response.text().trim();

        const isCorrect = result.toLowerCase().includes("true");
        res.status(200).json({
            message: "Answer checked successfully",
            isCorrect,
            response: result
        });
    } catch (error) {
        console.error("Error verifying answer:", error);
        res.status(500).json({ message: "Error verifying answer" });
    }
};

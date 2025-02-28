import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import OpenAI from "openai/index.mjs";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_NAME = process.env.DB_NAME;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Everything is fine" });
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

// SSE Endpoint
app.get("/recipeStream", (req, res) => {
  const ingredients = req.query.ingredients;
  console.log(req.query);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send messages
  const sendEvent = (chunk) => {
    let chunkResponse;
    if (chunk.choices[0].finish_reason === "stop") {
      res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    } else {
      if (
        chunk.choices[0].delta.role &&
        chunk.choices[0].delta.role === "assistant"
      ) {
        chunkResponse = {
          action: "start",
        };
      } else {
        chunkResponse = {
          action: "chunk",
          chunk: chunk.choices[0].delta.content,
        };
      }
      res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`);
    }
  };

  const prompt = [];
  prompt.push("Generate a recipe that incorporates the following ingredients:");
  prompt.push(`[Ingredients: ${ingredients}]`);

  prompt.push(
    "Please provide a recipe, including  title, description, ingredients, and the cooking instructions. Description should 1 sentence long and recipe should not be longer than 200 words. Use clear markers like 'Title:', 'Description:', 'Ingredients:', and 'Instructions:'"
  );

  const messages = [
    {
      role: "system",
      content: prompt.join(" "),
    },
  ];
  fetchOpenAICompletionsStream(messages, sendEvent);

  req.on("close", () => {
    res.end();
  });
});

async function fetchOpenAICompletionsStream(messages, callback) {
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const aiModel = "gpt-4-1106-preview";
  try {
    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: messages,
      temperature: 1,
      stream: true,
    });

    for await (const chunk of completion) {
      callback(chunk);
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    throw new Error("Error fetching data from OpenAI API.");
  }
}

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@recipe-generator.6fdup.mongodb.net/`
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

import Groq from "groq-sdk";

// Initialize the Groq client using the environment variable
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default groq;

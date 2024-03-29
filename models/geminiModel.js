const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");

dotenv.config({ path: "./config.env" });

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

exports.geminiApi = catchAsync(async (path, mimeType) => {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt =
    "From the prescription provided give a small analysis of the patient's health condition.";

  const prompt2 =
    "Give a small health suggestion for the patient based on the prescription provided.";

  const imageParts = [fileToGenerativePart(path, mimeType)];

  const condition = await model.generateContent([prompt, ...imageParts]);
  const conditionResponse = await condition.response;
  const conditionText = conditionResponse.text().replace(/\*\*|\*/g, "");

  const suggestion = await model.generateContent([prompt2, ...imageParts]);
  const suggestionResponse = await suggestion.response;
  const suggestionText = suggestionResponse.text().replace(/\*\*|\*/g, "");

  return { conditionText, suggestionText };
});

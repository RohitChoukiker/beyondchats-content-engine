
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCQaEpqRBIC_LXhtQ1Q0sPp6ohl8t3R8B4");

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/text-bison-001",
    });

    const result = await model.generateContent(
      "2 + 3 ka answer kya hai? Sirf number likho."
    );

    console.log(result.response.text());
  } catch (e) {
    console.error(e);
  }
}

test();

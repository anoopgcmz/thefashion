import { NextApiRequest, NextApiResponse } from "next";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your actual API key
const genAI = new GoogleGenerativeAI("");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
interface ImageData {
  [key: string]: {
    [itemKey: string]: string | null;
  };
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const formData = req.body;
    let message = `Based on the following details:
      Skin Tone: ${formData.skinTone},
      Hair Color: ${formData.hairColor},
      Eye Color: ${formData.eyeColor},
      Body Shape: ${formData.bodyShape},
      Occasion: ${formData.occasion},
      Season: ${formData.season},
      Gender: ${formData.genderAgeGroup}.

      Suggest 5 best ${formData.occasion} outfits in the following JSON format:
      [{
          top: "Item description",
          bottom: "Item description",
          shoes: "Item description",
          watch: "Item description",
          belt: "Item description",
          goggles: "Item description",
          jewelry: "Item description(Multiple items separated by comma)"
        }, { ... }, { ... }, { ... }, { ... }
      ]
    `;

    console.log("Form Data Received:", formData);

    try {
      const result = await model.generateContent(message);
      let response = result.response;
      let text = response.text();
      console.log("text>>>>>", text);
      // Remove the "```JSON" prefix and backticks

      let jsonParse = removeJsonTag(text);
      // Parse the JSON
      try {
        return res.status(200).json({
          message: "Successfully generated content",
          suggestion: jsonParse,
          searchParam: req.body
        });
      } catch (error) {
        console.error("Error processing suggestions:", error);
        return res.status(500).json({ message: "Error processing suggestions" });
      }
    } catch (error) {
      console.error("Error generating content:", error);
      return res.status(500).json({ message: "Error generating content" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

function removeJsonTag(jsonString: any) {
  // Remove the ```json tag and surrounding whitespaces
  const cleanedString = jsonString.replace(
    /^```(?:json|JSON| JSON)\s*|\s*(?:json|JSON)```$/g,
    ""
  );

  // Remove the last ```
  const finalString = cleanedString.replace(/```$/, "");
  console.log("finalString>>>>>>>>>>>>>>", finalString);
  // Parse the cleaned string into a JavaScript object
  return finalString;
}

async function processSuggestions(data: string): Promise<ImageData[]> {
  const parsedData = JSON.parse(data);
  const imageData: ImageData[] = [];

  for (const suggestionKey in parsedData) {
    const suggestion = parsedData[suggestionKey];
    const imageUrls: { [itemKey: string]: string | null } = {};

    for (const itemKey in suggestion) {
      const itemDescription = suggestion[itemKey];

      if (itemDescription !== "None" && itemDescription !== "N/A") {
        try {
          console.log("itemDescription>>>>", itemDescription);
          // Perform image search here and get the image URL
          // Replace `performImageSearch` with your image search function
          const imageUrl = await performImageSearch(itemDescription);
          imageUrls[itemKey] = imageUrl;
        } catch (error) {
          console.error(`Error searching for ${itemDescription}:`, error);
          imageUrls[itemKey] = null;
        }
      } else {
        imageUrls[itemKey] = null;
      }
    }

    imageData.push({ [suggestionKey]: imageUrls });
  }

  return imageData;
}

async function performImageSearch(description: string): Promise<string | null> {
  // Implement your image search logic here
  // Return the URL of the found image or null if not found
  return null;
}

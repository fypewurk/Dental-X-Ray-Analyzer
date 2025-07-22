
interface AnalyzeXRayParams {
  imageBase64: string;
  mimeType: string;
  prompt: string;
}

// This function sends your request to your Render backend (not the model directly)
export const analyzeDentalXrayViaProxy = async ({
  imageBase64,
  mimeType,
  prompt,
}: AnalyzeXRayParams): Promise<string> => {
  try {
    const response = await fetch("https://api-fyp.onrender.com/analyze-xray", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64, mimeType, prompt }),
    });

    const data = await response.json();

    if (response.ok && data.result) {
      return data.result;
    } else {
      throw new Error(data.error || "Unknown error from backend");
    }
  } catch (error: any) {
    console.error("Error calling backend:", error);
    throw new Error(error.message || "Something went wrong");
  }
};


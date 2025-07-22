
export const SERVICE_MODEL_NAME = "service-2.5-flash-preview-04-17"; // Multi-modal model for image analysis

export const DENTAL_ANALYSIS_PROMPT = `
Analyze the provided dental X-ray image in detail.
Output your analysis as a single, valid JSON object. Do not include any text outside of this JSON object, including markdown fences or any other explanatory text.
Crucially, ensure all property names (keys) in the JSON object are enclosed in double quotes.
All string values must be enclosed in double quotes. Any special characters within strings (like newlines, quotes, backslashes) MUST be properly escaped (e.g., \\n, \\", \\\\). Pay close attention to the 'description' fields.

If an array (like "detectedConditions") contains multiple objects, ensure these objects are separated by commas.
Crucially, there must be NO trailing comma after the last element in an array.
Crucially, there must be NO trailing comma after the last key-value pair in an object.

The JSON object MUST conform to the following structure:
{
  "imageQuality": "string (Possible values: 'Good', 'Fair', 'Poor, blurry', 'Not a dental X-ray', 'Invalid image format or corrupted'. Describe the quality.)",
  "summary": "string (A brief overall summary. If 'imageQuality' is 'Not a dental X-ray' or 'Invalid image format or corrupted', explain this here and state that analysis cannot proceed. If the X-ray is valid and no issues are found from the list of detectable conditions, state 'No significant abnormalities detected among the analyzed conditions.' Otherwise, summarize key findings.)",
  "detectedConditions": [
    // This array MUST be EMPTY if 'imageQuality' indicates the image is not a dental X-ray or is invalid.
    // If the X-ray is valid but no specific issues from the list are found, include ONE object where "conditionName" is "No Significant Abnormalities".
    // Otherwise, for each detected issue from the list below, add an object:
    {
      "conditionName": "string (MUST be one of: 'Dental Caries', 'Periodontal Disease', 'Periapical Abscess', 'No Significant Abnormalities')",
      "location": "string (e.g., 'Occlusal surface of tooth #14', 'Interproximal between #3 and #4', 'Apex of tooth #8', 'Mandibular left molar region'. Use 'N/A' if 'conditionName' is 'No Significant Abnormalities'.)",
      "severity": "string (e.g., 'Incipient', 'Moderate', 'Advanced', 'Mild', 'Severe'. Use 'N/A' if 'conditionName' is 'No Significant Abnormalities'.)",
      "description": "string (Detailed description of the finding. If 'conditionName' is 'No Significant Abnormalities', this should be a positive confirmation, e.g., 'The X-ray shows no visual evidence of dental caries, significant periodontal bone loss, or periapical abscesses according to the analysis criteria.' If this array is empty due to image quality issues, the 'summary' field should explain this.)"
    }
    // Only include objects for 'Dental Caries', 'Periodontal Disease', 'Periapical Abscess', or a single 'No Significant Abnormalities' entry.
  ],
  "recommendations": "string (Provide general observations or areas for further consideration. If 'imageQuality' is 'Not a dental X-ray', this can be brief, e.g., 'Please upload a valid dental X-ray image for analysis.' If no issues, 'Regular dental check-ups are recommended.' Avoid direct medical advice.)"
}

Based on the visual evidence in the X-ray, identify and describe:
1.  **Dental Caries (Cavities):** Note location, estimated size, and severity.
2.  **Periodontal Disease:** Note signs such as significant alveolar bone loss.
3.  **Periapical Abscesses:** Identify clear radiolucencies at tooth apices.

If the image is clearly not a dental X-ray or is of such poor quality that analysis is impossible, set 'imageQuality' and 'summary' appropriately, leave 'detectedConditions' as an empty array, and provide a recommendation to upload a better image.
Ensure the entire output is ONLY the JSON object as specified.
Do NOT include any disclaimer field or text in your JSON output.
Do NOT include any markdown formatting (e.g., \`\`\`json) around the JSON output.
`;

export const APP_NAME = "Dentalyze Care";
export const MAX_HISTORY_ITEMS = 20; // Maximum number of history items to keep
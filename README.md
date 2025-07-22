# Dentalyze Care - AI-Powered Dental X-Ray Analyzer

Dentalyze Care is an intelligent web application designed to assist dental professionals and patients by providing AI-powered analysis of dental X-ray images. It aims to identify potential dental conditions such as cavities, periodontal disease, and periapical abscesses, offering a preliminary assessment to support clinical decision-making and patient education.

## Key Features

*   **AI-Powered X-Ray Analysis:** Upload dental X-ray images (JPEG, PNG, WEBP) to receive an automated analysis identifying potential dental issues.
*   **User Roles:** Separate workflows and features for Patients and Dentists.
*   **Patient Management (for Dentists):** Dentists can create and manage profiles for their patients, including name, age, gender, phone, email, and medical notes.
*   **Analysis History:** Securely stores analysis reports for each user (and per patient for dentists) in browser local storage.
*   **Visual Overlays:** Displays visual cues (red for concerns, green for healthy highlights) directly on the X-ray image based on AI findings.
*   **Image Zoom & Pan:** Detailed examination of X-rays with zoom and pan capabilities.
*   **X-ray Comparison (for Dentists):** Allows dentists to compare two X-ray analyses for a single patient side-by-side.
*   **PDF Report Generation:** Users can download detailed analysis reports in PDF format, with an option for dentists to include company branding (name and logo).
*   **Report Sharing:** Options to share report summaries and guide users on sharing downloaded PDFs via email or messaging apps.
*   **Responsive Design:** Optimized for use on desktops, tablets, and mobile devices, featuring a user-friendly interface.
*   **FAQ Section:** Provides answers to common questions about the application and dental health.
*   **Secure Authentication:** Mock user authentication and profile management. (Note: This is a demo; real-world applications require robust backend authentication).

## How It Works

1.  **User Signup/Login:** Users create an account or log in, specifying their role (Patient or Dentist).
2.  **Image Upload:** Users upload a dental X-ray image. Dentists can associate the analysis with a specific patient.
3.  **AI Processing:** The uploaded image is sent to an advanced AI model for analysis. The AI looks for predefined dental conditions and assesses image quality.
4.  **View Report:** The user receives a structured report detailing the AI's findings, including a summary, list of detected conditions (with severity and location), recommendations, and visual overlays on the X-ray.
5.  **History & Management:** Reports are saved to the user's history. Dentists can access and manage reports for all their patients.

## Technologies Used

*   **Frontend:** React, TypeScript, TailwindCSS
*   **AI Analysis:** Leverages a powerful multi-modal AI model for image interpretation (details abstracted in the app).
*   **PDF Generation:** jsPDF, html2canvas
*   **Routing:** Hash-based client-side routing
*   **State Management:** React Context API
*   **Local Storage:** Used for storing user profiles, analysis history, and preferences (for demo purposes).

## Project Structure (Key Directories)

*   `components/`: Reusable UI components (Navbar, Buttons, Modals, etc.)
*   `pages/`: Top-level page components (Login, Signup, Analyzer, History, etc.)
*   `contexts/`: React context providers (e.g., AuthContext)
*   `types.ts`: TypeScript type definitions and interfaces.
*   `constants.ts`: Application-wide constants (e.g., AI model name, prompts).
*   `App.tsx`: Main application component handling routing and layout.
*   `index.tsx`: Entry point for the React application.

## Getting Started / Running Locally (Illustrative)

(This is a conceptual guide as the actual execution environment like API key setup is external to this codebase.)

1.  **Prerequisites:** Node.js, npm/yarn.
2.  **API Key:** An API key for the AI analysis service must be configured as an environment variable (e.g., `API_KEY`).
3.  **Installation:** `npm install` or `yarn install`.
4.  **Running:** `npm start` or `yarn start`.

## Disclaimer

Dentalyze Care is a demonstration project and should be used for educational and illustrative purposes only. It is NOT a substitute for professional dental advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or seen on this application. The AI analysis provided is for informational purposes only and may not be completely accurate or up-to-date.

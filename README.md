-----Setup Instructions-----
Frontend Setup (React + TypeScript)
1. Clone the repository: git clone <your-repository-url>
2. cd Reso-frontend , cd Reso
3. Install dependencies: npm install
4. Run the development server: npm run dev  , The frontend should be accessible at http://localhost:5173 (Vite default port).
Backend Setup (Django + Django Rest Framework)
1. Navigate to the backend directory: cd Reso-backend , cd resoproject
2. Create a virtual environment and activate it: python -m venv venv
3. source venv/bin/activate  # On Windows: venv\Scripts\activate
4. Install dependencies: pip install -r requirements.txt
5. Run database migrations: python manage.py migrate
6. Start the development server: daphne resoproject.asgi:application   The backend should be running at http://127.0.0.1:8000/api/.

----Architecture Overview----
The application consists of two main components:
1. Frontend (React + TypeScript): Handles the user interface, allowing users to input text, trigger analysis, and view/download results.
2. Backend (Django + Django Rest Framework): Processes requests, caches responses, and interacts with the AI-powered research paper analysis agent.
Workflow:
* The user inputs a research paper or text into the frontend.
* The text is sent via API to the backend.
* The backend checks if the result is cached.
* If not cached, the AI agent processes the request asynchronously.
* The result is sent back to the frontend and displayed to the user.
* Users can download the analysis result as a text file.


----API Documentation----
Analyze Research Paper
Endpoint: POST /api/research-paper-agent/
Request:
{
  "query": "<research paper text>"
}
Response:
{
  "result": "<AI-generated analysis>"
}
Error Responses:
* 400 Bad Request if the query parameter is missing.
* 500 Internal Server Error if an unexpected error occurs.
* 405 Method Not Allowed if the request method is not POST.

----Running Instructions----
1. Ensure both frontend and backend are running:
    * Start the Django backend: python manage.py runserver
    * Start the React frontend: npm run dev
2. Open the application in a browser:
    * Visit http://localhost:5173
3. Paste a research paper or text into the input box.
4. Click the 'Analyze' button to trigger AI analysis.
5. View the result and download it if needed.






# 🎨 StoryWeaver AI



<h3 align="center">A real-time, collaborative storyboarding tool that turns your text prompts into beautiful comic book panels using the power of AI.</h3>

<p align="center">
  <a href="https://storyweaver-ai-umber.vercel.app/"><strong>View Live Demo »</strong></a>
</p>
<br>


## 📖 About The Project

StoryWeaver AI was built to make visual storytelling fast, fun, and accessible to everyone, regardless of artistic skill. It transforms the slow, traditional process of creating storyboards into a dynamic, real-time brainstorming session.

Users can create a private room, invite friends with a unique code, and take turns writing text prompts. For each prompt, our AI generates a unique, comic-style illustration, building a visual narrative live for everyone in the room. The application leverages an AI-powered context engine to summarize the story so far, ensuring that new panels are thematically and narratively connected to the previous ones.

## ✨ Key Features

- **Real-Time Collaboration:** New panels appear instantly for all users in a room without needing a refresh, powered by Supabase Realtime.
- **AI-Powered Illustration:** No art skills required! Simply write a prompt, and the AI generates a comic book-style panel.
- **AI Story Context:** An AI text model generates a summary of previous panels to provide context for new image generations, creating a more coherent story.
- **Turn-Based System:** A structured, turn-based system ensures everyone gets a chance to contribute to the story.
- **User Authentication & Profiles:** Secure user sign-up and login, with customizable usernames for a personal touch.
- **Shareable Rooms:** Create a room and invite friends with a simple, easy-to-share code.
- **Interactive Comic View:** View your final creation in a fun, flippable "comic book" format.

## 🛠️ Built With

This project is a full-stack application composed of a Spring Boot backend and a React frontend.

**Backend:**
- **Java 17** & **Spring Boot 3**
- **Spring Security** (for JWT authentication)
- **PostgreSQL** (managed by Supabase)
- **JPA / Hibernate**
- **Maven**

**Frontend:**
- **React (Vite)**
- **Tailwind CSS**
- **shadcn/ui** for components
- **Supabase.js** for authentication and real-time subscriptions
- **React Router** for navigation

**Services:**
- **Supabase:** Used for database, authentication, and file storage.
- **Render:** Hosting for the Spring Boot backend.
- **Vercel:** Hosting for the React frontend.
- **Pollinations.ai:** The free, public API for both text and image generation.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Java JDK 17 or later
- Maven
- Node.js and npm
- A Supabase account (for database, auth, and storage keys)

### Backend Setup (Spring Boot)

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/karannn3011/swaibackend.git](https://github.com/karannn3011/swaibackend.git)
    cd swaibackend
    ```
2.  **Configure Environment Variables:**
    Your `application.properties` file contains placeholders for secrets. For local development, you can fill them in directly. For production, these should be set as environment variables.

    * `spring.datasource.url`: Your Supabase Postgres connection string.
    * `spring.datasource.username`: Your Supabase username.
    * `spring.datasource.password`: Your Supabase password.
    * `api.supabase.url`: Your Supabase project URL.
    * `api.supabase.key`: Your Supabase `service_role` key.
    * `api.supabase.jwt-secret`: Your Supabase JWT secret from the API settings.

3.  **Run the application:**
    ```sh
    ./mvnw spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### Frontend Setup (React)

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/swai-frontend.git](https://github.com/your-username/swai-frontend.git)
    cd swai-frontend
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the root of your project.

    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    VITE_BACKEND_URL=http://localhost:8080
    ```
4.  **Run the application:**
    ```sh
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

## ⚠️ Potential Issues & Limitations

This project relies on free-tier services, which come with certain limitations.

-   **Backend Cold Start:** The backend is deployed on Render's free tier. If the service receives no traffic for 15 minutes, it will spin down to save resources. The next request will trigger a "cold start," which can take **30-60 seconds** to complete. During this time, the application may appear unresponsive. This is normal for free-tier hosting.

-   **Pollinations.ai API Traffic:** The AI for both text and image generation is powered by the free and public Pollinations.ai API.
    -   **High Traffic:** As a public service, the API can sometimes be slow or overloaded, which may increase the time it takes to generate a panel.
    -   **Generation Failures:** Occasionally, an API request may fail. The backend has fallbacks in place (e.g., using a simpler context model if the summary generation fails), but image generation is a critical step.

-   **Supabase Realtime:** The real-time updates are generally very fast but depend on a persistent WebSocket connection. Unstable network conditions could cause a temporary delay in seeing updates from other users.

## 🔮 Future Enhancements

This project has a solid foundation, but there's always more to build!
-   [ ] **Panel Management:** Allow users to delete or edit the panels they created.
-   [ ] **Export to PDF:** Add a feature to download the final storyboard as a shareable PDF document.
-   [ ] **Style Selection:** Allow users to choose from different AI art styles (e.g., "Anime," "Fantasy," "Vintage").
-   [ ] **Improved "Story So Far":** Display the full text of the story in a scrollable view in addition to the AI summary.
-   [ ] **Social Logins:** Integrate Supabase's social providers (Google, GitHub, etc.) for easier sign-up.

---

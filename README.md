Wanderlust — Full-Stack Social Travel Experience Platform

Wanderlust is a community-driven full-stack web platform that reimagines travel sharing as a social experience.
It enables users to post listings, share genuine reviews, and explore destinations through interactive maps — encouraging discovery and meaningful connections through user-generated travel insights.

Overview:
The platform allows travelers to explore places, contribute reviews, and share their own travel experiences.
Each listing displays details such as images, price, location, and average reviews, making it a collaborative space for travel inspiration.
The platform combines social interaction with technical precision, providing secure user management, data consistency, and responsive UI design.

Core Features:
 User Interaction: Add, edit, and view travel listings with descriptions, pricing, and photos.
 Review System: Users can post, edit, or delete reviews, contributing authentic feedback for each location.
 Map Integration: Integrated Mapbox API for visualizing destinations and Mapbox SDK for forward geocoding to convert location names into coordinates.
 Image Management: Integrated Cloudinary Cloud Service for smooth image upload, optimization, and storage.
 Authentication and Authorization: Implemented using Passport.js, sessions, and cookies for secure login, signup, and access control.
Validation and Error Handling: Utilized JOI, custom middleware, and error classes for both client-side and server-side validation.
 Database Design: Demonstrated one-to-many relationships between users, listings, and reviews using MongoDB and Mongoose.
 Architecture: Structured using the MVC design pattern for clear separation of logic, views, and data.
 Responsive Interface: Ensured seamless experience across devices using Bootstrap, Flexbox, and CSS Grid.
 Deployment: Hosted using Render with cloud database support from MongoDB Atlas for scalability and performance.

Tech Stack:
Frontend: HTML5, CSS3, JavaScript, EJS, Bootstrap, Flexbox
Backend: Node.js, Express.js
Database: MongoDB with Mongoose ORM
APIs and Services: Mapbox API, Mapbox SDK, Cloudinary Cloud
Tools and Platforms: Git, GitHub, Postman, Render, VS Code

System Design:
The platform follows the Model–View–Controller (MVC) architecture:
 Model: Defines MongoDB schemas and manages data relationships.
 View: Uses EJS templates to dynamically render pages with real-time content.
Controller: Handles business logic, API routes, and integrates middleware for authentication and validation.

Key Implementation Details:
RESTful APIs for CRUD operations across listings and reviews.
Session-based authentication ensuring persistent user state.
Flash messages for success and error notifications.
Integration of asynchronous operations for smooth user interactions.
Cloud-based hosting ensuring scalability and secure access.

Learning and Impact:
Building Wanderlust strengthened practical understanding of:
Full-stack application design and deployment.
Integrating third-party APIs and SDKs.
Structuring scalable backends with authentication and authorization.
Applying clean code principles through MVC architecture.

The project demonstrates end-to-end development capabilities — from conceptualization to deployment — blending creativity, usability, and technical depth.

Wanderlust connects travelers through stories, not just destinations — turning exploration into a shared experience.



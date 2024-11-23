<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/S-rita/CoBoard">
    <img src="public/asset/CoBoard logo.svg" alt="Logo" width="120" height="96">
  </a>

  <h3 align="center">CoBoard</h3>
  <p align="center">
    Sharing experiences, building connections
    <br />
    <a href="https://github.com/S-rita/CoBoard"><strong>Explore the website »</strong></a>
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1GP1ge3sabx0YefPhYAnaxp_8LnZK4FVE/view?usp=sharing](https://drive.google.com/file/d/1PcZQyWVcSHfrf6EWLGcHIsE90407ENfR/view?usp=sharing)">View         Project Proposal</a>
    ·
    <a href="https://drive.google.com/file/d/13H1JuaXmO9BBSlrIlJ6MPjIMKE22xkeQ/view?usp=sharing](https://drive.google.com/file/d/1oyPSvoJpw9nYJvPkbLoMyT1JTwiv8Oml/view?usp=sharing)">View         Project Report</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#web_frameworks">Web Frameworks</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#running_the_Website">Running the Website</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
    <li><a href="#resources">Resources</a></li>
  </ol>
</details>

<!-- OVERVIEW -->
## Overview

CoBoard is a forum platform designed for Software Engineering students at King Mongkut's Institute of Technology Ladkrabang (KMITL). It combines the structure of traditional forums with the convenience of chat platforms, offering organized spaces for academic and non-academic discussions. Key sections include Admission, Alumni, Student Discussion, Education, and Class Work, each catering to specific needs like networking, resource sharing, or assignment management. With room privacy options, structured layouts, and assignment tools, CoBoard fosters a dynamic and efficient communication environment for students and faculty.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- WEB FRAMEWORKS -->
## Web Frameworks
<ul>
  <li><b>Backend: FastAPI</b> <br />
  FastAPI handles backend logic with high performance and asynchronous programming, ensuring efficient request handling. It offers automatic API documentation, supports file uploads, and uses CORSMiddleware for secure communication with React.</li>
  <br />
  <li><b>Frontend: React</b> <br />
  React's component-based architecture enables reusable UI elements, with React Router for navigation and state management for dynamic updates. Axios and Fetch handle seamless communication with the backend.</li>
    <br />

  <li><b>Styling: Tailwind CSS</b> <br />
  Tailwind CSS provides utility-first classes for rapid, responsive design. Custom themes ensure a consistent and polished interface across the app.</li>
    <br />

  <li><b>Database: PostgreSQL with SQLAlchemy</b> <br />
  PostgreSQL ensures robust data management with scalability and JSON support, while SQLAlchemy facilitates seamless CRUD operations and schema alignment with FastAPI models.</li>
    <br />

  <li><b>Integration</b> <br />
  FastAPI, SQLAlchemy, PostgreSQL, React, and Tailwind CSS integrate seamlessly, ensuring efficient backend logic, smooth data flow, responsive design, and a cohesive user experience.</li>
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
  
<!-- INSTALLATION -->
## Installation
1. Clone or download the game source files.
    ```sh
    npm install
    ```
2. Install the following in the terminal of the project directory (or only install the program that you don't have):
    ```sh
    pip install fastapi sqlalchemy pydantic uvicorn python-multipart psycopg2-binary
    ```
3. Download <a href="https://nodejs.org/en">Node.js</a> and <a href="https://www.postgresql.org/download/">PostgreSQL</a> on your computer.
4. Create tables for the database:
5. Open the server.py file located in the directory named directory. Replace the DATABASE_URL with your PostgreSQL credentials:

    ```sh
    DATABASE_URL = "postgresql://<username>:<password>@<hostname>/<database_name>"
    ```
    Example:
    ```sh
    DATABASE_URL = "postgresql://admin:adminpassword@localhost/mydatabase"
    ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Running the Website -->
## Running the Website
1. Open a terminal and navigate to the game directory.
2. Start the server by running the PostgreSQL in the background.
3. Run the game using the following command on different terminals:
  ```sh
  uvicorn main:app --reload
  ```
  ```sh
  npm start
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Troubleshooting -->
## Troubleshooting
* npm install Fails - Ensure Node.js and npm are installed:

   ```sh
   node -v
   npm -v
   ```
   If not, install them from <a href="https://nodejs.org/en">Node.js downloads</a>.
* Backend Not Loading - verify the PostgreSQL is running.
* Frontend Not Loading - verify the backend is running on http://localhost:3000.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Resources -->
## Resources
You can access the assets via Google Drive: https://drive.google.com/drive/folders/1F8u_wM0iy6mErJhwEeLC3bOi7ccVDwkT?usp=sharing  <be>

<!-- Contributions -->
## Created by
* Sarita Manopatana
* Natavee Pecharat

<p align="right">(<a href="#readme-top">back to top</a>)</p>

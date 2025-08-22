# metal_rate_app

# Task
1. Metal Master (Static Data)
• Metals such as Gold, Silver, and Platinum should be managed as static data.
• Use this static list in dropdowns or autocomplete fields throughout the application.

2. Purity Management (CRUD)
• Implement Create, Read, Update, and Delete functionality for Purity records.
• Each Purity must be linked to a Metal (selected from the static Metal list).
• Use a Select or Autocomplete input for selecting the Metal.
• Store data in MongoDB using Mongoose.
• Ensure proper form validation and a user-friendly interface.

3. Metal Rate Management
• Based on the selected Metal and Purity:
o If a previous rate exists, fetch and display the latest rate (read-only or as a note).
o If no prior rate exists, display empty fields for new entry.
• Allow the user to input a new rate using a textbox and select the rate date using a date picker.
• All entries should be saved as new documents in the database; do not overwrite existing
records.
• Maintain historical data for metal rates (rate history).

Optional Features (Bonus)
• Implement search and filter capabilities for Metal Rates based on Metal and Purity.
• Add server-side pagination for the Metal Rate listing.

Tech Stack
• Frontend: React.js with MUI, Tailwind CSS, or Bootstrap.
• Backend: Node.js with Express.js.
• Database: MongoDB.
• Authentication: JWT token-based or any custom security standard.


CLone url = https://github.com/Kapil-kd/metal_rate_app.git


# Frontend

File name - fe 

# Setup Frontend (React)
cd fe

npm install

To start - npm start

# .env in Client
Add (REACT_APP_SERVER=http://localhost:5000) in env file to connect locally.

Change baseURL(process.env.REACT_APP_SERVER/api/auth/) in fe/src/auth.js 

Change baseURL(process.env.REACT_APP_SERVER/api) in fe/src/authService.js 

Change baseURL(process.env.REACT_APP_SERVER/api/metalRates) in fe/src/metalRate.js

Change baseURL(process.env.REACT_APP_SERVER/api/purities) in fe/src/purity.js 


# Backend

File name - be

# Setup Backend 
cd be

npm install

To Start - npm start

# .env in Server
PORT = 5000

MONGO_URI = mongodb://localhost:27017 (Connect the mongodb locally)

JWT_SECRET = your_super_secret_key

# Routes
Signup - POST - api/auth/signup

Login - POST - api/auth/login

Login verify - GET - api/auth/loginverify

Logout - GET - api/auth/logout 

Purities - GET - /api/purities/

Purities - POST - /api/purities/

Purities - PUT - /api/purities/:id

Purities - DELETE - /api/purities/:id

MetalRates - GET - /api/metalRates/latest

MetalRates - POST - /api/metalRates/

MetalRates - GET - /api/metalRates/






























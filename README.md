# 💡 Playwright End-to-End Test Suite for DailyFinance

This project contains an end-to-end automated test suite for [https://dailyfinance.roadtocareer.net](https://dailyfinance.roadtocareer.net) using **Playwright**. It validates full user workflows including registration, login, item management, profile updates, password resets, and email validations.

---

## ✅ Features Covered

### 🔐 User Registration
- Register a new user with a random email and secure password.
- Assert successful toast message.
- Validate email delivery with Gmail API (checks "Congratulations" mail).

### 📥 Login & Item Management
- Login with newly registered user.
- Add **2 random cost items**.
- Validate both items appear in the cost list.

### 🧑‍💼 Profile Update
- Upload profile image in profile settings.
- Assert success dialog.
- Logout.

### 🔁 Password Reset
- Use **"Reset it here"** link to reset the password.
- Extract reset link from Gmail inbox.
- Submit new password.
- Login with updated password.
- Assert successful login.

### ❌ Negative Test Case

 - Attemp user Registration avoiding mandatory test fields (eg:firstname)
       `"Please fill out this field."`
 - Attemp user Registration with invalid email
        `"Only Gmail addresses are accepted."`
 - Attempt user Login with invalid credentials
       `"Invalid email or password."`
 - Attempt password reset by passing empty email field and assert the following error
      `"Please fill out this field."`
 - Attempt password reset using an **unregistered email**.
- Assert the appearance of the error message:  
  `"Your email is not registered"`.

---

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/afsanakashpia/Playwright_JS.git
   cd Playwright_JS

### How to Run   
2.Run it using the following command on terminal in VS Code 
 
  ``` npx playwright test ```

### Allure Report Screenshot

<img width="916" alt="playwright" src="https://github.com/user-attachments/assets/9a29c6e8-6a34-4dd9-a03c-4eb268400bd4" />


## 📂 Folder Structure

```bash
Playwright_Assignment/
├── tests/
│   ├── 1_RegistrationTestRunner.spec.js
│   ├── 2_LoginTestRunner.spec.js
│   ├── 3_UserPageRunner.spec.js
│   ├── 4_ResetPasswordRunner.spec.js
├── pages/
│   └── LoginPage.js
│   └── RegistrationPage.js          <-- Page Object Model
├── Utils/
│   ├── userData.json                <-- Stores test user data
│   └── utils.js
│   └── images
          └── sample.jpg        <-- Profile photo to upload                                        
├── playwright.config.js
└── README.md 







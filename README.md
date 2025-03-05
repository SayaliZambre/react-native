
1️⃣ Setup Firebase Cloud Messaging (FCM) in React Native
Firebase Cloud Messaging (FCM) allows you to send push notifications to React Native applications. Below is a detailed step-by-step guide on how to integrate FCM in a React Native project.

Step 1: Create a Firebase Project
Go to the Firebase Console and create a new project.
Follow the setup process and enable Firebase Cloud Messaging (FCM).
Once the project is created, navigate to Project Settings → Cloud Messaging to manage FCM settings.

Step 2: Install Firebase Packages in React Native
To integrate Firebase services into your React Native project, install the required Firebase libraries. These libraries handle authentication, notifications, and other Firebase functionalities.
Install Firebase core services and messaging modules using npm or yarn.
These libraries allow the React Native app to send and receive push notifications through FCM.

Step 3: Android Setup
a) Add google-services.json to the Android App
In Firebase Console, go to Project Settings → General.
Under Your Apps, select Android and register the app using the package name.
Download the google-services.json file.
Move this file to your React Native project inside the android/app/ directory.
b) Modify android/build.gradle
Add the Google services classpath dependency inside the dependencies section.
This ensures that Firebase services can be used in the Android project.
c) Modify android/app/build.gradle
Apply the Google services plugin at the bottom of the file.
This step is necessary to integrate Firebase services properly.
d) Modify AndroidManifest.xml for Permissions
Add the required permissions to allow notifications, internet access, and receive boot notifications.
Define the Firebase Messaging Service inside the <application> tag to handle incoming push notifications.
e) Enable MultiDex in android/app/build.gradle
Enable MultiDex inside defaultConfig.
This helps resolve potential issues related to method count limitations in Android apps.

Step 4: iOS Setup
a) Enable Push Notifications in Xcode
Open the project in Xcode.
Go to Signing & Capabilities and enable the Push Notifications capability.
b) Add GoogleService-Info.plist to Xcode
In Firebase Console, go to Project Settings → iOS.
Download the GoogleService-Info.plist file.
Move it into the iOS project folder inside ios/YourApp/.
c) Install CocoaPods
Navigate to the ios/ directory and run the command to install dependencies.
CocoaPods ensures that all necessary Firebase dependencies are properly installed.

Step 5: Request Notification Permissions in React Native
To enable push notifications in a React Native app using Firebase Cloud Messaging (FCM), the app must request permission from the user. This step ensures that the app can receive and display notifications. Additionally, the app retrieves a unique FCM Token, which is essential for targeting notifications to specific devices.

1️. Requesting Notification Permissions
Before an app can send or receive push notifications, it must ask the user for permission. This process varies based on the operating system:
Android: Most Android devices allow notifications by default, but starting from Android 13 (API level 33), apps must explicitly request notification permissions.
iOS: iOS requires users to grant permission before an app can send notifications. If the user denies the request, the app cannot send notifications until the user manually enables them in settings.
How It Works
The app prompts the user with a request to allow notifications.
The response is stored in the app, determining whether notifications are allowed.
The permission status is checked to decide the next step.

2️. Checking the User’s Response
Once the user responds to the permission request, the app needs to evaluate the status. There are three possible outcomes:
Authorized: The user has explicitly allowed the app to send notifications.
Provisional (iOS only): The user has granted temporary permission. The app can send notifications, but they appear silently in the Notification Center without sound or banners.
Denied: The user has declined notification access. In this case, notifications cannot be sent until the user manually enables them in the device settings.
Why is this important?
If the user grants permission, the app can proceed with retrieving the FCM Token to receive notifications.
If the user denies permission, the app may prompt them later or provide an option to enable notifications in the app settings.

3️. Handling the User’s Response
Once the permission status is checked, the app takes appropriate action:
If permission is granted: The app retrieves the FCM Token.
If permission is denied: The app logs a message indicating that notifications are blocked. Optionally, it can guide the user to enable notifications manually in settings.
Why does this matter?
The FCM Token is necessary to receive notifications.
If the user denies permissions, the app should handle it gracefully (e.g., showing a message explaining why notifications are important).

4️. Retrieving the FCM Token
An FCM Token is a unique identifier assigned to each device by Firebase. It is essential for sending notifications to specific users or devices.
How It Works
Firebase generates a unique token when the app is installed.
The app retrieves this token and stores it (e.g., in a database or cloud server).
When a notification is sent, Firebase uses this token to deliver the message to the correct device.
Key points about FCM Tokens:
They are unique for each installation of the app.
If the user reinstalls the app, the token may change.
Tokens must be securely stored to ensure proper notification delivery.

5️. What is an FCM Token?
The FCM Token acts as a unique address for each device, allowing Firebase to send notifications to the correct recipient.
Why is the FCM Token Important?
It ensures that notifications are sent only to the intended users.
Apps use this token to send targeted messages (e.g., personalized offers, alerts, updates).
Without an FCM Token, Firebase cannot send notifications to a device.

6. Requesting Permission on App Start
To improve the user experience, apps should request notification permissions as soon as they are launched. This ensures:
The user is prompted early in the experience.
If the user has already granted permissions, the app retrieves the FCM Token immediately.
Refer: https://github.com/evollu/react-native-fcm
https://www.magicbell.com/blog/how-to-implement-react-native-push-notifications-with-firebase
Step 2️⃣: Generate & Store FCM Token in PostgreSQL 
🔹 Why Store the FCM Token?
When a user installs the React Native app on their device, Firebase Cloud Messaging (FCM) generates a unique token for that device.
This token is used to send push notifications to the specific user.
Storing the token in PostgreSQL allows the backend to manage notifications efficiently, ensuring messages reach the intended users.

📌  How the Process Works: FCM Token Generation, Storage, and Management in React Native with PostgreSQL
To enable push notifications in a React Native app using Firebase Cloud Messaging (FCM), the app must generate an FCM token, send it to the backend, and store it in a PostgreSQL database. This process ensures the app can communicate with a user’s device efficiently.
1️⃣ Generating the FCM Token in React Native
How the App Gets an FCM Token
App Initialization: When the app starts, it requests a unique FCM token from Firebase.
Permission Check: Before Firebase provides a token, the app verifies if the user has granted notification permissions.
If permission is granted, the app proceeds to request the FCM token.
If permission is denied, the app logs the issue and may prompt the user later.
Token Request from Firebase: If permissions are granted, Firebase provides a unique token that identifies the device.
Why is the FCM Token Important?
The FCM token acts as a unique address for a device.
Firebase uses this token to route notifications to the correct device.
The token may change if:
The app is reinstalled.
The user clears app data.
Firebase refreshes the token.
2️⃣ Sending the FCM Token to the Backend
Once the FCM Token is generated, it must be sent to the backend along with the user ID
Why is the User ID Needed?
Each user should have one or more FCM tokens linked to their account.
The user ID ensures that the token belongs to the correct user.
This allows the backend to send personalized notifications.
3️⃣ Storing the FCM Token in PostgreSQL
Once the backend receives the FCM Token, it must store it in a PostgreSQL database.
Steps for Storing the Token
Check if the user already has an existing token in the database.
If a token exists, update it with the latest one (tokens may change over time).
If no token exists, insert a new record for the user.
Database Table Structure
The database table should include:
user_id: Links the token to a specific user.
fcm_token: Stores the Firebase Cloud Messaging token.
created_at: Tracks when the token was first added.
updated_at: Updates whenever the token changes.
If a token already exists for the user, it should be updated rather than creating duplicate entries.
4️⃣ Ensuring Database Efficiency
To efficiently store and manage FCM tokens, follow best practices:
🔹 Use Proper Indexing
Indexing on user_id improves search performance and retrieval speed.
🔹 Handle Expired or Invalid Tokens
Firebase provides a way to detect invalid tokens (e.g., if a user uninstalls the app).
The backend should periodically check and remove invalid tokens.
🔹 Allow Multiple Devices per User (Optional)
If users log in from multiple devices, the system should allow storing multiple tokens per user.
This ensures notifications reach all active devices.

REF: https://www.geeksforgeeks.org/how-to-retrieve-and-save-the-fcm-device-token-to-the-realtime-firebase-storage/
https://firebase.google.com/docs/cloud-messaging/manage-tokens


Step 3️⃣: Create Backend API to Store FCM Tokens in PostgreSQL 

🔹 Purpose of This Step
Before sending notifications, we need a way to store users' FCM tokens in a database.
Each device gets a unique token from Firebase, which can change over time.
The backend API ensures that every user has an up-to-date token stored in PostgreSQL.

📌 Steps to Implement the Backend API
To send notifications using Firebase Cloud Messaging (FCM) in a React Native app with PostgreSQL as the backend, we need to store and manage users' FCM tokens. This backend API will ensure that each user's FCM token is properly saved and updated whenever needed.

1️⃣ Set Up PostgreSQL Table
Before we start with API development, we need a database table to store FCM tokens.
What should be stored?
User ID: A unique identifier for the user (e.g., email, phone number, or a database-generated ID).
FCM Token: A unique identifier assigned by Firebase to each device, used to send push notifications.
Unique Constraint on User ID: Ensures that each user has only one active FCM token at a time.
Why is this necessary?
Each device has a different token.
If a user logs in on multiple devices, we may need to handle multiple tokens per user.
If a user logs out or switches devices, their old token should be updated to prevent sending notifications to inactive devices.

2️⃣ Create an Express.js Server
We need a backend server to handle FCM token storage and management.
Why use Express.js?
Lightweight and fast framework for handling API requests.
Works well with PostgreSQL using query libraries like pg-promise or node-postgres.
Can handle real-time updates efficiently.
What will the Express server do?
Listen for requests from the React Native app.
Accept FCM tokens from the frontend and store them in the database.
Update tokens when they change.

3️⃣ API to Save FCM Tokens
How does this API work?
The React Native app sends a request to the backend with:
User ID (to identify which user owns the token).
FCM Token (to send push notifications).
The backend checks if the user already exists in the database:
If the user exists: Update the existing token.
If the user does not exist: Insert a new record.
The API responds with a success message if the token is saved.
Why is this important?
Users can receive notifications on only their active device.
Firebase changes tokens frequently, so we must update them dynamically.

4️⃣ Handle Database Operations Efficiently
Why do we need efficient database operations?
Checking if a user exists before inserting would require two queries (SELECT + INSERT/UPDATE).
Instead, we use UPSERT logic to automatically update or insert the token in a single query.
What does UPSERT do?
If the user already exists, the token gets updated.
If the user doesn’t exist, a new record is inserted.
Prevents duplicate entries and keeps the database clean.
Advantages of UPSERT:
✔ Faster execution (one query instead of two).
✔ No duplicate FCM tokens stored for the same user.
✔ Automatically updates old tokens when a user switches devices.

5️⃣ Return API Response
After processing the request, the API should return a response to the React Native app.
Possible API Responses:
✅ Success Message: If the token was saved or updated.
❌ Error Message: If there was a database issue (e.g., connection failure).
The response helps the frontend verify whether the token was successfully stored.

6️⃣ Start the Server
Once the API is ready, we start the server so it can begin listening for requests.
What happens next?
The React Native app calls the API every time a user logs in or reinstalls the app.
The backend stores the token and keeps it up-to-date.
We can now fetch these stored tokens when sending push notifications.

4️⃣ Send Notifications to a Single User
Once we have stored FCM tokens in the database, the next step is to send push notifications to individual users based on their unique user ID.

1️⃣ Purpose of This API
This API allows the backend to fetch the FCM token of a specific user from the database and use Firebase Cloud Messaging (FCM) to send them a notification.
When is this useful?
Order Updates: "Your order has been shipped!"
Personal Alerts: "Your appointment is confirmed."
Security Warnings: "New login detected on your account."
Reminders: "Don’t forget to check your daily report."

2️⃣ Backend API for Sending Notifications
The backend API is responsible for:
Receiving a notification request from the frontend (React Native app).
Fetching the user’s FCM token from the PostgreSQL database.
Sending the notification to the user using Firebase Cloud Messaging (FCM).
Returning a response to confirm whether the notification was successfully sent.

3️⃣ Steps in API Execution
Step 1: Receive Notification Request
The frontend sends a request containing:
User ID (to identify the recipient).
Notification Title (e.g., "Hello!").
Notification Body (e.g., "Your order has been shipped.").
Step 2: Fetch User’s FCM Token
The API searches the fcm_tokens table in PostgreSQL.
If a token is found, proceed to send the notification.
If no token is found, return an error: "User not found."
Step 3: Prepare Notification Data
Firebase Cloud Messaging (FCM) requires the following:
"to" → User’s FCM token (retrieved from the database).
"notification" → Object containing title and body.
Step 4: Send Notification via FCM
The API sends the notification data to the Firebase FCM endpoint (https://fcm.googleapis.com/fcm/send).
The request must include an Authorization header with the Firebase Server Key to verify the sender.
Step 5: Return API Response
If the notification is sent successfully, return: "Notification sent successfully."
If something goes wrong (e.g., invalid token, network error), return: "Notification failed."

4️⃣ Sending Request from the Frontend
How does the frontend trigger notifications?
The React Native app calls the backend API with:
User ID (e.g., '12345').
Title (e.g., 'Hello!').
Message (e.g., 'Your order has been shipped.').
The backend retrieves the user’s FCM token and sends the notification.
The React Native app does not directly interact with FCM; it only communicates with the backend.




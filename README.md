# Pantry Tracker App

## Overview
This Pantry Tracker App is a Next.js application designed to help users manage their pantry inventory efficiently. It utilizes Firebase for database management and user authentication, providing a secure and personalized experience for each user.

## Features

### User Authentication
- Secure login and signup using Firebase Authentication
- Personalized inventory management for each user

### Inventory Management
- Add new items to your pantry inventory
  - Specify item name and quantity
- Remove items from the inventory
- Automatically update item quantities

### Search Functionality
- Search for specific items in your inventory
- Searched items appear at the top of the list for easy access
- Highlight effect on searched items (disappears after 3 seconds)

### Sorting Options
- Sort items alphabetically by name
- Sort items by quantity (ascending or descending)
- Toggle between sorting methods with a single click

### Real-time Database
- All inventory changes are instantly saved to Firebase
- Data persists across sessions and devices

### User Interface
- Clean and intuitive design using Material-UI components
- Responsive layout for various screen sizes

## Technical Details

- **Framework**: Next.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **UI Library**: Material-UI
- **State Management**: React Hooks (useState, useEffect)

## How It Works

1. **User Login/Signup**: Users start by authenticating through Firebase.
2. **View Inventory**: Upon login, users see their current pantry inventory.
3. **Add Items**: Users can add new items, specifying name and quantity.
4. **Remove/Update Items**: Existing items can be removed or their quantities updated.
5. **Search**: Users can search for specific items. The searched item will appear at the top of the list and be highlighted for 3 seconds.
6. **Sort**: Users can sort their inventory alphabetically or by quantity.

## Screenshots


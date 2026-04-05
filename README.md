# Interactive Profile Management Card

A responsive Angular application that displays and manages a user profile card with Rive animations.

## Live Features
- Load user data from a local JSON file (simulating MongoDB structure)
- Edit profile fields (name, role, location, email, bio)
- Toggle notification and privacy settings
- Save changes to localStorage
- Rive animation that reacts to user interaction (triggers on Save button hover)
- Reset profile to original data

## Tech Stack
- Angular 18 (Standalone Components)
- CSS (no frameworks)
- Rive (@rive-app/canvas) for animation
- localStorage for data persistence
- HttpClient for JSON loading

## Data Structure (MongoDB Format)
The `public/data/data.json` file simulates a MongoDB document with:
- Nested objects: `settings.notifications.email`
- Arrays: `skills[]`
- MongoDB types: `$oid`, `$date`

## Rive Animation
- File: `public/animations/avatar.riv`
- Source: [Personal Avatar by brynjar](https://rive.app/s/j4N6a5tvQ0_gjyQ6Rs8Deg)
- Trigger: `clicked` input fires when hovering over the Save Changes button

## Design Reference
UI Kit: [Profile Setting Page UI by Raheel Khan - Figma Community](https://www.figma.com/community/file/1373795528590192311/profile-setting-page-ui)

The interface was inspired by this Figma UI kit, adapting the layout and components to match the technical requirements of the task.

## Getting Started
```bash
npm install
ng serve
```

Open http://localhost:4200

## Save Changes
Changes are saved to `localStorage` and logged to the browser console in MongoDB Extended JSON format.
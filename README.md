# Fitness Gym — React + Firebase

This project converts the supplied HTML Codex Fitness template into a React/Vite application while preserving the original Bootstrap/CSS/images.

## 1. Install

```bash
npm install
```

## 2. Firebase

Create a Firebase project and enable:

- Authentication → Email/Password
- Realtime Database

Copy `.env.example` to `.env` and add the Firebase Web App configuration.

## 3. Run

```bash
npm run dev
```

## 4. Real-time features included

- Member registration/login
- Course data subscription from `/courses`
- Real-time member bookings
- Contact/enquiry storage
- Newsletter subscription storage

## Suggested Firebase data

```text
courses/
  courseId/
    name
    trainer
    day
    time
    icon

bookings/
  bookingId/
    uid
    courseId
    courseName
    memberName
    status
    createdAt

contactMessages/
  messageId/
    name
    email
    phone
    message
    status
    createdAt
```

The original template assets are under `public/template`.

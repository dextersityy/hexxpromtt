# **App Name**: Promptify

## Core Features:

- User Roles & Permissions: Implements a role-based access control (RBAC) system with roles such as Guest, User, Prompter, Moderator, and Admin, each having different permissions on prompt viewing, copying, uploading, and moderation, stored in Firestore.
- Copy Prompt Functionality: Allows logged-in users to copy prompts, incrementing counters for both the prompt and the user in Firestore to track prompt popularity and user contributions; non-logged-in users are prompted to log in via Google.
- Gamification System: Automatically promotes users to the 'Prompter' role when their prompts reach a total copy count of 1000 or more, updating their role in Firestore and sending a notification using Cloud Functions or Next.js API routes.
- Admin & Mod Panel: Provides a protected dashboard for Admins and Moderators to review pending prompts, approve/reject prompts with reasons, manage prompt categories, and manage user roles using CRUD operations in Firestore.
- Auth & Onboarding Flow: Manages user authentication via Google login, creating user documents in Firestore with a default 'user' role and a copy counter when a new user logs in for the first time.
- Upload & Review Cycle: Enables users to upload prompts with details such as title, description, and category, storing them in Firestore with a 'pending' status; prompts from Admins/Prompters are automatically approved, while others go through a moderation process.
- Social Interaction (Follow & Feed): Allows users to follow other users, updating follower and following counts in Firestore, and enabling users to view prompts specifically from the users they follow in a dedicated 'Following' feed.

## Style Guidelines:

- Primary color: Strong purple (#9D51E5) evoking sophistication.
- Background color: Very light purple (#F4F0F9) - same hue as primary, greatly desaturated, for a light scheme.
- Accent color: Blue (#519DE5), analogous to purple, with differing saturation and brightness.
- Headline font: 'Space Grotesk' sans-serif for a computerized, techy feel, matched with 'Inter' as the body font.
- Simple, minimalist icons to represent different prompt categories and actions (copy, like, share).
- Clean, card-based layout for prompts, emphasizing readability and ease of navigation.
- Subtle, unobtrusive animations for copying prompts, liking, and transitioning between pages.
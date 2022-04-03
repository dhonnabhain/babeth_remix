# Babeth

Simplified calendar and family reminder based on Google Calendar and [Supabase](https://supabase.com/).

## Requirements
To use this project, make sure you are using the following:

- Node >= 16
- Google shared calendar
- Google Cloud Platform project with ID Clients OAuth 2.0 for Web and Account Service
- Supabase account

## Install & launch
> :warning: This project does not provide any kind of authentication else than the Google SSO.

- Copy `.env.example` to `.env.local` and fill empty fields
- Launch `npm i && npn run dev`
- In the Supabase SQL editor, run query from the `/migrations` folder
- Access app using  `http://127.0.0.1:3000`
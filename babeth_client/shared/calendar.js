const { google } = require('googleapis')

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.NEXT_GOOGLE_CALENDAR_EMAIL,
    private_key: process.env.NEXT_GOOGLE_CALENDAR_SECRET
  },
  scopes: ['https://www.googleapis.com/auth/calendar']
})

const calendar = google.calendar({
  version: 'v3',
  auth
})

export default calendar

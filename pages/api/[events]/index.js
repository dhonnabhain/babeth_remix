import Calendar from '../../../shared/calendar'
import {
  addDays,
  startOfDay,
  endOfDay,
  formatISO,
  parseISO,
  addHours
} from 'date-fns'

const period = {
  today: {
    timeMin: formatISO(startOfDay(new Date())),
    timeMax: formatISO(endOfDay(new Date()))
  },
  next: {
    timeMin: formatISO(addDays(startOfDay(new Date()), 1)),
    timeMax: formatISO(addDays(endOfDay(new Date()), 2))
  },
  later: {
    timeMin: formatISO(addDays(startOfDay(new Date()), 3))
  }
}

function eventDateFactory(date, end = false) {
  const parsed = parseISO(date)

  return formatISO(end ? addHours(parsed, 1) : parsed)
}

async function getEvents(req) {
  return Calendar.events.list({
    calendarId: process.env.NEXT_GOOGLE_CALENDAR_ID,
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    ...period[req.query.type]
  })
}

async function storeEvent(req) {
  return Calendar.events.insert({
    calendarId: process.env.NEXT_GOOGLE_CALENDAR_ID,
    resource: {
      summary: req.body.title,
      start: {
        dateTime: eventDateFactory(req.body.date),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: eventDateFactory(req.body.date),
        timeZone: 'Europe/Paris'
      }
    }
  })
}

export default async function handler(req, res) {
  let gRes = null

  console.log(process.env.NEXT_GOOGLE_CALENDAR_ID)

  try {
    switch (req.method) {
      case 'GET':
        const events = await getEvents(req)
        gRes = events.data.items
        break
      case 'POST':
        await storeEvent(req)
        gRes = { success: true }
        break
    }

    return res.status(200).json(gRes)
  } catch (e) {
    return res.status(500)
  }
}

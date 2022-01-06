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

function getEvents(req, res) {
  Calendar.events.list(
    {
      calendarId: process.env.NEXT_GOOGLE_CALENDAR_ID,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
      ...period[req.query.type]
    },
    (err, events) => {
      return res.status(200).json(events.data.items)
    }
  )
}

function storeEvent(req, res) {
  Calendar.events.insert(
    {
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
    },
    err => {
      return res.status(200).json({ success: true })
    }
  )
}

export default function handler(req, res) {
  if (req.method === 'GET') return getEvents(req, res)
  if (req.method === 'POST') return storeEvent(req, res)
}

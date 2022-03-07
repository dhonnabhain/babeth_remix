import Calendar from '../../../shared/calendar'

function onDelete(req, res) {
  Calendar.events.delete({
    calendarId: process.env.NEXT_GOOGLE_CALENDAR_ID,
    eventId: req.query.event
  })

  return res.status(200).json({ success: true })
}

export default function handler(req, res) {
  if (req.method === 'DELETE') return onDelete(req, res)
}

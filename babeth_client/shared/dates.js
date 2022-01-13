import { addDays, addHours, startOfHour } from 'date-fns'
import { utcToZonedTime, format } from 'date-fns-tz'
import { fr } from 'date-fns/locale'
import upperFirst from 'lodash.upperfirst'

export function getFormat(today = false) {
  return today ? `HH:mm` : 'EEEE dd MMMM y'
}

export function formatDate(date, today = false, ) {
  const formatedDate = format(
    utcToZonedTime(date, 'Europe/Paris'),
    getFormat(today),
    {
      locale: fr
    }
  )

  if (today) return formatedDate

  return formatedDate
    .split(' ')
    .map(part => upperFirst(part))
    .join(' ')
}

export function formatBirthday(date) {
  const formatedDate = format(
    utcToZonedTime(date, 'Europe/Paris'),
    'dd/MM/y',
    {
      locale: fr
    }
  )

  return formatedDate
    .split(' ')
    .map(part => upperFirst(part))
    .join(' ')
}

export function addEventDefaultDate(type) {
  const date = new Date()

  if (type === 'today') {
    date = addHours(date, 1)
  }

  if (type === 'next') {
    date = addDays(date, 1)
  }

  if (type === 'later') {
    date = addDays(date, 3)
  }

  return format(startOfHour(date), "yyyy-MM-dd'T'HH:mm", {
    awareOfUnicodeTokens: true
  })
}

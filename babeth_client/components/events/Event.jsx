import React, { useState } from 'react'
import Colors from '../../shared/colors.json'
import { useTranslation } from 'react-i18next'
import { formatDate } from '../../shared/dates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export default function Event({ type, event }) {
  const { t } = useTranslation()
  const isToday = type == 'today'
  const [date] = useState(formatDate(event.start.dateTime, isToday))
  const [isDeleting, setDeleting] = useState(false)

  const displayDate = isToday ? `${t('todayAt')} ${date}` : date
  const deleteContent = isDeleting ? (
    <div className="space-x-5">
      <FontAwesomeIcon icon="spinner" className="animate-spin mr-4" />
      {t('deleting')}
    </div>
  ) : (
    t('delete')
  )

  async function onDelete() {
    setDeleting(true)
    await axios.delete(`/api/events/${event.id}`)
  }

  return (
    <article
      className={`rounded-lg p-4 space-y-8 shadow-lg ${Colors[type].section.header}`}
    >
      <header className="space-y-2">
        <h4 className="text-2xl font-semibold text-gray-700 max-w-full overflow-clip">
          {event.summary}
        </h4>
        <h3 className={`text-xl font-black ${Colors[type].section.date}`}>
          {displayDate}
        </h3>
      </header>

      <div className="w-full flex justify-end">
        <button
          type="button"
          aria-label="Annuler l'événement"
          disabled={isDeleting}
          className={`inline-flex px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            isDeleting
              ? 'text-white bg-gray-400'
              : 'text-white bg-red-600 hover:bg-red-700'
          }`}
          onClick={onDelete}
        >
          {deleteContent}
        </button>
      </div>
    </article>
  )
}

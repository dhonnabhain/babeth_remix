import React from 'react'
import Event from './Event'
import Colors from '../../shared/colors.json'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import fetcher from '../../shared/fetcher'
import NoEvent from './NoEvent'
import AddEvent from './AddEvent'

export default function Events({ type }) {
  const { t } = useTranslation()
  const { data, error } = useSWR(['/api/events', type], fetcher, { refreshInterval: 999999995000 })

  if (error) return <div>Nope</div>
  if (!data) return <div>loading...</div>
  if (data.length === 0)
    return (
      <div>
        <h2 className={`text-4xl font-semibold mb-4 ${Colors[type].title}`}>
          {t(type)}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NoEvent type={type} />
        </div>
      </div>
    )

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className={`self-center text-4xl font-semibold ${Colors[type].title}`}>
          {t(type)}
        </h2>
        <AddEvent type={type} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map(gEvent => (
          <Event type={type} event={gEvent} key={gEvent.iCalUID} />
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Greetings({ session }) {
  const { t } = useTranslation()

  return (
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">
      {t('greetings')}{' '}
      {session
        ? session.user.identities[0].identity_data.full_name.split(' ')[0]
        : ''}
      <span className="ml-2">👋🏻</span>
    </h2>
  )
}

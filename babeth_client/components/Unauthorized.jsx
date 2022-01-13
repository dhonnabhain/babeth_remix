import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Unauthorized() {
  const { t } = useTranslation()

  return (
    <div className='text-center mt-12'>
      <h2 className="text-4xl font-black tracking-wide text-gray-900 leading-12">
        {t('unauthorized.title')}
      </h2>
      <p className='text-gray-600 text-left mt-1'>{t('unauthorized.subtitle')}</p>
    </div>
  )
}

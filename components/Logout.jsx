import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { supabase } from '../plugins/supabase'
import { useRouter } from 'next/router'

export default function Logout({ isViewer }) {
  const { t } = useTranslation()
  const router = useRouter()

  async function logout() {
    await supabase.auth.signOut()
    router.push('/', undefined, { shallow: true })
  }

  return isViewer ? null : (
    <button
      onClick={e => {
        e.preventDefault()
        logout()
      }}
      aria-label="déconnexion"
      className="mb-4 sm:mb-0 flex space-x-6 sm:space-x-0 sm:px-6 items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
    >
      <div className="sm:hidden">{t('logout')}</div>
      <FontAwesomeIcon
        size="2x"
        icon="sign-out-alt"
        className="self-center sm:self-auto"
      />
    </button>
  )
}

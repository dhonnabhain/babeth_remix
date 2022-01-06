import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import Events from '../../components/events/Events'
import Today from '../../components/Today'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../plugins/supabase'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Greetings from '../../components/Greetings'
import Link from 'next/link'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const foundSession = supabase.auth.session()
    if (!foundSession) router.push('/')

    setSession(foundSession)
  }, [])
  useEffect(() => {
    document.querySelector('body').classList.add('bg-purple-50')
    document.querySelector('body').classList.add('antialiased')
  })

  async function logout() {
    await supabase.auth.signOut()
    router.push('/', undefined, { shallow: true })
  }

  return (
    <main className="space-y-8 p-6">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
        <div className="space-y-1">
          <Greetings session={session} />
          <Today />
        </div>

        <Link href="/app/family">Go to the family</Link>

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
      </div>

      <Events type="today" />
      <Events type="next" />
      <Events type="later" />
    </main>
  )
}

import React, { useEffect, useState } from 'react'
import Events from '../../components/events/Events'
import Today from '../../components/Today'
import { supabase } from '../../plugins/supabase'
import { useRouter } from 'next/router'
import Greetings from '../../components/Greetings'
import Link from 'next/link'
import axios from 'axios'
import Logout from '../../components/Logout'
import { t } from 'i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [isViewer, setIsViewer] = useState(false)

  useEffect(() => {
    const foundSession = supabase.auth.session()
    if (!foundSession) router.push('/')

    axios
      .post('/api/canAccess', { email: foundSession.user.email })
      .then(res => {
        if (!foundSession) {
          router.push('/')
        } else {
          setSession(foundSession)
          axios
            .post('/api/isViewer', { email: foundSession.user.email })
            .then(res => setIsViewer(res.data.viewer))
        }
      })
      .catch(res => router.push('/'))
  }, [])

  useEffect(() => {
    document.querySelector('body').classList.add('bg-purple-50')
    document.querySelector('body').classList.add('antialiased')
  })

  return (
    <main className="space-y-8 p-6">
      {isViewer ? 'viewer' : 'pas viewer'}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
        <div className="space-y-1">
          <Greetings session={session} />
          <Today />
        </div>

        <Logout isViewer={isViewer} />
      </div>

      <Link href="/app/family">
        <button
          type="button"
          className="inline-flex items-center px-4 py-3 border-2 bg-blue-500 text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-200 hover:border-blue-100 hover:text-blue-800 transition duration-150 ease-in-out"
        >
          <span className="mr-3">{t('family.goto')}</span>
          <FontAwesomeIcon icon="users" />
        </button>
      </Link>

      <Events type="today" />
      <Events type="next" />
      <Events type="later" />
    </main>
  )
}

import React, { useEffect } from 'react'
import Events from '../../components/events/Events'
import Today from '../../components/Today'
import { supabase } from '../../plugins/supabase'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Greetings from '../../components/Greetings'
import Link from 'next/link'
import axios from 'axios'
import Logout from '../../components/Logout'

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [isViewer, setIsViewer] = useState(false)

  useEffect(() => {
    const foundSession = supabase.auth.session()
    console.log(foundSession)
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

        <Link href="/app/family">Go to the family</Link>

        <Logout isViewer={isViewer} />
      </div>

      <Events type="today" />
      <Events type="next" />
      <Events type="later" />
    </main>
  )
}

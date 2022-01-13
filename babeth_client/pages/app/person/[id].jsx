import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { supabase } from '../../../plugins/supabase'
import Link from 'next/link'

export default function PersonScreen() {
  const router = useRouter()
  console.log(router)
  const [session, setSession] = useState(null)
  const [isViewer, setIsViewer] = useState(false)
  const id = router.query.id || null

  const target = id

  const [person, setPerson] = useState(null)

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

  useEffect(() => {
    if (target) {
      supabase
        .from('people')
        .select()
        .match({ id: router.query.id })
        .then(res => {
          setPerson(res.data[0])
        })
    }
  }, [target])

  return person ? (
    <div className="space-y-6">
      <nav className="px-3 py-2">
        <Link href={'/app/family'}>
          <button
            type="button"
            className="inline-flex items-center px-4 py-3 border-2 border-blue-500 text-base font-medium rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-100 hover:border-blue-100 transition duration-150 ease-in-out"
          >
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
            <span className="ml-3">Revenir à la famille</span>
          </button>
        </Link>
      </nav>
      <main className="max-w-xl mx-auto space-y-8 p-6">
        <div className="text-center items-center mb-8 text-gray-800">
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-full object-cover ring-4 ring-blue-500"
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt=""
          />
          <h2 className=" mt-8 text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
            {person.first_name} {person.last_name}
          </h2>
        </div>
      </main>
    </div>
  ) : (
    ''
  )
}

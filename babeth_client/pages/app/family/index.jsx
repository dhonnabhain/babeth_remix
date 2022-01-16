import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../plugins/supabase'
import { useRouter } from 'next/router'
import axios from 'axios'
import Person from '../../../components/family/person'
import AddPerson from '../../../components/family/AddPerson'
import Link from 'next/link'
import { t } from 'i18next'

export default function FamilyScreen() {
  const router = useRouter()

  const [session, setSession] = useState(null)
  const [isViewer, setIsViewer] = useState(false)
  const [people, setPeople] = useState([])

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

          supabase
            .from('people')
            .select()
            .then(res => setPeople(res.data))
        }
      })
      .catch(res => router.push('/'))
  }, [])

  useEffect(() => {
    document.querySelector('body').classList.add('bg-purple-50')
    document.querySelector('body').classList.add('antialiased')
  })

  return (
    <div className="">
      <nav className="px-3 pt-2">
        <Link href={'/app'}>
          <button
            type="button"
            className="inline-flex items-center px-4 py-3 border-2 border-blue-500 text-base font-medium rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-100 hover:border-blue-100 transition duration-150 ease-in-out"
          >
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
            <span className="ml-3">{t('family.backEvents')}</span>
          </button>
        </Link>
      </nav>
      <main className="space-y-8 p-6">
        <div className="flex flex-col space-y-2 items-start mb-8 text-gray-800">
          <h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
            {t('family.title')}
          </h2>

          
        </div>

        <div>
          <div
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full"
          >
            {people.map((person, idx) => {
              return <Person key={idx} person={person} />
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

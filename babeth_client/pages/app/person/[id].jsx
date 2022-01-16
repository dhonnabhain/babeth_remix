import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { supabase } from '../../../plugins/supabase'
import Link from 'next/link'
import { t } from 'i18next'
import { formatBirthday } from '../../../shared/dates'

export default function PersonScreen() {
  const router = useRouter()

  const [session, setSession] = useState(null)
  const [isViewer, setIsViewer] = useState(false)
  const id = router.query.id || null

  const target = id
  const items = [
    { field: 'birthday', icon: 'birthday-cake' },
    { field: 'city', icon: 'building' },
    { field: 'work', icon: 'briefcase' }
  ]
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
          // setPerson(res.data[0])
          supabase.storage
            .from('people')
            .createSignedUrl(res.data[0].avatar.replace('people/', ''), 60)
            .then(({ signedURL }) => {
              // setAvatar(signedURL)
              // setIsLoading(false)

              setPerson({ ...res.data[0], avatar: signedURL })
            })
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
            src={person.avatar}
            alt=""
          />
          <h2 className=" mt-8 text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
            {person.first_name} {person.last_name}
          </h2>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {items.map(({ field, icon }) => (
                  <div key={field} className="sm:col-span-1">
                    <dt className="flex items-center space-x-3 text-xl font-medium text-gray-500">
                      <FontAwesomeIcon icon={icon} />

                      <span>{t(`person.${field}`)}</span>
                    </dt>
                    <dd className="mt-2 text-xl text-gray-900">
                      {field === 'birthday'
                        ? formatBirthday(person[field])
                        : person[field]}
                    </dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="text-xl font-medium text-gray-500">About</dt>
                  <dd className="mt-1 max-w-prose text-xl text-gray-900 space-y-5">
                    {person.biography}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    ''
  )
}

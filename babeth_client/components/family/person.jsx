import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { supabase } from '../../plugins/supabase'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatBirthday } from '../../shared/dates'

export default function Person({ person }) {
  const birthday = formatBirthday(person.birthday)
  const [avatar, setAvatar] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.storage
      .from('people')
      .createSignedUrl(person.avatar.replace('people/', ''), 60)
      .then(({ signedURL }) => {
        setAvatar(signedURL)
        setIsLoading(false)
      })
  }, [])

  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        {isLoading ? (
          <div className="w-32 h-32 flex items-center justify-center flex-shrink-0 mx-auto rounded-full object-cover ring-4 ring-blue-500 text-blue-500">
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </div>
        ) : (
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto rounded-full object-cover ring-4 ring-blue-500"
            src={avatar}
            alt=""
          />
        )}

        <h3 className="mt-10 text-gray-900 text-3xl font-medium">
          {person.first_name} {person.last_name}
        </h3>

        <dl className="flex-grow flex flex-col justify-between">
          <dt className="sr-only">Date de naissance</dt>
          <dd className="text-gray-600 text-lg font-medium space-x-3">
            <FontAwesomeIcon icon="birthday-cake" />
            <span>{birthday}</span>
          </dd>
          <Link href={`/app/person/${encodeURIComponent(person.id)}`}>
            <button className="flex items-center justify-center mt-8 px-3 py-2 text-blue-800 text-lg font-medium bg-blue-100 rounded-full shadow-xl shadow-blue-500/30 hover:bg-blue-200 transition duration-150 ease-in-out">
              <span className="mr-3">En voir plus</span>
              <FontAwesomeIcon icon="arrow-alt-circle-right" />
            </button>
          </Link>
        </dl>
      </div>
    </li>
  )
}

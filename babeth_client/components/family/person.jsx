import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatBirthday } from '../../shared/dates'
import Link from 'next/link'

export default function Person({ person }) {
  const birthday = formatBirthday(person.birthday)
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        <img
          className="w-32 h-32 flex-shrink-0 mx-auto rounded-full object-cover ring-4 ring-blue-500"
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          alt=""
        />

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

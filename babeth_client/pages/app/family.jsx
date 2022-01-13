import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Person from '../../components/family/person'

export default function FamilyScreen() {
  return (
    <div className="p-6">
      <div className="flex space-x-2 items-center mb-8 text-gray-800">
        <FontAwesomeIcon icon="users" size="2x" />
        <h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
          Membres de la famille
        </h2>
      </div>

      <div classNameName="grid sm:grid-cols-3">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <Person />
        </ul>
      </div>
    </div>
  )
}

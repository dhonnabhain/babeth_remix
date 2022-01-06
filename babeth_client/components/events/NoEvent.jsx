import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Colors from '../../shared/colors.json'
import { t } from 'i18next'
import AddEvent from './AddEvent'

export default function NoEvent({ type }) {
  return (
    <div
      className={`relative w-full border-2 border-dashed rounded-lg py-9 px-12 ${Colors[type].noEvent.border}`}
    >
      <div className="flex space-x-4 text-center mb-5">
        <FontAwesomeIcon
          icon="calendar-times"
          size="3x"
          className={`self-center ${Colors[type].noEvent.icon}`}
        />
        <span
          className={`mt-2 block text-2xl font-medium self-center ${Colors[type].noEvent.content}`}
        >
          {t('event.empty')}
        </span>
      </div>

      <AddEvent type={type} />
    </div>
  )
}

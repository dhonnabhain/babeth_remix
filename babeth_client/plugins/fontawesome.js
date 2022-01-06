import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  faCalendarPlus,
  faCalendarTimes,
  faCheckSquare,
  faCoffee,
  faPlus,
  faSignOutAlt,
  faSpinner,
  faTimes,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false

library.add(
  faGoogle,
  faCheckSquare,
  faCoffee,
  faSignOutAlt,
  faCalendarTimes,
  faSpinner,
  faCalendarPlus,
  faPlus,
  faTimes,
  faUsers
)

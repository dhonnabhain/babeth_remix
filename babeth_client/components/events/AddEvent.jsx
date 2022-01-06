import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from '@headlessui/react'
import axios from 'axios'
import { t } from 'i18next'
import { useState } from 'react'
import Colors from '../../shared/colors.json'
import { addEventDefaultDate } from '../../shared/dates'
import Input from '../Input'
import Modal from '../Modal'

export default function AddEvent({ type }) {
  const PrimaryButton = type
    ? Colors[type].addEvent.button
    : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-500/50'
  const SecondaryButton = type
    ? Colors[type].addEvent.secondary
    : 'text-sky-700 bg-sky-100 hover:bg-sky-200 shadow-sky-500/50 focus:ring-sky-500'

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState()

  function toggleModal() {
    setOpen(!open)

    if (!open) {
      setTitle('')
      setDate(addEventDefaultDate(type))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (title !== '' && date !== '') {
      axios.post('/api/events', { title, date }).then(() => {
        mutate(`/api/events?type=${type}`)
        setOpen(false)
      })
    }
  }

  return (
    <div>
      <button
        type="button"
        aria-label={t('addEvent')}
        className={`w-full text-center px-4 py-2 border border-transparent text-xl font-medium rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2  ${PrimaryButton}`}
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon="calendar-plus" className="mr-4" />
        <span>{t('event.title')}</span>
      </button>

      <Modal open={open} onClose={toggleModal}>
        <div>
          <div
            className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full ${Colors[type].addEvent.icon}`}
          >
            <FontAwesomeIcon icon="calendar-plus" size="2x" />
          </div>
          <div className="mt-3 sm:mt-5">
            <Dialog.Title
              as="h3"
              className="text-2xl leading-6 font-medium text-gray-900"
            >
              {t('event.title')}
            </Dialog.Title>

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  id="name"
                  label={t('event.name')}
                  section={type}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <Input
                  id="date"
                  label={t('event.date')}
                  type="datetime-local"
                  section={type}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:mt-10">
                <button
                  type="button"
                  className={`inline-flex justify-center items-center px-4 py-2 border border-transparent text-lg font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${SecondaryButton}`}
                  onClick={() => setOpen(false)}
                >
                  <FontAwesomeIcon icon="times" className="mr-4" />
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className={`inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-lg font-medium 0 focus:outline-none focus:ring-2 focus:ring-offset-2  ${
                    title !== '' && date !== ''
                      ? PrimaryButton
                      : 'bg-gray-100 text-gray-700  shadow-gray-500/50 focus:ring-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FontAwesomeIcon icon="plus" className="mr-4" />
                  {t('event.send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

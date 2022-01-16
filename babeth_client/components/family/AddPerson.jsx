import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from '@headlessui/react'
import { useRef, useState } from 'react'
import { t } from 'i18next'
import { supabase } from '../../plugins/supabase'
import Modal from '../Modal'
import Input from '../Input'

export default function AddPerson() {
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [birthday, setBirthday] = useState('')
  const [city, setCity] = useState('')
  const [work, setWork] = useState('')
  const [biography, setBiography] = useState('')
  const fileInput = useRef(null)

  function toggleModal() {
    setOpen(!open)

    if (!open) {
      setFirstName('')
      setLastName('')
      setAvatar('')
      setBirthday('')
      setCity('')
      setWork('')
      setBiography('')
    }
  }

  function avatarHandler(e) {
    setAvatar(e.target.files[0])
    setAvatarPreview(URL.createObjectURL(e.target.files[0]))
  }

  function sendButton() {
    return (
      <button
        type="submit"
        className={`inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-medium 0 focus:outline-none focus:ring-2 focus:ring-offset-2  ${
          firstName !== '' &&
          lastName !== '' &&
          avatar !== '' &&
          birthday !== '' &&
          city !== '' &&
          work !== '' &&
          biography !== ''
            ? 'bg-blue-100 text-blue-700  shadow-blue-500/50 focus:ring-blue-500'
            : 'bg-gray-100 text-gray-700  shadow-gray-500/50 focus:ring-gray-500 cursor-not-allowed'
        }`}
      >
        <FontAwesomeIcon icon="plus" className="mr-4" />
        {t('event.send')}
      </button>
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (
      firstName !== '' &&
      lastName !== '' &&
      avatar !== '' &&
      birthday !== '' &&
      city !== '' &&
      work !== '' &&
      biography !== ''
    ) {
      // Supabase store file
      const { data } = await supabase.storage
        .from('people')
        .upload(
          `${firstName}_${lastName}/avatar.${avatar.type.replace(
            /(.*)\//g,
            ''
          )}`,
          avatar
        )

      console.log(data)

      // Supabase insert person
      await supabase.from('people').insert([
        {
          first_name: firstName,
          last_name: lastName,
          avatar: data.Key,
          birthday,
          city,
          work,
          biography
        }
      ])
      console.log(event, avatar)
      setOpen(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        aria-label={t('addEvent')}
        className="w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/50 focus:ring-blue-500 transition duration-150"
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon="user-plus" className="mr-4" />
        <span>{t('person.title')}</span>
      </button>

      <Modal open={open} onClose={toggleModal} large>
        <div>
          <div
            className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full`}
          >
            <FontAwesomeIcon
              icon="user-plus"
              size="2x"
              className="text-blue-500"
            />
          </div>
          <div className="mt-3 sm:mt-5">
            <Dialog.Title
              as="h3"
              className="text-2xl leading-6 font-medium text-gray-900"
            >
              {t('person.title')}
            </Dialog.Title>

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  id="first-name"
                  label={t('person.firstName')}
                  section="common"
                  value={firstName}
                  small
                  onChange={e => setFirstName(e.target.value)}
                />
                <Input
                  id="last-name"
                  label={t('person.lastName')}
                  section="common"
                  value={lastName}
                  small
                  onChange={e => setLastName(e.target.value)}
                />
                <div className="sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('person.avatar')}
                  </label>
                  <div className="mt-3">
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInput}
                      onChange={avatarHandler}
                    />
                    <div className="flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {avatarPreview === '' ? (
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        ) : (
                          <img src={avatarPreview} />
                        )}
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={e =>
                          fileInput.current && fileInput.current.click()
                        }
                      >
                        {t('person.avatarChange')}
                      </button>
                    </div>
                  </div>
                </div>
                <Input
                  id="birthday"
                  label={t('person.birthday')}
                  section="common"
                  type="date"
                  value={birthday}
                  small
                  onChange={e => setBirthday(e.target.value)}
                />
                <Input
                  id="city"
                  label={t('person.city')}
                  section="common"
                  value={city}
                  small
                  onChange={e => setCity(e.target.value)}
                />
                <Input
                  id="work"
                  label={t('person.work')}
                  section="common"
                  value={work}
                  small
                  onChange={e => setWork(e.target.value)}
                />

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('person.biography')}
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={10}
                      name="biography"
                      id="biography"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue={''}
                      onChange={e => setBiography(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:mt-10">
                <button
                  type="button"
                  className={`inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  onClick={() => setOpen(false)}
                >
                  <FontAwesomeIcon icon="times" className="mr-4" />
                  {t('cancel')}
                </button>

                {sendButton()}
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

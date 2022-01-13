import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { supabase } from '../plugins/supabase'
import { useRouter } from 'next/router'
import axios from 'axios'
import Unauthorized from '../components/Unauthorized'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isUnauthorized, setIsUnauthorized] = useState(false)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        axios
          .post('/api/canAccess', { email: session.user.email })
          .then(res => router.push('/app'))
          .catch(res => {
            supabase.auth.signOut()
            setIsUnauthorized(true)
          })
      }
    })
  }, [])

  async function login() {
    await supabase.auth.signIn({ provider: 'google' })
  }

  return (
    <div>
      <Head>
        <title>Babeth</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-full sm:min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />

          {isUnauthorized ? (
            <Unauthorized />
          ) : (
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('login')}
            </h2>
          )}
        </div>

        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-md">
          <div>
            <button
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white font-medium text-gray-500 hover:bg-gray-50"
              onClick={e => {
                e.preventDefault()
                login()
              }}
            >
              <FontAwesomeIcon icon={['fab', 'google']} size="2x" />
              <p className="ml-6 self-center text-lg">{t('loginWithGoogle')}</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

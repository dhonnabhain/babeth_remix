import i18n from 'i18next'
import { useTranslation, initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      fr: {
        translation: {
          today: "Aujourd'hui",
          todayAt: "Aujourd'hui à",
          next: 'Prochains jours',
          later: 'Plus tard',
          delete: 'Annuler',
          deleting: 'Annulation en cours',
          login: 'Bonjour 👋🏻',
          loginWithGoogle: 'Se connecter avec Google',
          logout: 'Déconnexion',
          greetings: 'Bonjour ',
          cancel: 'Annuler',
          unauthorized: {
            title: 'Email non authorisé',
            subtitle:
              'Babeth est une application privé, veuillez vérifier votre email de connexion'
          },
          event: {
            title: 'Ajouter un événement',
            empty: "Rien n'est prévu",
            name: 'Nom',
            date: 'Date',
            send: 'Ajouter'
          }
        }
      }
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'fr',

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  })

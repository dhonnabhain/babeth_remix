import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
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
        },
        family: {
          title: 'Membres de la famille',
          backEvents: 'Revenir au calendrier',
          backFamily: 'Revenir à la famille',
          goto: 'Voir la famille'
        },
        person: {
          title: 'Ajouter un membre',
          firstName: 'Prénom',
          lastName: 'Nom',
          birthday: 'Date de naissance',
          city: 'Ville',
          work: 'Travail',
          avatar: 'Photo de profil',
          avatarChange: 'Ajouter / modifier photo de profil',
          biography: 'Biographie'
        }
      }
    }
  },
  lng: 'en',
  fallbackLng: 'fr',

  interpolation: {
    escapeValue: false
  }
})

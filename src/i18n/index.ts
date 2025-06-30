
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        dashboard: 'Dashboard',
        clients: 'Clients',
        exercises: 'Exercises',
        treatments: 'Treatments',
        analytics: 'Analytics'
      },
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        email: 'Email',
        password: 'Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        companyName: 'Company Name',
        street: 'Street Address',
        zipCode: 'ZIP Code',
        city: 'City',
        country: 'Country',
        vatNumber: 'VAT Number',
        verifyEmail: 'Verify Email',
        enterOtp: 'Enter OTP',
        startTrial: 'Start Free Trial',
        choosePlan: 'Choose Plan'
      },
      plans: {
        basic: 'Basic',
        standard: 'Standard',
        premium: 'Premium',
        monthly: 'Monthly',
        quarterly: '3 Months',
        yearly: 'Yearly'
      },
      common: {
        next: 'Next',
        previous: 'Previous',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete'
      }
    }
  },
  sv: {
    translation: {
      nav: {
        dashboard: 'Instrumentpanel',
        clients: 'Klienter',
        exercises: 'Övningar',
        treatments: 'Behandlingar',
        analytics: 'Analys'
      },
      auth: {
        signIn: 'Logga in',
        signUp: 'Registrera',
        email: 'E-post',
        password: 'Lösenord',
        firstName: 'Förnamn',
        lastName: 'Efternamn',
        companyName: 'Företagsnamn',
        street: 'Gatuadress',
        zipCode: 'Postnummer',
        city: 'Stad',
        country: 'Land',
        vatNumber: 'Momsregistreringsnummer',
        verifyEmail: 'Verifiera e-post',
        enterOtp: 'Ange OTP',
        startTrial: 'Starta gratis provperiod',
        choosePlan: 'Välj plan'
      },
      plans: {
        basic: 'Grundläggande',
        standard: 'Standard',
        premium: 'Premium',
        monthly: 'Månadsvis',
        quarterly: '3 månader',
        yearly: 'Årligen'
      },
      common: {
        next: 'Nästa',
        previous: 'Föregående',
        cancel: 'Avbryt',
        save: 'Spara',
        edit: 'Redigera',
        delete: 'Radera'
      }
    }
  },
  fi: {
    translation: {
      nav: {
        dashboard: 'Kojelauta',
        clients: 'Asiakkaat',
        exercises: 'Harjoitukset',
        treatments: 'Hoidot',
        analytics: 'Analytiikka'
      },
      auth: {
        signIn: 'Kirjaudu sisään',
        signUp: 'Rekisteröidy',
        email: 'Sähköposti',
        password: 'Salasana',
        firstName: 'Etunimi',
        lastName: 'Sukunimi',
        companyName: 'Yrityksen nimi',
        street: 'Katuosoite',
        zipCode: 'Postinumero',
        city: 'Kaupunki',
        country: 'Maa',
        vatNumber: 'ALV-numero',
        verifyEmail: 'Vahvista sähköposti',
        enterOtp: 'Anna OTP',
        startTrial: 'Aloita ilmainen kokeilu',
        choosePlan: 'Valitse suunnitelma'
      },
      plans: {
        basic: 'Perus',
        standard: 'Standardi',
        premium: 'Premium',
        monthly: 'Kuukausittain',
        quarterly: '3 kuukautta',
        yearly: 'Vuosittain'
      },
      common: {
        next: 'Seuraava',
        previous: 'Edellinen',
        cancel: 'Peruuta',
        save: 'Tallenna',
        edit: 'Muokkaa',
        delete: 'Poista'
      }
    }
  },
  es: {
    translation: {
      nav: {
        dashboard: 'Panel',
        clients: 'Clientes',
        exercises: 'Ejercicios',
        treatments: 'Tratamientos',
        analytics: 'Analíticas'
      },
      auth: {
        signIn: 'Iniciar sesión',
        signUp: 'Registrarse',
        email: 'Correo electrónico',
        password: 'Contraseña',
        firstName: 'Nombre',
        lastName: 'Apellido',
        companyName: 'Nombre de la empresa',
        street: 'Dirección',
        zipCode: 'Código postal',
        city: 'Ciudad',
        country: 'País',
        vatNumber: 'Número de IVA',
        verifyEmail: 'Verificar correo',
        enterOtp: 'Ingresar OTP',
        startTrial: 'Iniciar prueba gratuita',
        choosePlan: 'Elegir plan'
      },
      plans: {
        basic: 'Básico',
        standard: 'Estándar',
        premium: 'Premium',
        monthly: 'Mensual',
        quarterly: '3 meses',
        yearly: 'Anual'
      },
      common: {
        next: 'Siguiente',
        previous: 'Anterior',
        cancel: 'Cancelar',
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

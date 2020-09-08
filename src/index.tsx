import React, {FC, ReactNode, useContext, useMemo} from 'react'

interface Config {
  locale: string
  allLocales: string[]
  fallbackOrder?: Record<string, string>
}

const KonjacContext = React.createContext<Config>(null)

interface Props {
  locale: string
  allLocales: string[]
  fallbackOrder?: Record<string, string>
}

export const KonjacProvider: FC<Props> = (props) => {
  const {locale, allLocales, fallbackOrder} = props
  const config = useMemo<Config>(() => ({
    locale,
    allLocales,
    fallbackOrder,
  }), [locale, allLocales])
  return (
    <KonjacContext.Provider value={config}>
      {props.children}
    </KonjacContext.Provider>
  )
}

type Message = ReactNode | (() => ReactNode)

export function useTranslation() {
  const config = useContext(KonjacContext)
  function t(messages: Message[]) {
    if (!messages) {
      try {
        throw new Error('Empty messages detected.')
      } catch (e) {
        console.error(e)
        return null
      }
    }
    function getMessage(locale: string): ReactNode {
      let message: Message
      if (Array.isArray(messages)) {
        const index = config.allLocales.indexOf(locale)
        message = messages[index]
      } else {
        message = messages[locale]
      }
      if (message === null || message === undefined) {
        const fallbackLocale = config.fallbackOrder?.[locale]
        if (fallbackLocale) {
          return getMessage(fallbackLocale)
        }
      }
      if (typeof message === 'function') {
        return message()
      } else {
        return message
      }
    }
    return getMessage(config.locale)
  }
  return {
    t,
  }
}

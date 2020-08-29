import React, {FC, ReactElement, useContext, useMemo} from 'react'

interface Config {
  locale: string
  allLocales: string[]
  currentIndex: number
}

const KonjacContext = React.createContext<Config>(null)

interface Props {
  locale: string
  allLocales: string[]
}

export const KonjacProvider: FC<Props> = (props) => {
  const {locale, allLocales} = props
  const config = useMemo(() => ({
    locale,
    allLocales,
    currentIndex: allLocales.indexOf(locale),
  }), [locale, allLocales])
  return (
    <KonjacContext.Provider value={config}>
      {props.children}
    </KonjacContext.Provider>
  )
}

type Message = ReactElement | (() => ReactElement)

export function useTranslation() {
  const config = useContext(KonjacContext)
  function t(messages: Message[]) {
    const message = messages[config.currentIndex]
    if (typeof message === 'function') {
      return message()
    } else {
      return message
    }
  }
  return {
    t,
  }
}

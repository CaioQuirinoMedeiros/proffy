import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'

import api from '../services/api'
import { save, load, remove } from '../utils/storage'
import { INTRO } from '../constants/setup'

interface SetupContextData {
  finishedIntro: boolean
  loading: boolean
  finishIntro(): void
}

const SetupContext = createContext<SetupContextData>({} as SetupContextData)

const SetupProvider: React.FC = ({ children }) => {
  const getIntroStatus = useCallback(async () => {
    const intro = await load(INTRO)

    return !!intro
  }, [])

  const [finishedIntro, setFinishedIntro] = useState(false)
  const [loading, setLoading] = useState(true)

  const finishIntro = useCallback(async () => {
    setFinishedIntro(true)
    await save(INTRO, true)
  }, [])

  useEffect(() => {
    getIntroStatus().then((intro) => {
      setFinishedIntro(intro)
      setLoading(false)
    })
  }, [])

  return (
    <SetupContext.Provider value={{ finishIntro, finishedIntro , loading}}>
      {children}
    </SetupContext.Provider>
  )
}

const useSetup = (): SetupContextData => {
  return useContext(SetupContext)
}

export { SetupProvider, useSetup }

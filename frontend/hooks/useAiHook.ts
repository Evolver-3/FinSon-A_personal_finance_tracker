import {useContext} from 'react'
import {AiContext} from '@/context/AiContext'

export const useAiHook=():AiContextProps=>{
  const context=useContext(AiContext)

  if(!context){
    throw new Error("useAiHook must be used within an AiProvider")
  }

  return context
}
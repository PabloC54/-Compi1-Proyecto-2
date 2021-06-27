import React, { useState } from 'react'

const PopupContext = React.createContext('es')

const DEFAULT_RENDER = <>nothing here</>

export function PopupContextProvider({ children }) {
  const [show, setShow] = useState(false)
  const [rendered, setRendered] = useState(DEFAULT_RENDER)
  const [downloadable, setDownloadable] = useState('')

  const setPopup = (el, dwn = '') => {
    setRendered(el)
    setDownloadable(dwn)
    setShow(true)
  }

  const hidePopup = () => {
    setRendered(DEFAULT_RENDER)
    setShow(false)
  }

  return <PopupContext.Provider value={{ show, rendered, downloadable, setPopup, hidePopup }}>{children}</PopupContext.Provider>
}

export default PopupContext

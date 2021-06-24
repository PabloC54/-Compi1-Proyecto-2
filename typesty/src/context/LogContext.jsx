import React, { useState } from 'react'

const LogContext = React.createContext('es')

export function LogContextProvider({ children }) {
  const [logs, setLogs] = useState([])

  const printLog = (msg, clear = false) => {
    if (clear) setLogs(typeof msg === 'string' ? [msg] : msg)
    else {
      setLogs(logs.concat(msg))
      const el = document.getElementById('logger')
      el.scrollTop = el.scrollHeight
    }
  }

  return <LogContext.Provider value={{ logs, printLog }}>{children}</LogContext.Provider>
}

export default LogContext

import React from 'react'
import ReactDOM from 'react-dom'

import App from '@/components/App'

import './index.css'

import { LogContextProvider } from '@/context/LogContext'
import { TabsContextProvider } from '@/context/TabsContext'
import { PopupContextProvider } from '@/context/PopupContext'

ReactDOM.render(
  <React.StrictMode>
    <LogContextProvider>
      <TabsContextProvider>
        <PopupContextProvider>
          <App />
        </PopupContextProvider>
      </TabsContextProvider>
    </LogContextProvider>
  </React.StrictMode>,
  document.getElementById('app')
)

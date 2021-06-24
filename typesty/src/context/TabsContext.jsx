import React from 'react'
import useTabs from '@/hooks/useTabs'

const TabsContext = React.createContext([])

export function TabsContextProvider({ children }) {
  const exp = useTabs()
  return <TabsContext.Provider value={exp}>{children}</TabsContext.Provider>
}

export default TabsContext

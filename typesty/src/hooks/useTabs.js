import { useState } from 'react'

import { copyArray } from '@/helper/util'

const INITIAL_FILE = 'void main(){\n  \n}\n\nexec main();'

const INITIAL_TAB = { name: 'Nuevo archivo.ty', content: INITIAL_FILE, active: true }

const useTabs = () => {
  const [tabs, setTabs] = useState(localStorage.getItem('tabs') ? JSON.parse(localStorage.getItem('tabs')) : [INITIAL_TAB])

  const saveTabs = (tabs) => localStorage.setItem('tabs', JSON.stringify(tabs))

  const getFirstTab = () => {
    const newTabs = copyArray(tabs)
    newTabs[0].active = true

    setTabs(newTabs)
    saveTabs(newTabs)
    return newTabs[0]
  }

  const getActiveIndex = () => tabs.findIndex((tab) => tab.name === activeTab.name)

  const [activeTab, setActiveTab] = useState(tabs.find((tab) => tab.active) || getFirstTab())

  const setContent = (content) => setActiveTab({ ...activeTab, content })

  const getNewTabName = () => {
    const i = tabs.reduce((i, tab) => (tab.name === (i ? `Nuevo archivo ${i}.ty` : `Nuevo archivo.ty`) ? i + 1 : i), 1)
    return i ? `Nuevo archivo ${i}.ty` : `Nuevo archivo.ty`
  }

  const newTab = ({ name, content }) => {
    const newName = getNewTabName()
    const newTab = { name: name || newName, content: content || INITIAL_FILE, active: true }

    const newTabs = copyArray(tabs)

    const actualTab = { ...activeTab, active: false }
    const activeIndex = getActiveIndex()

    newTabs[activeIndex] = actualTab
    newTabs.push(newTab)

    setActiveTab(newTab)
    setTabs(newTabs)
    saveTabs(newTabs)
  }

  const changeTab = (i) => {
    const newTabs = copyArray(tabs)

    const activeIndex = getActiveIndex()
    if (i === activeIndex) return

    const actualTab = { ...activeTab, active: false }
    newTabs[activeIndex] = actualTab
    newTabs[i].active = true

    setActiveTab(newTabs[i])
    setTabs(newTabs)
    saveTabs(newTabs)
  }

  const closeTab = () => {
    const newTabs = copyArray(tabs)
    const activeIndex = getActiveIndex()
    newTabs.splice(activeIndex, 1)

    if (!newTabs.length) newTabs.push(INITIAL_TAB)

    newTabs[0].active = true

    setActiveTab(newTabs[0])
    setTabs(newTabs)
    saveTabs(newTabs)
  }

  return { tabs, activeTab, setContent, newTab, changeTab, closeTab }
}

export default useTabs

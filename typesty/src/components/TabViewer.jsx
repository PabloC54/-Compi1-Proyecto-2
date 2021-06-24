import React, { useContext, useRef } from 'react'
import injectSheet from 'react-jss'
import TabsContext from '@/context/TabsContext'

import Button from './Button'

function TabViewer({ classes }) {
  const { tabs, newTab, closeTab, changeTab } = useContext(TabsContext)

  const tabsBar = useRef(null)

  const handleLeft = () => (tabsBar.current.scrollLeft -= 140)

  const handleRight = () => (tabsBar.current.scrollLeft += 140)

  return (
    <div className={`${classes.base} unselectable`}>
      <div className={classes.button}>
        <Button onClick={newTab}>➕</Button>
      </div>
      <div className={classes.button}>
        <Button onClick={closeTab}>✖️</Button>
      </div>
      <div className={classes.dragButton} onClick={handleLeft}>
        ⮜
      </div>
      <div className={classes.tabs} id='tabs' ref={tabsBar}>
        {tabs.map((tab, i) => (
          <div key={tab.name} className={`${classes.tab} ${tab.active && classes.activeTab}`} onClick={() => changeTab(i)}>
            {tab.name}
          </div>
        ))}
      </div>
      <div className={classes.dragButton} onClick={handleRight}>
        ⮞
      </div>
    </div>
  )
}

const styles = {
  base: {
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '10px 0'
  },
  button: {
    margin: '0 5px'
  },
  tabs: {
    display: 'flex',
    backgroundColor: '#222228',
    width: '80%',
    borderRadius: 5,
    margin: '0 5px',
    overflowX: 'hidden'
  },
  dragButton: {
    backgroundColor: '#AABBEE',
    fontSize: 16,
    padding: '4px 6px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#BBCCEE'
    }
  },
  tab: {
    backgroundColor: '#AABBEE',
    fontSize: 14,
    padding: '5px 10px',
    borderRadius: 5,
    whiteSpace: 'nowrap',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#BBCCEE'
    }
  },
  activeTab: {
    backgroundColor: '#335',
    color: 'antiquewhite',
    '&:hover': {
      backgroundColor: '#447'
    }
  }
}

export default injectSheet(styles)(TabViewer)

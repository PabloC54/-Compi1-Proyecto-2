import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

import Navbar from './Navbar'
import Popup from './Popup'
import Code from './Code'
import Console from './Console'
import Footer from './Footer'

function App() {
  const [width, setWidth] = useState(window.innerWidth)

  const classes = useStyles(width)

  const handleResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)

  return (
    <>
      <Navbar width={width} />
      <Popup />
      <div className={classes.base}>
        <Code width={width} />
        <Console width={width} />
      </div>
      <Footer />
    </>
  )
}

const useStyles = createUseStyles({
  base: {
    display: 'flex',
    flexDirection: (width) => (width > 800 ? 'row' : 'column'),
    alignItems: 'center',
    padding: '80px 0 20px',
    minHeight: 'calc(100vh - 140px)',
    background: 'linear-gradient(30deg, rgb(163 66 226), rgb(64 85 191), rgb(90 189 162))',
    justifyContent: 'space-around'
  }
})

export default App

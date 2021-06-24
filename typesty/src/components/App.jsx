import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

import Footer from './Footer'
import Code from './Code'
import Console from './Console'
import Navbar from './Navbar'

function App() {
  const [width, setWidth] = useState(window.innerWidth)

  const classes = useStyles(width)

  const handleResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)

  return (
    <>
      <Navbar width={width} />
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
    background: 'linear-gradient(-45deg, #57A, #59B, #6AC)',
    justifyContent: 'space-around',
    animation: 'gradient 30s ease infinite'
  }
})

export default App

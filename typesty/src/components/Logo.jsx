import React from 'react'
import injectSheet from 'react-jss'

function Logo({ classes }) {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={classes.base} onClick={scrollTop}>
      Typesty
    </div>
  )
}

const styles = {
  base: {
    textAlign: 'center',
    margin: '0 20px',
    fontFamily: `'Pacifico', cursive`,
    fontSize: '30px',
    color: 'khaki',
    textDecoration: 'underline',
    textShadow: '4px 2px black',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}

export default injectSheet(styles)(Logo)

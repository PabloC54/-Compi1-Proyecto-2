import React from 'react'
import injectSheet from 'react-jss'

import githubIcon from '@img/github-icon.png'

function Footer({ classes }) {
  return (
    <div className={`${classes.base} unselectable`}>
      <a className={classes.repository} href='https://github.com/PabloC54'>
        Pablo Cabrera
        <img src={githubIcon} alt='github' />
      </a>
    </div>
  )
}

const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    height: 40,
    backgroundColor: '#222',
    color: 'khaki'
  },
  repository: {
    display: 'flex',
    alignItems: 'center',
    color: 'khaki',
    textDecoration: 'none',
    height: 30,
    lineHeight: '15px',
    '&:hover': {
      cursor: 'pointer'
    },
    '& img': {
      height: '100%',
      margin: '0 10px'
    }
  }
}

export default injectSheet(styles)(Footer)

import React from 'react'
import injectSheet from 'react-jss'

import githubIcon from '@img/github-icon.png'
import docIcon from '@img/doc-icon.png'

function Footer({ classes }) {
  return (
    <div className={`${classes.base} unselectable`}>
      <a className={classes.repository} href='https://github.com/PabloC54'>
        <img src={githubIcon} alt='github' />
        Pablo Cabrera
      </a>
      <a href='https://pabloc54.github.io/typesty/docs'>
        <img src={docIcon} alt='documentacion' />
        Documentación
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
    '& a': {
      display: 'flex',
      alignItems: 'center',
      height: 30,
      color: 'khaki',
      textDecoration: 'none',
      '& img': {
        height: '80%',
        margin: '0 10px'
      }
    }
  }
}

export default injectSheet(styles)(Footer)

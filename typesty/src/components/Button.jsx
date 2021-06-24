import React from 'react'
import injectSheet from 'react-jss'

function Button({ onClick, highlight, className, children, classes }) {
  return (
    <div className={`${className} ${classes.base} ${highlight && classes.highlight}`} onClick={onClick}>
      {children}
    </div>
  )
}

const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    height: '60%',
    padding: '0 10px',
    margin: 0,
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid rgb(100,100,100)',
    borderRadius: 10,
    '&:hover': {
      backgroundColor: 'rgba(200,200,200,0.3)',
      cursor: 'pointer'
    },
    '&:active': {
      border: '2px inset rgb(85, 85, 85)',
      borderRadius: '12%',
      size: '12px'
    }
  },
  highlight: {
    backgroundColor: 'rgb(40,180,40)',
    '&:hover': {
      backgroundColor: 'rgb(60,190,60)'
    }
  }
}

export default injectSheet(styles)(Button)

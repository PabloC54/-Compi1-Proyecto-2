import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'
import LogContext from '@/context/LogContext'

function Console({ width }) {
  const classes = useStyles(width)

  const { logs } = useContext(LogContext)

  return (
    <div className={classes.base}>
      <div className={`${classes.title} unselectable`}>Output</div>
      <textarea id='logger' className={classes.console} readOnly defaultValue={logs.map((log) => log + '\n').join('')} />
    </div>
  )
}

const useStyles = createUseStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: (width) => (width > 800 ? '45%' : '90%'),
    margin: '10px 0'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 32,
    margin: '10px 0',
    fontSize: 20,
    color: 'khaki',
    textShadow: '2px 1px black'
  },
  console: {
    fontFamily: `'Fira Code', monospace`,
    fontSize: 11,
    height: 476,
    width: '-webkit-fill-available',
    padding: '12px 8px',
    border: '2px khaki solid',
    borderRadius: 12,
    backgroundColor: '#202032',
    color: 'khaki',
    lineHeight: 1.5
  }
})

export default Console

import React, { useContext, useRef } from 'react'
import injectSheet from 'react-jss'

import { downloadFile } from '@/helper/util'

import Button from './Button'
import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import PopupContext from '../context/PopupContext'

function Popup({ classes }) {
  const { show, rendered, downloadable, hidePopup } = useContext(PopupContext)

  const popupRef = useRef(null)

  useOutsideAlerter(popupRef, hidePopup)

  const handleDownload = () => downloadFile(downloadable)

  return (
    <>
      {show && (
        <div className={classes.base}>
          <div ref={popupRef} className={classes.popup}>
            <div className={classes.toolbar}>
              <Button onClick={handleDownload}>Descargar</Button>
              <Button onClick={hidePopup}>✖️</Button>
            </div>
            <div className={classes.render}>{rendered}</div>
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  base: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
    background: 'rgba(50, 50 ,50 ,.7)'
  },
  popup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    height: '90%',
    background: 'rgb(34,34,34)',
    borderRadius: 10
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    height: 50
  },
  render: {
    width: '90%',
    height: 'calc(90% - 50px)',
    background: 'rgb(38,38,38)',
    overflow: 'auto',
    '& > div, & > div > svg': {
      width: '100%',
      height: '100%'
    }
  }
}

export default injectSheet(styles)(Popup)

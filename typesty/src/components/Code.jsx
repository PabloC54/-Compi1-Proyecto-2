import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'

import AceEditor from 'react-ace'
import TabViewer from './TabViewer'
import TabsContext from '@/context/TabsContext'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'

function Code({ width }) {
  const classes = useStyles(width)

  const {
    activeTab: { content },
    setContent
  } = useContext(TabsContext)

  return (
    <div className={classes.base}>
      <TabViewer />
      <AceEditor
        className={classes.editor}
        mode='javascript'
        theme='dracula'
        onChange={setContent}
        fontSize={18}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={content}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
          cursorStyle: 'wide',
          useSoftTabs: true
        }}
      />
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
  editor: {
    width: '100% !important',
    height: '500px !important',
    border: '2px khaki solid',
    borderRadius: '12px !important',
    fontSize: '15px !important'
  }
})

export default Code

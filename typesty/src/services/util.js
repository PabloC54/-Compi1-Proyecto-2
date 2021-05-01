const copyArray = (INS) => JSON.parse(JSON.stringify(INS))

const toTitle = (msg) => ['='.repeat(msg.length + 4), `| ${msg} |`, '='.repeat(msg.length + 4)]

const saveFile = ({ name, text }) => {
  const element = document.createElement('a')
  const file = new Blob([text], {
    type: 'text/plain'
  })
  element.href = URL.createObjectURL(file)
  element.download = name
  element.click()
}

export { copyArray, toTitle, saveFile }

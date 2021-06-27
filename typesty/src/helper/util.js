const copyArray = (array) => JSON.parse(JSON.stringify(array))

const toTitle = (msg) => ['='.repeat(msg.length + 4), `| ${msg} |`, '='.repeat(msg.length + 4)]

const downloadFile = ({ name, content }) => {
  const element = document.createElement('a')
  const file = new Blob([content], {
    type: 'text/plain'
  })
  element.href = URL.createObjectURL(file)
  element.download = name
  element.click()
}

export { copyArray, toTitle, downloadFile }

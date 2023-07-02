const alertTxt = document.querySelector('#alertText')
const alerts = document.querySelector('#alerts')
const content = document.querySelector('#content')

let counter = 0
//let corectTextCount = 0
let pressedCmd = ''
let pressedAlt = ''

content.addEventListener('keypress', e => {
  if (e.which !== 13) return
  e.preventDefault()
})

content.addEventListener('keyup', e => {
  if (e.which == 91 || e.which == 93) {
    pressedCmd = false
  }
  if (e.which == 18) {
    pressedAlt = false
  }
})

content.addEventListener('keydown', evt => {
  if (evt.which == 32 && content.innerText.endsWith(' ')) {
    evt.preventDefault()
    return
  }
  if (evt.which == 91 || evt.which == 93) {
    pressedCmd = true
  }
  if (evt.which == 18) {
    pressedAlt = true
  }

  processText(evt)
  caretAtEnd(content)
})

function processText(evt) {
  let textToWrite = 'My name is Lamara'
  let writtenText = content.innerText.toLowerCase()
  let len = writtenText.length

  let textToCompare = textToWrite.slice(0, len + 1).toLowerCase()
  let correctText = textToCompare.slice(0, len)
  let newLetter = evt.key.toLowerCase()
  let fullText = (content.innerText + newLetter).slice(0, counter + 1)
  let wrongText = (content.innerText + newLetter).slice(counter + 1, 100)

  if (evt.which == 8) {
    if (pressedCmd == true || pressedAlt == true) {
      evt.preventDefault()
    }
    if (len <= 1 && writtenText !== correctText) {
      content.innerHTML = ''
    }
    if (len >= 1 && writtenText == correctText) {
      animateConstructor(content, 'animate__animated', true, true)
      evt.preventDefault()
      showhint(writtenText, textToWrite)
      alertText('Text is Correct!')
    }
    return
  }

  if (evt.which === 13) {
    content.setAttribute('data-placeholder', '')
    showhint(writtenText, textToWrite)
    return
  }

  if (evt.key.length == 1) {
    content.setAttribute('text-after', '')

    if (textToCompare != writtenText + newLetter) {
      content.innerHTML = colorWrongRed(fullText, wrongText)
      evt.preventDefault()
    } else {
      content.innerHTML = content.innerText
      counter = len
      alerts.classList.add('alertHide')
    }
    return
  }
}

function showhint(writtenText, textToWrite) {
  let myReg = new RegExp(writtenText + '\\w+')
  let myMatch = textToWrite
    .toLowerCase()
    .match(myReg)
    .toString()
    .replace(writtenText, '')
  content.setAttribute('text-after', myMatch)
}

function colorWrongRed(text, wrong) {
  if (wrong == '') {
    wrong = text
    text = ''
    counter--
  }
  return text + "<span style='color:#F95959;'>" + wrong + '</span>'
}

function alertText(alertText) {
  animateConstructor(alerts, 'alertHide', false, true)
  animateConstructor(alerts, 'alertShow', true, true)

  var elem = document.createElement('h5')
  var elemText = document.createTextNode(alertText)
  elem.appendChild(elemText)
  alerts.replaceChild(elem, alertTxt)
}

function animateConstructor(div, cls, add, remove) {
  if (add == remove) {
    div.classList.remove(cls)

    window.requestAnimationFrame(function () {
      div.classList.add(cls)
    })
  }
  if (add == true && remove == false) {
    div.classList.add(cls)
  } else {
    div.classList.remove(cls)
  }
}

function caretAtEnd(element) {
  element.focus()
  if (
    typeof window.getSelection != 'undefined' &&
    typeof document.createRange != 'undefined'
  ) {
    var range = document.createRange()
    range.selectNodeContents(element)
    range.collapse(false)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  } else if (typeof document.body.createTextRange != 'undefined') {
    var textRange = document.body.createTextRange()
    textRange.moveToElementText(element)
    textRange.collapse(false)
    textRange.select()
  }
}

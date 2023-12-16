let numA = null;
let numB = null;
let operation = null;
let solution = null;
let userResult = null;
let lastClickedSquare = null;

const yellowRowFragment = document.createDocumentFragment()
const yellowRow = document.getElementById('yellow-row')

const initialize = () => {

  console.log('initializing...')

  for (let i = -15; i <= 15; i++) {
    const square = document.createElement('div')
    square.className = 'square-base square-yellow me-2'
    square.textContent = i
    yellowRowFragment.appendChild(square)
  }

  yellowRow.appendChild(yellowRowFragment)
}

initialize()

const refresh = () => {
  console.log('refreshing...')
  numA = null
  numB = null
  operation = null
  solution = null
  userResult = null
  if (lastClickedSquare) {
    lastClickedSquare.className = 'square-yellow square-base me-2'
  }
  document.getElementById('math-solution').value = ''
  document.getElementById('yellow-row').setAttribute('onclick', 'handleSelectNumA(event)')
}

function handleSelectNumA(event) {
  console.log('Selecting number A...')
  const clickedElement = event.target

  if (clickedElement.className.includes('square-base')) {
    console.log('clicked square: ', clickedElement.textContent)
    if (lastClickedSquare) {
      lastClickedSquare.className = 'square-yellow square-base me-2'
    }

    if (clickedElement.textContent == numA) {
      clickedElement.className = 'square-correct square-base me-2'
      const step01 = new bootstrap.Collapse(document.getElementById('step-01'))
      step01.hide()

      const step02 = new bootstrap.Collapse(document.getElementById('step-02'))
      step02.show()

      document.getElementById('num-a-span').classList.remove('num-highlight')
      document.getElementById('num-b-span').classList.add('num-highlight')
      document.getElementById('yellow-row').setAttribute('onclick', 'handleSelectNumB(event)')
    } else {
      clickedElement.className = 'square-incorrect square-base me-2'
    }
    lastClickedSquare = clickedElement
  }
}

function handleSelectNumB(event) {
  console.log('Selecting number B...')
  const clickedElement = event.target;

  if (clickedElement.className.includes('square-base')) {
    console.log('clicked square: ', clickedElement.textContent)
    if (lastClickedSquare) {
      lastClickedSquare.className = 'square-yellow square-base me-2'
    }

    if (clickedElement.textContent == solution) {
      clickedElement.className = 'square-correct square-base me-2'
      const step02 = new bootstrap.Collapse(document.getElementById('step-02'))
      step02.hide()

      const step03 = new bootstrap.Collapse(document.getElementById('step-03'))
      step03.show()

      document.getElementById('yellow-row').removeAttribute('onclick')
      document.getElementById('num-b-span').classList.remove('num-highlight')
      document.getElementById('math-solution').value = clickedElement.textContent
    } else {
      clickedElement.className = 'square-incorrect square-base me-2'
    }
    lastClickedSquare = clickedElement
  }
}

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numberSign = () => {
  if (randomInt(1,2) % 2 == 0) {
    return -1
  } else {
    return 1
  }
}

const generateProblem = () => {

  refresh()

  numA = numberSign() * randomInt(0, 15)
  while (numB == null) {
    const candidateB = numberSign() * randomInt(0, 15)
    if (Math.abs(candidateB + numA) <= 15) {
      numB = candidateB
    }
  }
  solution = numA + numB

  const problemStatement = document.getElementById('math-problem');
  problemStatement.textContent = '';

  // Create span for numA
  const numASpan = document.createElement('span');
  numASpan.id = 'num-a-span'
  numASpan.className = 'num-highlight'
  numASpan.textContent = numA;
  problemStatement.appendChild(numASpan);

  // Create span for numB
  const numBSpan = document.createElement('span')
  numBSpan.id = 'num-b-span'
  numBSpan.textContent = (numB > -1) ? '+' + numB  : numB
  problemStatement.appendChild(numBSpan)

  // Add equals sign
  problemStatement.appendChild(document.createTextNode(' = '));
}

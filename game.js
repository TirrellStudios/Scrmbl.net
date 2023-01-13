let dailyWord = ''
let answer = ''
let guessCount = 0
let scrmblCount = 0

function getDailyScrmbl(callback) {
  fetch('https://3ldjrbuk0b.execute-api.us-east-1.amazonaws.com/default/getScrmblWord')
    .then(response => {
      return response.json()
    })
    .then(data => {
      dailyWord = data.message.toUpperCase()
      callback()
    })
}

function scrmblWord() {
  const letters = dailyWord.split('')
  letters.sort((a, b) => {
    return 0.5 - Math.random()
  })
  return letters.join('')
}

function scrmbl() {
  renderScrmblTiles()
  scrmblCount++
  renderScores()
}

function addLetter(letter) {
  if (answer.length >= dailyWord.length) return
  answer += letter.toUpperCase()
  renderInputTiles()
}

function removeLetter() {
  if (answer.length === 0) return
  answer = answer.slice(0, -1)
  renderInputTiles()
}

function submitAnswer() {
  if (answer.length !== dailyWord.length) {
    shakeInputTiles()
    return
  }
  guessCount++
  if (answer.toLowerCase() !== dailyWord.toLowerCase()) {
    answer = ''
    renderInputTiles()
    shakeInputTiles()
    renderScores()
  }
  else {
    showInfoContainer()
    renderGameOver()
  }
}

function resetGame() {
  guessCount = 0
  scrmblCount = 0
  answer = ''
  renderGame()
}
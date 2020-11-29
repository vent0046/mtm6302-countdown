const $response = document.getElementById('response')
const $form = document.getElementById('form')
const $day = document.getElementById('day')
const $month = document.getElementById('month')
const $year = document.getElementById('year')
const $container = document.getElementById('container')

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

let difference = null

let diff = null

let date = new Date()

//set to local storage
let dateToStore = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate()
}

localStorage.setItem('container', JSON.stringify(dateToStore));

retrievedObject = localStorage.getItem('container')

let dateFromLocalStorage = {}

console.log(JSON.parse(localStorage.getItem('container')))

let years = []
for (let i = 2020; i <= 2050; i++) {
    years.push(`<option>${i}</option>`)
}
$year.innerHTML = years.join('')

let months = []
for (let i = 1; i <= 12; i++) {
   months.push(`<option>${i}</option>`)
}
$month.innerHTML = months.join('')

$month.addEventListener('change', function () {
    let days = []
    for (let i = 1; i <= daysInMonth[$month.value - 1]; i++) {
        days.push(`<option>${i}</option>`)
    }
    $day.innerHTML = days.join('')
})

const DateTime = luxon.DateTime

const now = DateTime.local()

function setDays() {
  const date = DateTime.fromObject({
    year: $year.value,
    month: $month.value
  })
  
  const days = []
  
  for (let i = 1; i <= date.daysInMonth; i++) {
    days.push(`<option>${i}</option>`)
  }
  
  $day.innerHTML = days.join('')
}

$form.addEventListener('submit', function (event) {
  event.preventDefault()
  
  const date = DateTime.fromObject({
    year: $year.value,
    month: $month.value,
    day: $day.value
  })
  
  if (date > now) {
     diff = date.diff(now, ['days', 'hours', 'minutes', 'seconds'])
  console.log(diff)

  difference = diff.as('milliseconds')

      setInterval(function (){

  

  difference -= 1000

  $container.innerHTML = `
  ${toDays(difference)} days

  ${toHours(difference)} hours

  ${toMinutes(difference)} minutes

  ${toSeconds(difference)} seconds
  `
}, 1000)
  }
})


function toDays (ms) {
  return Math.floor(ms / 1000 / 60 / 60 / 24)
}

function toHours(ms) {

  let days = Math.floor(ms/ 1000 / 60 / 60 / 24)
  let hours = Math.floor(ms/ 1000 / 60 / 60)

  let remainingHours = hours - (days * 24)

  return remainingHours
}

function toMinutes(ms) {
  
  let hours = Math.floor(ms / 1000 / 60 / 60)
  let minutes = Math.floor(ms / 1000 / 60)

  let remainingMinutes = minutes - (hours * 60)

  return remainingMinutes
}

function toSeconds(ms) {
  let minutes = Math.floor(ms / 1000 / 60)
  let seconds = Math.floor(ms/ 1000)

  let remainingSeconds = seconds - (minutes * 60)

  return remainingSeconds
}






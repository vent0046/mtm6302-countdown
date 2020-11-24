const $response = document.getElementById('response')
const $form = document.getElementById('form')
const $day = document.getElementById('day')
const $month = document.getElementById('month')
const $year = document.getElementById('year')

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

let date = new Date()

//set to local storage
let dateToStore = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate()
}

localStorage.setItem('targetDate', JSON.stringify(dateToStore));

let dateFromLocalStorage = {}

console.log(JSON.parse(localStorage.getItem('targetDate')))

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
    const diff = date.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject()
    
      $response.textContent = `${diff.days} days ${diff.hours} hours ${diff.minutes} minutes ${diff.seconds} seconds`
      
  }
})

let startingTime = {
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds()
}

setInterval(function (){

  startingTime.seconds -= 1


  $response.innerHTML =  `
  ${startingTime.hours} Hours
  ${startingTime.minutes} Minutes
  ${startingTime.seconds} Seconds
  `
}, 1000)


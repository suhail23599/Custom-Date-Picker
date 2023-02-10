
//ELEMENTS

const datePickerEl = document.querySelector('.date-picker-wrapper')
const selectedDateEl = document.querySelector('.date-selected')
const datesEl = document.querySelector('.dates-container')
const monthEl = document.querySelector('.month .month-item')
const nextMonthEl = document.querySelector('.month .next-month')
const prevMonthEl = document.querySelector('.month .prev-month')
const daysEl = document.querySelector('.days-container')

//Variables

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

let selectedDate = date
let selectedDay = day
let selectedMonth = month
let selectedYear = year

monthEl.textContent = months[month] + " " + year
selectedDateEl.textContent = formatDate(selectedDate)

// Listener

datePickerEl.addEventListener('click', toggleDatePicker)
nextMonthEl.addEventListener('click', goToNextMonth)
prevMonthEl.addEventListener('click', goToPrevMonth)

//Functions
populateDates()

function toggleDatePicker (e) {
   if(!checkClassExist(e.path, 'dates-container')) {
     datesEl.classList.toggle('active')
   }
}

function checkClassExist (path, el) {
   for (let i=0; i<path.length; ++i) {
      if (path[i].classList && path[i].classList.contains(el)) {
         return true
      }
   }
   return false
}

function goToNextMonth () {
   month++
   if (month > 11) {
      month = 0
      year++
   }
   monthEl.textContent = months[month] + " " + year
   populateDates()
}
function goToPrevMonth() {
   month--
   if (month < 0) {
      month = 11
      year--
   }
   monthEl.textContent = months[month] + " " + year
   populateDates()
}

function populateDates () {
   daysEl.innerHTML = ''
   let totalDays

   if (month === 1) {
      totalDays = 28
   } else if (month%2 === 0) {
      totalDays = 31
   } else {
      totalDays = 30
   }
   for (let i = 0; i< totalDays; ++i)  {
      const dayEl = document.createElement('div')
      dayEl.classList.add('day')
      dayEl.textContent = i + 1
      if (selectedDay === i + 1 && selectedMonth === month && selectedYear === year) {
         dayEl.classList.add('selected')
      }
      dayEl.addEventListener('click', () => {
         selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1))
         selectedDay = i + 1
         selectedMonth = month
         selectedYear = year
         selectedDateEl.textContent = formatDate(selectedDate)
         populateDates()
      })
      daysEl.appendChild(dayEl)
   }
}

function formatDate (date) {
   let day = `${date.getDate()}`.padStart(0, 2)
   let month = `${date.getMonth() + 1}`.padStart(2, 0)
   let year = date.getFullYear()
   return `${day}/${month}/${year}`
}
 
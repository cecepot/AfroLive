
const yearsArray = [2024, 2025, 2026, 2027, 2028]
const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]




export const onlyLastDayFunc = (day) => {
const dateArr = day.split(' ')
const lastDay = dateArr[1]
const lastDayInt = parseInt(lastDay)
return lastDayInt
}


const fullLastDayFunc = (yearsArray, monthsArray) => {
    const yearsArr = []
    for (let i = 0; i < yearsArray.length; i++) {
        let lastDayArr = []
        let yearObj = {}
        let monthIndx = 1
        for (let j = 0; j < monthsArray.length; j++) {
            const lastDay = new Date(Date.UTC(yearsArray[i], monthIndx, 0, 0, 0, 0))
            const fullLastDay = lastDay.toUTCString()
            const onlyDay= onlyLastDayFunc(fullLastDay)
            lastDayArr.push(onlyDay)
            monthIndx++
        }
        yearObj[yearsArray[i]] = lastDayArr
        yearsArr.push(yearObj)
    }

    return yearsArr
}


const fullDateCalendar = (dateArr) => {
   for (let i = 0; i < dateArr.length; i++){
    // console.log(dateArr[i])
    // let key = Object.keys(dateArr[i])

   }


}


const dateInput = (fullLastDayFunc(yearsArray, monthsArray))
// console.log(fullDateCalendar(dateInput))

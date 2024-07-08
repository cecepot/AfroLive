import { useState } from "react"




function Calendar() {

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const daysArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const [chosenDate, setChosenDate] = useState(new Date())
    const [chosenDay, setChosenDay] = useState(new Date())

    const nextMonth = (date) => {
        const nextM = date.getMonth() + 1
        const currentYear = date.getFullYear()
        const nextDate = new Date(currentYear, nextM)
        return setChosenDate(nextDate)
    }

    const prevMonth = (date) => {
        const prevM = date.getMonth() - 1
        const currentYear = date.getFullYear()
        const nextDate = new Date(currentYear, prevM)
        return setChosenDate(nextDate)
    }
    const firstDate = (date) => {
        const currentMonth = date.getMonth()
        const currentYear = date.getFullYear()
        const dayOne = new Date(currentYear, currentMonth)
        return dayOne
    }
    const lastDate = (date) => {
        const dayOne = firstDate(date)
        const currentMonth = dayOne.getMonth() + 1
        const currentYear = dayOne.getFullYear()
        const lastDay = new Date(currentYear, currentMonth, 0)
        return lastDay
    }

    const displayDays = (date) => {
        const last = lastDate(date)
        const year = last.getFullYear()
        const month = last.getMonth()
        const day = last.getDate()
        const dayArr = []
        for (let i = 1; i < (+day + 1); i++) {
            let fullDate = new Date(year, month, i)
            dayArr.push(fullDate)
        }
        return dayArr
    }
    const daysArr= displayDays(chosenDate)
    console.log(displayDays(chosenDate))


    return (
        <>
            <h2>Hello, Calendar</h2>
            <div>
                <button onClick={() => prevMonth(chosenDate)}>prev</button>
                <h2>{chosenDate.toLocaleString([], { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => nextMonth(chosenDate)}>next</button>
                <div className="weeks">
                {daysArray.map((days) => {
                    return (
                        <p>{days}</p>
                    )
                })}
                </div>
                {daysArr.map((days) => {
                    let day = days.getDate()
                    return (
                        <>
                        <p>{day}</p>
                        </>
                    )
                })}
                <p></p>
            </div>
        </>
    )
}

export default Calendar

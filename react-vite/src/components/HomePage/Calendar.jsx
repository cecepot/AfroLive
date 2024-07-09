import { useState } from "react"
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";


function Calendar() {

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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

    const inputArray = displayDays(chosenDate)

    const daysArr = (array) => {


        let res = []
        let first = array[0].getDay()
        if (first !== 0) {

            for (let i = 0; i < first; i++) {
                res.push(<p className="cal-days"></p>)
            }
        }


        for (let i = 0; i < array.length; i++) {
            res.push(<p className="cal-days">{array[i].getDate()}</p>)
        }

        let resLength = res.length

        if(resLength <= 35){
            for(let i = resLength; i < 35; i ++){
                res.push(<p className="cal-days"></p>)
            }
        } else{
            for(let i = resLength; i < 42; i ++){
                res.push(<p className="cal-days"></p>)
            }
        }

        return res
    }

    const finalDaysArr = daysArr(inputArray)



    return (
        <section className="cal-component">
            <h2 className="cal-title">Calendar</h2>
            <div className="cal-container">
                <div className="cal-header">
                    <div className="mouse" onClick={() => prevMonth(chosenDate)}><GrPrevious /></div>
                    <h2>{chosenDate.toLocaleString([], { month: 'long', year: 'numeric' })}</h2>
                    <div className="mouse" onClick={() => nextMonth(chosenDate)}><GrNext /></div>
                </div>
                <div className="weeks">
                    {daysArray.map((days) => {
                        return (
                            <p className="weekNames">{days}</p>
                        )
                    })}
                    {finalDaysArr.map((days) => days)}
                </div>
                <p></p>
            </div>
        </section>
    )
}

export default Calendar

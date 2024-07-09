import { useState } from "react"
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useSelector } from "react-redux";


function Calendar() {

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const [chosenDate, setChosenDate] = useState(new Date())
    const events = useSelector(state => state.event.events)



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
                res.push(
                    <section className="flip-container">
                        <div className="flip-sub-container">
                            <div className="cal-days mouse">
                            </div>
                            <div className="cal-days-back">

                            </div>
                        </div>
                    </section>
                )
            }
        }


        for (let i = 0; i < array.length; i++) {
            res.push(
                <section className="flip-container">
                    <div className="flip-sub-container">
                        <div className="cal-days mouse">
                            <p>{array[i].getDate()}</p>
                            <div className="cal-events">
                                {events.map((event) => {
                                    const day = event.date.split(' ')[1]
                                    const month = event.date.split(' ')[2]
                                    const year = event.date.split(' ')[3]
                                    const monthIndx = array[i].getMonth()
                                    const currMonth = monthsArray[monthIndx].slice(0, 3)
                                    const currentYear = array[i].getFullYear()
                                    const currDay = array[i].getDate()
                                    if (month == currMonth && currentYear == year && currDay == day) {
                                        return (<p className="cal-event-title">~ {event.title}</p>)
                                    }
                                })}
                            </div>
                        </div>
                        <div className="cal-days-back">

                        </div>
                    </div>
                </section>
            )
        }

        let resLength = res.length

        if (resLength <= 35) {
            for (let i = resLength; i < 35; i++) {
                res.push(
                    <section className="flip-container">
                        <div className="flip-sub-container">
                            <div className="cal-days mouse">
                            </div>
                            <div className="cal-days-back">

                            </div>
                        </div>
                    </section>
                )
            }
        } else {
            for (let i = resLength; i < 42; i++) {
                res.push(
                    <section className="flip-container">
                        <div className="flip-sub-container">
                            <div className="cal-days mouse">
                            </div>
                            <div className="cal-days-back">

                            </div>
                        </div>
                    </section>
                )
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

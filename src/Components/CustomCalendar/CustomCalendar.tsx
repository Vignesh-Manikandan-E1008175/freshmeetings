/* eslint-disable @typescript-eslint/no-unused-vars */
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import './CustomCalendar.scss'
import useAppContext from '../../useAppContext'

const CustomCalendar = () => {

  const { currentDate, handleDateChange } = useAppContext();

  return (
    <>
      <div className="calendar-container">
        <Calendar minimumDate={currentDate} onDayClick={handleDateChange} locale={enGB} />
      </div>
    </>
  )
}

export default CustomCalendar
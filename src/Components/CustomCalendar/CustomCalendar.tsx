/* eslint-disable @typescript-eslint/no-unused-vars */
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import './CustomCalendar.scss'
import useAppContext from '../../useAppContext'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)

const CustomCalendar = ({ maxDays }: { maxDays: number }) => {
  const { currentDate, selectedDate, availableDates, handleDateChange } = useAppContext();
  const maximumDate = dayjs(currentDate).add(maxDays, 'day').toDate()

  const modifiers = {
    available: (date: Date) => availableDates.has(date.getDay()),
    selected: (date: Date) => selectedDate && selectedDate.toString() === date.toString()
  }
  const modifiersClassNames = {
    available: '-available',
    selected: '-selected'
  }

  const onDayClick = (date: Date) => {
    handleDateChange(date)
  }

  return (
    <>
      <div className="calendar-container">
        <Calendar minimumDate={currentDate} maximumDate={maximumDate} onDayClick={onDayClick} modifiers={modifiers} modifiersClassNames={modifiersClassNames} locale={enGB} />
      </div>
    </>
  )
}

export default CustomCalendar
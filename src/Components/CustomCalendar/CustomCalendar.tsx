import { useState } from 'react'

// Third party libraries
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

// Component styles
import './CustomCalendar.scss'

dayjs.extend(timezone)

declare type CustomCalendarProps = {
  defaultTimezone: string
}

const CustomCalendar = ({ defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone }: CustomCalendarProps) => {
  const currentDate = dayjs.tz(dayjs(), defaultTimezone).toDate()
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate)
  
  const handleDateClick = (date: Date | null) => {
    setSelectedDate(date)
  }

  return (
    <>
      <Calendar minimumDate={currentDate} onDayClick={handleDateClick} locale={enGB} />
    </>
  )
}

export default CustomCalendar
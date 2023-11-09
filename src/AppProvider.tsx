import { useState } from "react";
import AppContext from "./AppContext";
import { ErrorFormat, TimePerDayHash } from "./Constants/types";
import { stubData } from './Constants/api-stub'
import { AppProviderProps, AlternateTzFormat } from './Constants/types'
import { isAlternateTzFormat } from './Constants/helpers';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const defaultTimezone: AlternateTzFormat | string = stubData.appointmentDetails.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone

const AppProvider = ({ children }: AppProviderProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const handleDateChange = (data: Date | null) => {
    setSelectedDate(data)
  }

  const [selectedTimezone, setSelectedTimezone] = useState<AlternateTzFormat | string>(defaultTimezone)
  const handleTimezoneChange = (data: AlternateTzFormat | string) => {
    setSelectedTimezone(data)
  }

  const [selectedTime, setSelectedTime] = useState<string>('')
  const handleTimeChange = (data: string) => {
    setSelectedTime(data)
  }

  const [availableDates, setAvailableDates] = useState<Set<number>>(new Set())
  const updateAvailableDates = (data: Set<number>) => {
    setAvailableDates(data)
  }

  const [availableTimes, setAvailableTimes] = useState<Set<string>>(new Set(''))
  const updateAvailableTimes = (data: Set<string>) => {
    setAvailableTimes(data)
  }

  const [perDayTimeAvailability, setPerDayTimeAvailability] = useState<TimePerDayHash>()
  const updatePerDayTimeAvailability = (dates: Set<string>, times: Set<string[]>) => {
    const timePerDayHash: TimePerDayHash = {
      dates: dates,
      times: times
    }
    setPerDayTimeAvailability(timePerDayHash)
  }

  const [perDateAvailability, setPerDateAvailability] = useState<Set<number>>(new Set())
  const updatePerDateAvailability = (data: Set<number>) => {
    setPerDateAvailability(data)
  }

  const [confirmSchedule, setConfirmSchedule] = useState<boolean>(false)
  const handleConfirmSchedule = (data: boolean) => {
    setConfirmSchedule(data)
  }

  const [openTimePicker, setOpenTimePicker] = useState<boolean>(false)
  const handleOpenTimePicker = (data: boolean) => {
    setOpenTimePicker(data)
  }

  const [error, setError] = useState<ErrorFormat>({ message: '' });
  const onError = (data: ErrorFormat) => {
    setError(data)
  }

  const tzValue = isAlternateTzFormat(selectedTimezone) ? selectedTimezone.value : selectedTimezone
  const currentDate = dayjs.tz(dayjs(), tzValue).toDate()

  const contextValues = {
    currentDate,
    availableDates,
    updateAvailableDates,
    availableTimes,
    updateAvailableTimes,
    selectedDate,
    handleDateChange,
    perDayTimeAvailability,
    updatePerDayTimeAvailability,
    perDateAvailability,
    updatePerDateAvailability,
    selectedTimezone,
    handleTimezoneChange,
    selectedTime,
    handleTimeChange,
    confirmSchedule,
    handleConfirmSchedule,
    openTimePicker,
    handleOpenTimePicker,
    error,
    onError
  }

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
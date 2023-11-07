import { useState } from "react";
import AppContext from "./AppContext";
import { ErrorFormat } from "./Constants/types";
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (data: Date | null) => {
    setSelectedDate(data);
  }

  const [selectedTimezone, setSelectedTimezone] = useState<AlternateTzFormat | string>(defaultTimezone);
  const handleTimezoneChange = (data: AlternateTzFormat | string) => {
    setSelectedTimezone(data);
  }

  const [selectedTime, setSelectedTime] = useState('');
  const handleTimeChange = (data: string) => {
    setSelectedTime(data);
  }

  const tzValue = isAlternateTzFormat(selectedTimezone) ? selectedTimezone.value : selectedTimezone
  const currentDate = dayjs.tz(dayjs(), tzValue).toDate()

  const [error, setError] = useState<ErrorFormat>({ message: '' });
  const onError = (data: ErrorFormat) => {
    setError(data);
  }

  const contextValues = {
    currentDate,
    selectedDate,
    handleDateChange,
    selectedTimezone,
    handleTimezoneChange,
    selectedTime,
    handleTimeChange,
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
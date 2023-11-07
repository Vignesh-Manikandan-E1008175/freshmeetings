import { ReactNode } from "react";

export type ErrorFormat = {
  message: string,
  status?: number
}


export interface AppContextType {
  currentDate: Date,
  selectedDate: Date | null,
  handleDateChange: (data: Date | null) => void,
  selectedTimezone: AlternateTzFormat | string,
  handleTimezoneChange: (data: AlternateTzFormat | string) => void,
  selectedTime: string,
  handleTimeChange: (data: string) => void,
  error: ErrorFormat,
  onError: (data: ErrorFormat) => void
}

export type AppProviderProps = {
  children: ReactNode;
}

export type AlternateTzFormat = {
  value: string
  label: string
  abbrev?: string
  altName?: string
  offset?: number
}
import { ReactNode } from "react";

export type ErrorFormat = {
  message: string,
  status?: number
}

export type TimePerDayHash = {
  times: Set<string[]>;
  dates: Set<string>;
}

export interface AppContextType {
  currentDate: Date,
  availableDates: Set<number>,
  updateAvailableDates: (data: Set<number>) => void,
  availableTimes: Set<string>,
  updateAvailableTimes: (data: Set<string>) => void,
  perDayTimeAvailability:  TimePerDayHash,
  updatePerDayTimeAvailability: (dates:  Set<string>, times: Set<string[]>) => void,
  perDateAvailability: Set<number>,
  updatePerDateAvailability: (data: Set<number>) => void,
  selectedDate: Date | null,
  handleDateChange: (data: Date | null) => void,
  selectedTimezone: AlternateTzFormat | string,
  handleTimezoneChange: (data: AlternateTzFormat | string) => void,
  selectedTime: string,
  handleTimeChange: (data: string) => void,
  confirmSchedule: boolean,
  handleConfirmSchedule: (data: boolean) => void,
  openTimePicker: boolean,
  handleOpenTimePicker: (data: boolean) => void,
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
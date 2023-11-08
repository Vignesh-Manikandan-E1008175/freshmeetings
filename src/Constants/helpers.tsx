import { AlternateTzFormat } from "./types";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const isAlternateTzFormat = (timezone: string | AlternateTzFormat): timezone is AlternateTzFormat => {
  return (timezone as AlternateTzFormat).value !== undefined;
}

export const renderTimeSlots = (timeSteps: number): string[] => {
  const timeSlots = [];
  for (let i = 0; i < 24 * 60; i += timeSteps) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    timeSlots.push(time);
  }
  return timeSlots;
};

export function isTimeInRange(time: string, timeRanges: string[]): boolean {
  const parsedTime: number = parseInt(time.replace(':', ''), 10);
  for (const timeRange of timeRanges) {
    const timeRangeRegex = /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/;
    const match = timeRange.match(timeRangeRegex);

    if (match) {
      const start = parseInt(match[1].replace(':', ''), 10);
      const end = parseInt(match[2].replace(':', ''), 10);
      if (start <= parsedTime && parsedTime <= end) {
        return true;
      }
    }
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractTimeRanges(timeSteps: number, availabilityHash: Record<string, string[]>, isWeekly: boolean, selectedDate: Date | null): any {
  const timeSlots = renderTimeSlots(timeSteps)
  let result: any = null
  if (!selectedDate) {
    if (isWeekly) {
      result = findTimeRangesForDateRange(availabilityHash, timeSlots)
    }
    else {
      result = findTimeRangesForSpecificDates(availabilityHash, timeSlots)
    }
  } else {
    if (isWeekly) {
      const dayKey = selectedDate.getDay().toString()
      const parsedHash: Record<string, string[]> = {}
      parsedHash[dayKey] = availabilityHash[dayKey]
      result = findTimeRangesForDateRange(parsedHash, timeSlots)
    } else {
      const dateKey = dayjs(selectedDate).format('YYYY-MM-DD').toString()
      const parsedHash = { dateKey : availabilityHash[dateKey] }
      result = findTimeRangesForSpecificDates(parsedHash, timeSlots)
    }
  }
  return [result[0], result[1]];
}

function findTimeRangesForDateRange(availabilityHash: Record<string, string[]>, timeSlots: string[]): any {
  const availableDates: Set<number> = new Set([])
  const availableTimes: Set<string> = new Set('')
  for (const day in availabilityHash) {
    availableDates.add(Number(day))
    const hashPerDay: string[] = availabilityHash[day]
    for (const timeSlot of timeSlots) {
      isTimeInRange(timeSlot, hashPerDay) && availableTimes.add(timeSlot)
    }
  }
  return [availableTimes, availableDates]
}

function findTimeRangesForSpecificDates(availabilityHash: Record<string, string[]>, timeSlots: string[]): any {
  const availableDates: Set<number> = new Set([])
  const availableTimes: Set<string> = new Set('')
  for (const date in availabilityHash) {
    availableDates.add(Number(dayjs(date).day()))
    const hashPerDate: string[] = availabilityHash[date]
    for (const timeSlot of timeSlots) {
      isTimeInRange(timeSlot, hashPerDate) && availableTimes.add(timeSlot)
    }
  }
  return [availableTimes, availableDates]
}
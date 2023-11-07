import { useEffect } from 'react'
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import './TimezoneSelector.scss'
import { isAlternateTzFormat } from '../../Constants/helpers';
import useAppContext from '../../useAppContext'
import { EMOJIS } from '../../Constants/app-constants';


dayjs.extend(utc)
dayjs.extend(timezone)

const TIMEZONES = {
  ...allTimezones,
  "America/Lima": "Pittsburgh",
  "Europe/Berlin": "Frankfurt"
}

const TimezoneSelector = () => {
  const { selectedTimezone, handleTimezoneChange } = useAppContext();

  useEffect(() => {
    const tzValue = isAlternateTzFormat(selectedTimezone) ? selectedTimezone.value : selectedTimezone
    handleTimezoneChange(tzValue)
  });

  return (
    <div className="timezone-selector-container">
      <h1>Pick a suitable date</h1>
      <div className="info-container">
        <p className="info-text">Select a particular date to check availability</p>
      </div>
      <div className="timezone-wrapper">
        <TimezoneSelect value={selectedTimezone} onChange={handleTimezoneChange} labelStyle="original" timezones={TIMEZONES}/>
      </div>
    </div>
  )
}

export default TimezoneSelector
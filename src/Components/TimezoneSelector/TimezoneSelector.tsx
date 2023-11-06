import { useMemo, useState } from 'react'
import TimezoneSelect, { allTimezones } from "react-timezone-select";

// Third party libraries
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface TzProps {
  defaultTimezone?: string | AlternateTzFormat
}

declare type AlternateTzFormat = {
  value: string
  label: string
  abbrev?: string
  altName?: string
  offset?: number
}

const TIMEZONES = {
  ...allTimezones,
  "America/Lima": "Pittsburgh",
  "Europe/Berlin": "Frankfurt"
}

const isAlternateTzFormat = (timezone: string | AlternateTzFormat): timezone is AlternateTzFormat => {
  return (timezone as AlternateTzFormat).value !== undefined;
}

const TimezoneSelector = ({ defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone }: TzProps) => {
  const [tz, setTz] = useState(defaultTimezone)
  const [datetime, setDatetime] = useState(dayjs());

  useMemo(() => {
    const tzValue = isAlternateTzFormat(tz) ? tz.value : tz
    setDatetime(dayjs.tz(datetime, tzValue))
  }, [tz]);

  return (
    <>
      <h2>Select Timezone:</h2>
      <div className="timezone-wrapper">
        <TimezoneSelect value={tz} onChange={setTz} labelStyle="original" timezones={TIMEZONES}/>
      </div>
    </>
  )
}

export default TimezoneSelector
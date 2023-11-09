/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { BASE_64_ICONS, EMOJIS } from './Constants/app-constants'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { extractTimeRanges } from './Constants/helpers'
import axios from 'axios'
import './App.scss'

// Components
import CustomCalendar from './Components/CustomCalendar/CustomCalendar'
import TimezoneSelector from './Components/TimezoneSelector/TimezoneSelector'
import TimePicker from './Components/TimePicker/TimePicker'
import useAppContext from './useAppContext';

const App = () => {
  const timeSteps: number = 30
  const duration: number = 30
  const createFreshsalesFavicon = () => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = BASE_64_ICONS.FAVICON;
    }
  }

  const {
    openTimePicker,
    updateAvailableTimes,
    updateAvailableDates,
    updatePerDayTimeAvailability,
    updatePerDateAvailability,
    selectedDate,
    handleOpenTimePicker
  } = useAppContext()

  const extractedTimeRangesRef = useRef([])
  const maxDaysRef = useRef(0)
  const apiResponseDataRef = useRef(null)
  const [hasAppLoaded, setHasAppLoaded] = useState(false)

  useEffect(() => {
    createFreshsalesFavicon()
    let scheduleName = document.getElementById('root').getAttribute('data-schedule-link');
    let host;
    if (scheduleName) {
      host = "http://" + window.location.host + '/meetings/' + scheduleName + '/booking_details'
    } else {
      host = `${window.location.href}/booking_details`
    }
    const apiUrl = host
    axios.get(apiUrl, { headers: { 'Accept': '*/*' } }).then((response) => {
      const apiResponse = response.data.scheduler
      apiResponseDataRef.current = apiResponse
      const isWeekly: boolean = apiResponse.date_time_configs.is_weekly
      maxDaysRef.current = isWeekly ? apiResponse.date_time_configs.max_days : 0
      const availabilityHash = isWeekly ? apiResponse.date_time_configs.specific_days : apiResponse.date_time_configs.specific_dates
      extractedTimeRangesRef.current = extractTimeRanges(timeSteps, availabilityHash, isWeekly, selectedDate)
      setHasAppLoaded(true)
    })
    .catch((error) => {
      console.error('API call error:', error);
    });
  }, [])

  useEffect(() => {
    if (hasAppLoaded) {
      const apiResponse = apiResponseDataRef.current
      const isWeekly = apiResponse.date_time_configs.is_weekly
      const availabilityHash = isWeekly ? apiResponse.date_time_configs.specific_days : apiResponse.date_time_configs.specific_dates
      const [times, dates] = extractTimeRanges(timeSteps, availabilityHash, isWeekly, selectedDate)
      if (!selectedDate) {
        updateAvailableTimes(times)
        updateAvailableDates(dates)
      } else {
        handleOpenTimePicker(true)
        updatePerDayTimeAvailability(dates, times)
        updatePerDateAvailability(dates)
      }
    }
  }, [selectedDate, hasAppLoaded])

  return (
    <>
    {hasAppLoaded ? 
      <div>
        <h1 className="app-header">{EMOJIS.MEETING}&nbsp;<span className="gradient">Meeting Scheduler</span></h1>
        <div className="container">
          <section className="appointment-details">
            <div className="content-container">
              <h1 className="title">{apiResponseDataRef.current.title}</h1>
              <div className="duration">
                  <strong>Duration&nbsp;</strong>{EMOJIS.DURATION}&nbsp;{duration} minute meeting
              </div>
              <div className="description" title={apiResponseDataRef.current.description}>{apiResponseDataRef.current.description}</div>
            </div>
          </section>
          <section className="date-picker">
            <TimezoneSelector />
            <CustomCalendar maxDays={maxDaysRef.current} />
          </section>
          {
            openTimePicker ?
              <section className="time-picker"><TimePicker timeStep={timeSteps} appointmentTitle={apiResponseDataRef.current.title} /></section> :
              null
          }
        </div>
        <footer>
          <div className="powered-by">
            Powered by <span className="gradient">&nbsp;Freshsales</span>
          </div>
        </footer>
      </div> : <h1>Loading...</h1>}
    </>
  )
}

export default App

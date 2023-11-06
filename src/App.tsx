import { useEffect } from 'react'
import { BASE_64_ICONS, EMOJIS } from './Constants/app-constants'
import { stubData } from './Constants/api-stub'

// Third party libraries
import 'rsuite/dist/rsuite-no-reset.min.css';

// App styles
import './App.scss'

// Components
import CustomCalendar from './Components/CustomCalendar/CustomCalendar'
import TimezoneSelector from './Components/TimezoneSelector/TimezoneSelector'

const defaultTimezone = stubData.appointmentDetails.timezone ?? 'Etc/Utc'

const App = () => {

  useEffect(() => {
    createFreshsalesFavicon();
  }, [])

  const createFreshsalesFavicon = () => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = BASE_64_ICONS.FAVICON;
    }
  }

  return (
    <div className="container">
      <section className="appointment-details">
        <h2 className="title">{stubData.appointmentDetails.title}</h2>
        <h6 className="duration">{EMOJIS.DURATION} {stubData.appointmentDetails.duration} minutes</h6>
        <div className="description">{stubData.appointmentDetails.description}</div>
      </section>
      <section className="date-picker">
        <TimezoneSelector defaultTimezone={defaultTimezone} />
        <CustomCalendar defaultTimezone={defaultTimezone} />
      </section>
      <section className="time-picker">
      </section>
    </div>
  )
}

export default App

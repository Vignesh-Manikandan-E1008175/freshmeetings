/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { BASE_64_ICONS, EMOJIS } from './Constants/app-constants'
import { stubData } from './Constants/api-stub'
import 'rsuite/dist/rsuite-no-reset.min.css';
import axios from 'axios'
import AppProvider from './AppProvider';
import './App.scss'

// Components
import CustomCalendar from './Components/CustomCalendar/CustomCalendar'
import TimezoneSelector from './Components/TimezoneSelector/TimezoneSelector'
import TimePicker from './Components/TimePicker/TimePicker'

const App = () => {

  useEffect(() => {
    createFreshsalesFavicon();
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     setError({ message: error.message, status: error.response?.status });
    //   });
  }, [])

  const createFreshsalesFavicon = () => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = BASE_64_ICONS.FAVICON;
    }
  }

  const disabledTimes = new Set([900, 1000, 1100, 2300])

  return (
    <AppProvider>
      <h1 className="app-header">{EMOJIS.MEETING}&nbsp;<span className="gradient">Meeting Scheduler</span></h1>
      <div className="container">
        <section className="appointment-details">
          <div className="content-container">
            <h1 className="title">{stubData.appointmentDetails.title}</h1>
            <div className="duration">
                <strong>Duration&nbsp;</strong>{EMOJIS.DURATION}&nbsp;{stubData.appointmentDetails.duration} minute meeting
            </div>
            <div className="description" title={stubData.appointmentDetails.description}>{stubData.appointmentDetails.description}</div>
          </div>
        </section>
        <section className="date-picker">
          <TimezoneSelector />
          <CustomCalendar />
        </section>
        <section className="time-picker">
          <TimePicker timeSteps={60} disabledTimes={disabledTimes} />
        </section>
      </div>
      <footer>
        <div className="powered-by">
          Powered by <span className="gradient">&nbsp;Freshsales</span>
        </div>
      </footer>
    </AppProvider>
  )
}

export default App

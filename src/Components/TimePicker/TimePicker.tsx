import { useEffect, useState } from 'react';
import useAppContext from '../../useAppContext';
import { Button, ButtonGroup } from 'rsuite';
import ConfirmScheduleModal from '../ConfirmScheduleModal/ConfirmScheduelModal';

const TimePicker = ({ timeStep, appointmentTitle }) => {
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false)
  const { selectedDate, confirmSchedule, selectedTime, availableTimes, perDayTimeAvailability, handleTimeChange, handleConfirmSchedule, } = useAppContext();

  const handleTimeClick = (time: string) => {
    const timeValue = time.target.innerText
    handleTimeChange(timeValue)
    handleConfirmSchedule(time ? true : false);
  };

  useEffect(() => {
    confirmSchedule && setShowBookingConfirmation(true)
  }, [confirmSchedule])

  return (
    <>
      <ButtonGroup horizontal className='time-picker-container'>
        {
          !selectedDate ? 
            Array.from(availableTimes).map((time, index) => {
              return (<Button key={index} appearance='subtle' size='md' color='blue' onClick={handleTimeClick}>{time}</Button>)
            }) :
            Array.from(perDayTimeAvailability.times).map((time, index) => {
              return (<Button appearance='subtle' key={index} size='md' color='blue' onClick={handleTimeClick}>{time}</Button>)
            })
        }
      </ButtonGroup>
      {showBookingConfirmation ? (<ConfirmScheduleModal showModal={setShowBookingConfirmation} timeStep={timeStep} appointmentTitle={appointmentTitle}/>) : null}
    </>
  );
};

export default TimePicker;

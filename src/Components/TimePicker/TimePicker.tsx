import { useEffect } from 'react';
import useAppContext from '../../useAppContext';
import { Button, ButtonGroup } from 'rsuite';

const TimePicker = () => {
  const { selectedDate, selectedTime, availableTimes, perDayTimeAvailability, handleTimeChange, handleConfirmSchedule, } = useAppContext();

  const handleTimeClick = (time: string) => {
    handleTimeChange(time)
    handleConfirmSchedule(time ? true : false);
  };

  useEffect(() => {

  }, [selectedDate, selectedTime])

  return (
    <>
      <ButtonGroup vertical className='time-picker-container'>
        {
          !selectedDate ? 
            Array.from(availableTimes).map((time, index) => {
              return (<Button key={index} appearance='subtle' size='md' color='blue' onClick={() => handleTimeClick}>{time}</Button>)
            }) :
            Array.from(perDayTimeAvailability.times).map((time, index) => {
              return (<Button appearance='subtle' key={index} size='md' color='blue' onClick={() => handleTimeClick}>{time}</Button>)
            })
        }
      </ButtonGroup>
    </>
  );
};

export default TimePicker;

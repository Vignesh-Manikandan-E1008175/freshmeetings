import React, { useState } from 'react';

interface TimePickerProps {
  timeSteps: number;
  disabledTimes: Set<number>;
}

const TimePicker: React.FC<TimePickerProps> = ({ timeSteps, disabledTimes }) => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const handleTimeClick = (time: number) => {
    if (!disabledTimes.has(time)) {
      setSelectedTime(time);
    }
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let i = 0; i < 24 * 60; i += timeSteps) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const time = hours * 100 + minutes;

      const isDisabled = disabledTimes.has(time);

      timeSlots.push(
        <button
          key={time}
          onClick={() => handleTimeClick(time)}
          disabled={isDisabled}
          className={isDisabled ? 'disabled' : selectedTime === time ? 'selected' : ''}
        >
          {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}
        </button>
      );
    }
    return timeSlots;
  };

  return (
    <>
      {renderTimeSlots()}
    </>
  );
};

export default TimePicker;

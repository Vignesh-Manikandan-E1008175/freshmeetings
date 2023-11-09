import React, { useState } from 'react';
import { Button } from 'rsuite';
import './ConfirmScheduleModal.scss';
import { isEmail } from 'validator';
import useAppContext from './../../useAppContext';
import axios from 'axios'
import dayjs from 'dayjs'

const ConfirmScheduleModal = ({ showModal, timeStep, appointmentTitle }) => {
  const [email, setEmail] = useState('')
  const { selectedTime, selectedDate } = useAppContext()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };

  const handleCancel = () => {
    showModal(false)
  };

  const handleSchedule = () => {
    const timeParts = selectedTime.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const parsedDate = dayjs(selectedDate, 'YYYY-MM-DD')
    const fromDate = parsedDate.set('hours', hours).set('minutes', minutes).format('YYYY-MM-DD HH:mm:ss')
    const toDate = dayjs(fromDate).add(timeStep, 'minute').format('YYYY-MM-DD HH:mm:ss')
    const schedulerLink = window.location.href.split('meetings/')[1]
    const data = {
      appointment: {
        timezone: "Asia/Kolkata",
        title: appointmentTitle,
        from_date: fromDate,
        end_date: toDate
      },
      entity: {
        email: email
      },
      scheduler_details: {
        link: schedulerLink
      }
    }
    postData(data)
  };

  const postData = (data) => {
    axios.post(`${window.location.href}/submit`, data, {
      headers: {
        "Accept": "*/*"
      }
    }).then((res) => {
      console.log(res?.status === 200 && 'success')
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Finalize your choice for this time slot?</h3>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='e.g., girish.maathrubootham@freshworks.com'
            onChange={handleEmailChange}
            required
          />
        </div>
      </div>
      <div className="modal-footer">
        <Button appearance='ghost' size='md' color='yellow' onClick={handleCancel}>Cancel</Button>
        <Button appearance='default' size='md' color='blue' onClick={handleSchedule}>Schedule</Button>
      </div>
    </div>
  );
};

export default ConfirmScheduleModal;
export const stubData = {
  appointmentDetails: {
    timezone: '',
    title: 'Meeting with John Doe - Sales',
    duration: 30,
    description: 'This is a small catch-up meeting to discuss what we discussed in the last meeting.',
    allow_attendees: false,
    date_time_configs: {
      is_weekly: false,
      max_days: 20,
      specific_days: {
        'Monday': ['from', 'to'],
        'Tuesday': ['from', 'to'],
        'Wednesday': ['from', 'to'],
        'Thursday': ['from', 'to'],
        'Friday': ['from', 'to'],
        'Saturday': ['from', 'to'],
        'Sunday': ['from', 'to']
      },
      specific_dates: {
        '2023-11-07': ['from', 'to'],
        '2023-11-08': ['from', 'to'],
        '2023-11-09': ['from', 'to'],
        '2023-11-10': ['from', 'to'],
        '2023-11-11': ['from', 'to'],
        '2023-11-12': ['from', 'to'],
        '2023-11-13': ['from', 'to'],
        '2023-11-15': ['from', 'to']
      }
    }    
  }
}
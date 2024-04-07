import { format, getHours } from 'date-fns';

export function getDateToday()
{
  return format(new Date(), 'dd, MMM yyyy');
}

export function getCurrentTime()
{
  return format(new Date(), 'hh:mm aaa');
}

export function getGreeting()
{
    const currentHour = getHours(new Date());

    if (currentHour < 12)
    {
        return "Morning";
    } 
    else if (currentHour >= 12 && currentHour < 18)
    {
        return "Afternoon";
    }
    else if (currentHour >= 18)
    {
        return "Evening";
    }
}


function padStart(num)
{
  return num.toString().padStart(2, "0")
}

//formats time into hh:mm:ss
export function formatTime(milliseconds) 
{
  let seconds = milliseconds % 60;
  let minutes = Math.floor(milliseconds / 60);
  let hours = Math.floor(minutes / 60);
  
  minutes = minutes % 60;

  let timeString =  `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;
  return timeString;
}

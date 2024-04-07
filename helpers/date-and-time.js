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


function padStart()
{
  return num.toString().padStart(2, "0")
}

export function formatMs() 
{
  let seconds = Math.floor(milliseconds / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)

  // using the modulus operator gets the remainder if the time roles over
  // we don't do this for hours because we want them to rollover
  // seconds = 81 -> minutes = 1, seconds = 21.
  // 60 minutes in an hour, 60 seconds in a minute, 1000 milliseconds in a second.
  minutes = minutes % 60
  seconds = seconds % 60
  // divide the milliseconds by 10 to get the tenths of a second. 543 -> 54
  const ms = Math.floor((milliseconds % 1000) / 10)

  let str = `${padStart(minutes)}:${padStart(seconds)}.${padStart(ms)}`

  if (hours > 0) {
    str = `${padStart(hours)}:${str}`
  }

  return str
}

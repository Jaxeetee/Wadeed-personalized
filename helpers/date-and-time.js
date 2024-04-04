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


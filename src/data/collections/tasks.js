import { openDatabase, DB_NAME, VERSION } from '../database';
import { getDateToday } from '../../../helpers/date-and-time';

export async function getAllTasksToday()
{
  const db = openDatabase(DB_NAME, VERSION);

  try {

  } catch (error) {
    console.log(error);
  }
}

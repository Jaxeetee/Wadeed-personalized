import { getDateToday } from '../../../helpers/date-and-time';
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'task';

export async function getAllTasksToday()
{
  const db = SQLite.openDatabase(DB_NAME);

  await createTable();

  try {
    await db.transaction( async (tx) => {
      const result = await tx.executeSql(`
      SELECT * 
        FROM task
        WHERE date_of_task = ${getDateToday()}`);

      return result;
    });
  } catch (error) {
    console.error(error);
  }
}

export async function addTask(newData)
{
  const { taskName, startTimestamp, duration, dateOfTask } = newData;
  const db = SQLite.openDatabase(DB_NAME);

  await createTable();

  try {
    db.transaction((tx) => {
      tx.executeSql(`
      INSERT INTO task (task_name, start_timestamp, duration, date_of_task)
        VALUES
          (${taskName}, ${startTimestamp}, ${duration}, ${dateOfTask})
      `)
    })
  } catch (error) {
    console.error(error);
    
  }
}

export async function createTable()
{
  const db = SQLite.openDatabase(DB_NAME);

  try {
    db.transaction((tx) => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS task(
        id INT PRIMARY KEY AUTOINCREMENT NOT NULL,
        task_name VARCHAR(255) NOT NULL,
        start_timestamp TIME,
        duration TIME,
        date_of_task DATE
        );
      `);
    });
  } catch(error) {
    console.error(error);
  }

}

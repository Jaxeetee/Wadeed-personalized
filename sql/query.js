import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { getDateToday } from '../helpers/date-and-time';

export async function loadDatabase()
{
  const dbName = 'wadoo.db';
  const dbAsset = require("./assets/wadoo.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilepath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilepath);
  if (!fileInfo.exists)
  {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true}
    );
    await FileSystem.downloadAsync(dbUri, dbFilepath);
  }
}

// submits data to db
export async function submitData(data)
{
  const db = await SQLite.openDatabase('wadoo');

  try {
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync(
        `INSERT INTO tasks (task_name, start_timestamp, duration, date_started)
        VALUES (?, ?, ?, ?)
        `
      ,[data.task_name, data.start_timestamp, data.duration, data.date_started]);
    })
  }
  catch(err)
  {
    console.error(`failed to submit to db: ${err}`);
  }
}

// gets list of data
export async function getData()
{
  const db = await SQLite.openDatabase('wadoo');

  try {
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT * FROM tasks
          WHERE start_date >= ? AND
          start_date <= ?;`
      ,[getDateToday(), getDateToday()]);
      
      return result;
    })
  }
  catch(err)
  {
    console.error(err);
  }
}
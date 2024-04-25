import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import * as SLQN from 'expo-sqlite/next';
import { Asset } from 'expo-asset';
import { getDateToday } from '../helpers/date-and-time';

export async function loadDatabase()
{
  const dbName = 'wadoo.db';
  const dbAsset = require("../assets/wadoo.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}

//using SQLite (not Next)
export async function submitData(db, data)
{
  // const db = await loadDatabase();

  const query = `
    INSERT INTO tasks(task_name, start_timestamp, duration, date_started)
    VALUES (?, ?, ?, ?);
  `;

  const values = [data.task_name, data.start_timestamp, data.duration, data.date_started];
  try
  {
    await db.withTransactionSync(async () => {
      await db.runAsync(query, values);
      console.info('successfully submitted to db');
    })
    
  }
  catch(err)
  {
    console.error(`could not submit to db: ${err}`);
  }

}

export async function fetchData(db)
{
  // const db = await loadDatabase();

  const query = `
    SELECT * FROM tasks
      WHERE DATE();
  `;

  try
  {
    const results = await db.getAllAsync(query);
    return results;
  }
  catch(err)
  {
    console.error(`could not fetch data: ${err}`);
    return [];
  }
}
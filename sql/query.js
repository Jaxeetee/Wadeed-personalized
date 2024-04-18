import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { getDateToday } from '../helpers/date-and-time';

export async function loadDatabase()
{
  const dbName = 'wadoo.db';
  const dbAsset = require("../assets/wadoo.db");
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
  console.log('submitted data');
  const db = await SQLite.openDatabase('wadoo.db');

  const sql = 
  `INSERT INTO tasks(task_name, start_timestamp, duration, date_started)
    VALUES (?, ?, ?, ?);
  `;

  try {
    console.log('before awaiting');
    await db.transactionAsync(async (tx) => {
      console.log("inside transaction");
       await tx.executeSqlAsync(sql,
        [data.task_name, data.start_timestamp, data.duration, data.date_started]);
    
    });
    console.log('success!');
  }
  catch(err)
  {
    console.error(`failed to submit to db: ${err}`);
  }
}

// gets list of data
export async function fetchData()
{
  const db = await SQLite.openDatabase('wadoo.db');

  const sql = 
    `SELECT * FROM tasks
    WHERE date_started >= ? AND
    date_started <= ?;`;

  try {
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(sql,
        [getDateToday(), getDateToday()]);

      const resultArr = result.rows;
      console.log(resultArr);
      return resultArr;
    })
  }
  catch(err)
  {
    console.error(err);
  }
}
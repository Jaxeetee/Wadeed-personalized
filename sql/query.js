import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import * as SLQN from 'expo-sqlite/next';
import { Asset } from 'expo-asset';
import { getDateToday } from '../helpers/date-and-time';

async function loadDatabase()
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

  return SQLite.openDatabase(dbName);
}

// // submits data to db
// export async function submitData(data)
// {
//   const {task_name, start_timestamp, duration, date_started} = data;
//   const db = await loadDatabase();


//   const sql = db.prepareAsync(
//   `INSERT INTO tasks(task_name, start_timestamp, duration, date_started)
//     VALUES (?, ?, ?, ?)
//   `);

//   try {
//     const result = await db.runAsync(sql, [task_name, start_timestamp, duration, date_started]);
//     console.log(result);
//   }
//   catch(err)
//   {
//     console.error(`failed to execute "submitData()": ${err}`);
//   }
// }

// // gets list of data
// export async function fetchData()
// {
//   const db = await loadDatabase();

//   const sql = await db.prepareAsync(
//     `SELECT * FROM tasks
//     WHERE date_started >= ? AND
//     date_started <= ?`);

//   console.info('attempting to fetch');
//   try {
//     const result = await db.getAllAsync(sql,[getDateToday(), getDateToday()]);
//     console.info(result);
//     return result;
//   }
//   catch(err)
//   {
//     console.error(`failed to execute method "fetchData()": ${err}`);
//   }
// }

//using SQLite (not Next)
export async function submitData(data)
{
  const db = await loadDatabase();

  const query = `
    INSERT INTO tasks(task_name, start_timestamp, duration, date_started)
    VALUES (?, ?, ?, ?);
  `;

  const values = [data.task_name, data.start_timestamp, data.duration, data.date_started];

  try
  {
    await db.transaction(async tx => {
      await tx.executeSql(query, values);
      console.info('done submitting');
    })

    console.log('testing');
  }
  catch(err)
  {
    console.err(`could not submit to db: ${err}`);
  }

}

export async function fetchData()
{
  const db = await loadDatabase();

  const query = `
    SELECT * FROM tasks
      WHERE date_started >= ? AND
      date_started <= ?
  `;

  try
  {
    await db.transactionAsync(async tx => {
      const result = await tx.executeSqlAsync(query, [getDateToday(), getDateToday()]);
      console.log('success!');
      console.info(result.rows);
      return result.rows;
    })
  }
  catch(err)
  {
    console.error(`could not fetch data: ${err}`);
    return [];
  }
}
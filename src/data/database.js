import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';


export const DB_NAME = 'tasks';
export const VERSION = '1';

async function openDatabase(pathToDatabaseFile)
{
  // first time creating
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) 
  {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }

  //returns an asset from the given path (pathToDatabaseFile)
  //then it will download the asset data to local file
  const asset = await Asset.fromModule(require(pathToDatabaseFile)).downloadAsync();

  //creates a copy of the directory 
  await FileSystem.copyAsync({
    from: asset.localUri,
    to: FileSystem.documentDirectory + `SQLite/${DB_NAME}.db`,
  });
  // finally opens/creates SQLite db
  const db = SQLite.openDatabase(`${DB_NAME}.db`);

  db.transaction((tx) => {
    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS task(
      id INT PRIMARY KEY AUTOINCREMENT,
      task_name VARCHAR(255),
      start_timestamp VARCHAR(255),
      duration INT,
      date_of_task DATE,  
      number_of_task INT
      );
    `);
  });
  
  
  return db;
}



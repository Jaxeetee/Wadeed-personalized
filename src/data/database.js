import * as SQLite from 'expo-sqlite';

//it will create a new db names tasks
const db = SQLite.openDatabase('tasks.db');

export default db;

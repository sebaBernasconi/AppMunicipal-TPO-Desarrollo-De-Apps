import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("sessions.db")

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS sessions (dni TEXT PRIMARY KEY NOT NULL, jwt TEXT NOT NULL)",
                [],
                () => resolve(),
                (_, error) => {
                    reject(error)
                }
            );
        });
    });
    return promise
}

export const insertSession = ({dni, jwt}) => {
    const promise = new Promise((accept, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO sessions (dni, jwt) VALUES (?, ?)",
                [dni, jwt],
                (_, result) => accept(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise
}

export const fetchSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM sessions",
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise
}

export const deleteSession = ({dni}) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM sessions WHERE dni = ?",
                [dni],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise
}
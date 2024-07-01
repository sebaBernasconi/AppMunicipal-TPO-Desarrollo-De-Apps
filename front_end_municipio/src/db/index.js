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

export const dropTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DROP TABLE sessions",
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise
}

/*
* *********************************************************************************************
*                                                                                             *
*                                FUNCIONES PARA GUARDAR RECLAMO RECLAMO                       *
*                                                                                             *
* *********************************************************************************************
* */

export const initReclamosGuardados = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS reclamosGuardados (idReclamo INTEGER PRIMARY KEY AUTOINCREMENT, dni TEXT NOT NULL, descripcion TEXT, descripcionSitio TEXT, descripcionDesperfecto TEXT, calle TEXT, nroCalle INTEGER, entreCalleA TEXT, entreCalleB TEXT, fechaApertura DATE, fechaCierre DATE, idRubro INTEGER, image BLOB, latitud REAL, longitud REAL, comentarios TEXT)",
                [],
                () => resolve(),
                (_, error) => {
                    reject(error)
                })
        })
    })
    return promise
}

export const guardarReclamo = ({dni, descripcion, descripcionSitio, descripcionDesperfecto, calle, nroCalle, entreCalleA, entreCalleB, fechaApertura, fechaCierre, idRubro, image, latitud, longitud, comentarios}) => {
    const promise = new Promise((accept, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO reclamosGuardados (dni, descripcion, descripcionSitio, descripcionDesperfecto, calle, nroCalle, entreCalleA, entreCalleB, fechaApertura, fechaCierre, idRubro, image, latitud, longitud, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [dni, descripcion, descripcionSitio, descripcionDesperfecto, calle, nroCalle, entreCalleA, entreCalleB, fechaApertura, fechaCierre, idRubro, image, latitud, longitud, comentarios],
                (_, result) => accept(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise
}

export const deleteReclamos = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM reclamosGuardados",
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise
}

export const getReclamosGuardados = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM reclamosGuardados",
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            )
        })
    })
    return promise
}

export const dropTableReclamos = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DROP TABLE reclamosGuardados",
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
    return promise
}
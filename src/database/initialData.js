import * as SQLiteDatabase from 'expo-sqlite';

async function insertData (db) {
    const data = [
        `INSERT INTO tiposMedidas (nombreTipoMedida) VALUES
            ('Unidad'),
            ('Ropa'),
            ('Calzado'),
            ('Numerico')
        `,

        `INSERT INTO medidas (idTipoMedida, medida) VALUES
            (1, 'Pieza'),
            (1, 'Par'),
            (1, 'Juego'),
            (1, 'Set'),
            (1, 'Caja'),
            (1, 'Bolsa'),
            (1, 'Kit'),
            (1, 'Docena'),

            (2, 'XXXL'),
            (2, 'XXL'),
            (2, 'XL'),
            (2, 'L'),
            (2, 'M'),
            (2, 'XS'),
            (2, 'XXS'),
            (2, 'XXXS'),

            (3, '22'),
            (3, '22.5'),
            (3, '23'),
            (3, '23.5'),
            (3, '24'),
            (3, '24.5'),
            (3, '25'),
            (3, '25.5'),
            (3, '26'),
            (3, '26.5'),
            (3, '27'),
            (3, '27.5'),
            (3, '28'),
            (3, '28.5'),
            (3, '29'),
            (3, '29.5'),
            (3, '30'),
            (3, '30.5'),

            (4, '20'),
            (4, '21'),
            (4, '22'),
            (4, '23'),
            (4, '24'),
            (4, '25'),
            (4, '26'),
            (4, '27'),
            (4, '28'),
            (4, '29'),
            (4, '30'),
            (4, '31'),
            (4, '32'),
            (4, '33'),
            (4, '34'),
            (4, '35'),
            (4, '36');

        `
    ];
}

export async function initialData (db) {
    try {
        await db.execAsync(`PRAGMA journal_mode = 'WAL'; PRAGMA foreign_keys = ON;`);

        await insertData(db);
        console.log("Data initialized successfully");
    } catch ( error ) {
        console.error("Error initializing data:", error);
    }
}
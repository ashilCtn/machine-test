import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db; 

const connectToDb = async () => {
    try {
        db = await open({
            filename: 'sales_data.db',
            driver: sqlite3.Database
        });

        await db.run(`
            CREATE TABLE IF NOT EXISTS sales_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                receipt_number TEXT,
                sale_date TEXT,
                transaction_time TEXT,
                sale_amount REAL,
                tax_amount REAL,
                discount_amount REAL,
                round_off REAL,
                net_sale REAL,
                payment_mode TEXT,
                order_type TEXT,
                transaction_status TEXT
            )
        `);

        console.log('SQLite connected');
    } catch (error) {
        console.error('Error connecting to db', error);
        process.exit(1);
    }
};

export { connectToDb, db };

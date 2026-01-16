import { db } from "../database/sqlite.js";

const readDataFromDb = async (req, res)=>{
    try {
        // gets all stored entries from local db
        const rows = await db.all('SELECT * FROM sales_data');

        // data validation
        if (!rows) {
            const error = new Error();
            error.statusCode = 404;
            error.message = 'Failed to read data from db';
            throw error;
        }

        // sends success response 
        res.status(200).json({
            success: true,
            message: 'data readed successfully',
            data: rows
        })

    } catch (error) { // error handling
        res.status(error.statusCode || 500).json({
            success:false,
            message: error.message || 'Internal server Error'
        })
    }

}

// exporting the controller
export default readDataFromDb;
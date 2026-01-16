import { db } from "../database/sqlite.js";
import dotenv from 'dotenv';

dotenv.config();


const fetchDataFromApi = async (req, res) => {    
    try {

        const fromDate = '2025-01-20 00:00:00';
        const toDate = '2025-01-20 23:59:59';

        // collecting env variables from .env file
        const url = `http://api.petpooja.com/V1/orders/get_sales_data/?app_key=${process.env.APP_KEY}&app_secret=${process.env.SECRET_KEY}&access_token=${process.env.ACCESS_TOKEN}&restID=${process.env.REST_ID}&from_date=${encodeURIComponent(fromDate)}&to_date=${encodeURIComponent(toDate)}`;

        // fetching data from api
        const response = await fetch(
            url
        );

        const result = await response.json();

        // Proper logging
        console.log('API Records:', result.Records);

        // data validation
        if (!result.Records || result.Records.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No data found from API'
            });
        }

        // stores to sqllite
        for (const s of result.Records) {
            await db.run(
                `INSERT INTO sales_data (
                    receipt_number,
                    sale_date,
                    transaction_time,
                    sale_amount,
                    tax_amount,
                    discount_amount,
                    round_off,
                    net_sale,
                    payment_mode,
                    order_type,
                    transaction_status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    s["Receipt number"],
                    s["Receipt Date"],
                    s["Transaction Time"],
                    Number(s["Invoice amount"]),
                    Number(s["Tax amount"]),
                    Number(s["Discount amount"]),
                    s["Round Off"],
                    Number(s["Net sale"]),
                    s["Payment Mode"],
                    s["Order Type"],
                    s["Transaction status"]
                ]
            );
        }

        // final response
        res.status(200).json({
            success: true,
            message: 'Data fetched and saved successfully'
        });

    } catch (error) { // handling error
        console.error('Fetch API Error:', error);

        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


// exporting the controller
export { fetchDataFromApi };

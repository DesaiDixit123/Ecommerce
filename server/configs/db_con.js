import { connect } from "mongoose"

export const db_con = async(conn) => {
    await connect(conn)
    console.log("Database connected...")
}
export async function getAircrafts(){
    const [rows] = await pool.query("SELECT * FROM aircraft")
    return rows

}
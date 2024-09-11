export async function registerUser(FirstName, LastName, DateOfBirth, Email, PassengerType) {
    const result = await pool.query(`
        INSERT INTO Passengers (FirstName, LastName, DateOfBirth, Email, PassengerType) 
        VALUES (?, ?, ?, ?, ?)
        `, [FirstName, LastName, DateOfBirth, Email, PassengerType])


        return result
    
}
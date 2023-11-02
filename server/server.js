const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors())

// get all lists
app.get('/lists/:userEmail', async (req, res) => {
    const { userEmail } = req.params

    try {
        const lists = await pool.query('SELECT * FROM lists WHERE user_email = $1', [userEmail])
        res.json(lists.rows)

    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))
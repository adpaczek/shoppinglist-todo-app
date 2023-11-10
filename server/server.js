const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

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

// get all items
app.get('/lists/:listId/items', async (req, res) => {
    const { listId } = req.params;
  
    try {
      const items = await pool.query('SELECT * FROM items WHERE list_id = $1', [listId]);
      res.json(items.rows);
    }catch (err) {
        console.error(err)
    }
})

// create a new list 
app.post('/lists/', async(req, res) => {
    const { user_email, title, date } = req.body
    console.log(user_email, title, date )
    const id = uuidv4()
    try {
        const newList = await pool.query(`INSERT INTO lists (id, user_email, title, date) VALUES($1, $2, $3, $4)`, 
            [id, user_email, title, date])
        res.json(newList)
    } catch (err) {
        console.error(err)
    }
})

// create a new item
app.post('/lists/:list_id/items', async(req, res) => {
    const { list_id } = req.params
    const { name, quantity, unit, completed, reference_image } = req.body
    console.log(list_id, name, quantity, unit, completed, reference_image)
    const id = uuidv4()
    try {
        const newItem = await pool.query(`INSERT INTO items (id, list_id, name, quantity, unit, completed, reference_image) VALUES($1, $2, $3, $4, $5, $6, $7)`, 
            [id, list_id, name, quantity, unit, completed, reference_image])
        res.json(newItem)
    } catch (err) {
        console.error(err)
    }
})

// edit a list
app.put('/lists/:id', async (req, res) => {
    const { id } = req.params
    const {user_email, title, date} = req.body
    try {
        const editList = await pool.query('UPDATE lists SET user_email = $1, title = $2,  date = $3 WHERE id = $4;', 
        [user_email, title, date, id])
        res.json(editList)
    } catch (err) {
        console.error(err)
    }
})

// edit item
app.put('/lists/:listId/items/:itemId', async (req, res) => {
    const { listId, itemId } = req.params;
    try {
        const toggleCompletion = await pool.query('UPDATE items SET completed = NOT completed WHERE id = $1 AND list_id = $2;', [itemId, listId])
        res.json(toggleCompletion)
    } catch (err) {
        console.error(err)
    }
})


// delete a list
app.delete('/lists/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteList = await pool.query('DELETE FROM lists WHERE id = $1;', [id])
        res.json(deleteList)
    } catch (err) {
        console.error(err)
    }
})

// signup
app.post('/signup', async(req, res) => {
    const { email, password } = req.body 
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
            [email, hashedPassword])
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})
        res.json({ email, token})

    } catch (err) {
        console.error(err)
        if (err) {
            res.json({detail: err.detail})
        }
    }
})

// login
app.post('/login', async(req, res) => {
    const { email, password } = req.body 
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (!users.rows.length) return res.json({detail: 'User does not exist!'})
        
        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})

        if (success) {
            res.json({ 'email' : users.rows[0].email, token})
        } else {
            res.json({ detail: 'Login failed'})
        }
    } catch (err) {
        console.error(err)
        res.json({ detail: 'Login failed due to an error' });
    }
})


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))
import express, { Response, Request } from 'express'
import path from 'path'

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log('Servidor on.');
})
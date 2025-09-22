import express,  { type Request, type Response} from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Hello this server is fine")
})

app.listen(3000, () => console.log("server connected"))
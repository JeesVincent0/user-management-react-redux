import express, {} from 'express';
const app = express();
app.get('/', (req, res) => {
    res.send("Hello this server is fine");
});
app.listen(3000, () => console.log("server connected"));
//# sourceMappingURL=app.js.map
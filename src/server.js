import app from "./app.js"
import connection from "./utils/db.js";

const port = process.env.PORT;

app.listen(port, () => { 
    console.log(`server is listen at port ${port}`);
})
connection();
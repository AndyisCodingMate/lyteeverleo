import { mintHT } from './scripts/mint-ht.js'
import { mintMRT } from './scripts/mint-mrt.js'
import { burnHT } from './scripts/burn-ht.js'
import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("Server Listening on PORT:", PORT);

});

app.get("/status", (request, response) => {
    
    const status = {
        "Status": "Running"
    };

    response.send(status);
});

app.put("/api/mintHT/:toAddress", (request, response) => {
    
    error = "200 OK"
    
    try {
        mintHT(request.params.toAddress);
    } catch(err) {
        console.log(err);
        error = err;
    }
    
    response.send(error);
});

app.put("/api/mintMRT/:admingAddress/:toAddress/:data", (request, response) => {
    
    error = "200 OK"
    
    try {
        mintMRT(
            request.params.adminAddress,
            request.params.toAddress,
            request.params.data
            );
    } catch(err) {
        console.log(err);
        error = err;
    }
    
    response.send(error);
});

app.put("/api/burnHT/:toAddress", (request, response) => {
    
    error = "200 OK"

    try {
        burnHT(request.params.toAddress);
    } catch(err) {
        console.log(err);
        error = err;
    }
    
    response.send(error);
});
import express from "express";
import axios from "axios";

const app = express();
const port = 4000;
const URL = "https://api.coinlore.net"

app.use(express.static("Public"));


// Home page
app.get("/", (req, res)=>{
    res.render("index.ejs");
});

// Resume
app.get("/resume", (req, res)=>{
    res.render("resume.ejs");
});


app.get("/projects", async(req, res)=>{
    try{
        // console.time("API Request") to calculate API response time
        const result = await axios.get(URL+"/api/global");
        const globalData = result.data[0]
        // console.timeEnd("API Request") to calculate API response time
        const result2 = await axios.get(URL+"/api/tickers/?start=0&limit=10")
        const tickersData = result2.data.data

        res.render("projects.ejs", {
            data: globalData,
            tickersData: tickersData
    })

        // console.log(result2.data);
    }catch(error){
        console.error("Error fetching data from Coinlore API", error);
        res.render("projects.ejs", {data: null})
    
    }
    });

//  Contact
app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
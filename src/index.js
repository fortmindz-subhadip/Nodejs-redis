const express = require("express");
const app = express();
require("dotenv").config();
const redis = require("redis");
const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

const testRedis = async () => {
  try {
    await client.connect();
    console.log("connected to redis ");
// string data structure 
// oprration SET ,GET , MSET ,MGET THIS 4 OPERATION  ARE NEED WHILE WORKING WITH 
// STRING DATA STRUCTURE 

// let my_name= await client.set('name','subhadip shee');
// let getMyName=await client.get('name')

await client.mSet(["user:name", "subhadip shee", "user:email", "subhadipshee2001@gmail.com"]);

// Correct way to get multiple values
const [name] = await client.mGet(["user:name"]);

console.log(name); 






   
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
  }
};
testRedis();
app.listen(3000, () => {
  console.log(`server listing in port ${3000}`);
});

module.exports = {
  client,
};

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

// await client.mSet(["user:name", "subhadip shee", "user:email", "subhadipshee2001@gmail.com"]);

// // Correct way to get multiple values
// const [name,email] = await client.mGet(["user:name","user:email"]);

// console.log(name,email); 

// list data structure LPUSH ,RPUSH ,LPOP ,RPOP ,LRANGE 



// await client.lPush('skills',['nodejs','expressjs','redis','mongodb']);
// const getAllSkill=await client.lRange('skills',0,-1);
// // console.log(getAllSkill);

//    const getFirstSkill=await client.lPop('skills');
//    const getLastSkill=await client.rPop('skills');
//    console.log(getFirstSkill,getLastSkill);


// now its comes  to work with set data structure. 
// Methods are SADD ,SMEMBERS ,SISMEMBER ,SREM

let addSkillls=await client.sAdd('skills',['react','expressjs','nodejs','mongodb']);
console.log(addSkillls)
const getAllSkill=await client.sMembers('skills');
console.log(getAllSkill);
const remSkill=await client.sRem('skills','react');
console.log(getAllSkill);
console.log(remSkill);

// make a pub sub-model
// Create a new Redis client

const subscriber = client.duplicate();
await subscriber.connect();

// Subscribe to a channel
await subscriber.subscribe("message", (message) => {
  console.log("Received message:", message);
});

// Publish a message to the channel
const publishCount = await client.publish("message", "hello world");
console.log("Number of subscribers received the message:", publishCount);
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



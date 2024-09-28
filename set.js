const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0l1MDBub0dWaTZmVzYzS2xmajhjRjdYbi83SlpES08vNlpYYWtxek5saz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0hSNVNtNnp0L3lTTnZLOENKTzY3S1VMYTdpK3pDemN1UUR0a0JTdWhXUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQ3JITGl0YU9LVFowMDZ5TElUSm13RmJhdXVubFJTVUNraVhVZk5Gb1g0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4K3ZaQWg2ZHFXWkRHZnYzRG5mNHl6MHN0Zk81L1RVWU1ha0xMYlF5dTB3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNPbzlVNE16dnFNZU5iWHRBbzBzaUlEaHlod3cwdDJLSmJRa29TTUd3V1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktmaVc5VW4xQndHV0NZU2lVY01BanpWbzNta1lBSDlLRFMvOFZUeE9qd2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVB5c1ZHOVlPUDRsRzVVZzR3N0N1S0lSU1BMZzhWOUVNbW0rWGp3NVpuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1QxZ2VsOWtnYWxUV1J1aGFQUjZqUXd0VEpaeU9PdlJIa0pYUHJrZm9Baz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlMVGZHM1pVVWZMYjArU0hKeWhBTXZyaDRXT2RYdzdMcmhDYU9oWjVlL2hiSlpwVUpHTEVkdzd2czVxTnZNNFU2TGVsSzZ0K3NCVUlIYXN5RlQ1VEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMyLCJhZHZTZWNyZXRLZXkiOiJyQlk4T0E5cFJUVkc5SG51aTFWS2RRZjRXQTlsY0VxMzVqYjlidFJST0RnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTAxMDAyODI1OThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjZCRTE3RTI5OTAxMTJENDg0QUM0OUI2OTczODdGNTIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzU1NTc5Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUmd2OXgtaHdUbi04cTNjWEdfZXZodyIsInBob25lSWQiOiI5MzlkNDgwYy0yYjcyLTQ4OTItOTM2Yy02OTBmNmZhMGJlNTkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkthUGRNenpoUlNGWm9yNzlYRHVRbWhMbGdjPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktPWStXKzVxUHRncU45bzUzQUk5dTdhTnhLdz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJSUDhUV1M3NSIsIm1lIjp7ImlkIjoiMjI1MDEwMDI4MjU5ODo2MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLimZzqpr3ig6Hig50g8J2Tn/Cdk7vwnZOy8J2TtvCdk77wnZO8IPCThqnwn6SN8JOGqvCdk5fwnZSC8J2TrfCdk7vwnZO4IOqmveKDoeKDneKZnCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3ZkaFkwREVMN1I0YmNHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQTYzVmRnS2p1bDBYdjBiYXJQeGsvZ2xNRmE1L3hydndRdE0rR0hIM25oWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOCtLZmIySmZ1KzlrV3hLbWxYaG5TekdQaGxlYVc3OFB0K0N3YUFGOUwxWXBmT3RZd2xwSVBYMjQyRktHcjd6a3pndnJ2dEZEYVJPendNbGpuODVXRHc9PSIsImRldmljZVNpZ25hdHVyZSI6InJDL29OYXZJclM4SVhKRk8wMTVSZlFUTzFvajdoTW9ycGFTdTFGbTl3dGsxRTJ2UkVBb1lqWndXY0FvUUprSVF5RW5tSU9nclR0V2ZaVFVjMU9rckJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1MDEwMDI4MjU5ODo2MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRT3QxWFlDbzdwZEY3OUcycXo4WlA0SlRCV3VmOGE3OEVMVFBoaHg5NTRXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3NTU1Nzg4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU55ayJ9',
    PREFIXES: (process.env.PREFIX || '!').split('!').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "♜ꦽ⃡⃝ 𝓟𝓻𝓲𝓶𝓾𝓼 𓆩🤍𓆪𝓗𝔂𝓭𝓻𝓸 ꦽ⃡⃝♜",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2250100282598",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://iili.io/dZ5fCf1.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,postgresql:'//bestangel1_user:75euCuvUHwqi5RHdlh1mVFBEzJgNSaqx@dpg-crs2bvogph6c738o49mg-a.oregon-postgres.render.com/bestangel1'
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkNGSWExNm54M0lQU1R1dUNvbmxZaGVPS0ZDQk5NYjJYUmFLWm13K01Gbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmJPc2piT253dEdpemRrUjlHYW5MSGI5MkFEbmM5bDd2a1hnV2F1ZFozcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSlRua2N5eHlvdnhrSHRwNkhRK1pON0haVWM0YWNXRE8yYlgvc2JLZFg0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEYWJ5SE9TU3NpTVZ4THhKVDRiTVBhcmYyT3NXV2IrOUJPM0hWN204emlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktKUGM1bno3WDg5bHZkS2RTQm93WGtCUDdvVGtxaFNxMjMrT0orQm9lblE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFHSHFONjM4SW85YlMwYUU1T3ZPcWo3Nk1SRUVOdzM0YUVXUjlOaDBkeXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0FqcUkvaFBTMFhsbC9ZNzhQSi9wb1MzRTRCeTd1K1Q2Y002WTM4RXVuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0U5SWcxeVQzRzRQS0hiblFMSXZjVURzR3NKNVQwQ3BHWnVpRFNhaWVCWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkM1L3NpbFE2OXk0UTFBWHlWNmg3eVZLUTF6dWdUVExtRS9sYlJSM1NiNXBFWFRnYkJ1UUJEcmoyOTFWS0pPUUhWR01OdGNkYXMzenloaktFTUo3MGp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAxLCJhZHZTZWNyZXRLZXkiOiJxOVNjTVFLN003TDR5UGE2UHlCTWhtTSs3elZIUlhMcFVPaUxWTWdTdElzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrWXg4NGxNVFNpT1BUUzFndzJLN2R3IiwicGhvbmVJZCI6ImU1NWQ0NDAyLTgzY2ItNDg1YS1iMDlkLTVmYzRhMWFhYjkzZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQMWxXNE12R0RJT3VObU0xZTAyaGw3SUZnb3c9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRHME1HRm5iUFl3TEV1K2Y3dFliZjlTaW85RT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05uQ3laRUJFUCszM2JVR0dCY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjkweVVSZVF6aEJhN0lEUmthVTkyZ0hiUU5OOWsyTCtpalNIMUZHWVJYbWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im5kZS9IaFc5dDcrYWZFdGtYYUdPRHpoMkVDTHhrbzhKQ3RZcCtDSElyM2hhSHZPY1JrUzB2NFJQTVNJR0hBSlBmQWV2T0NUNjVlSlYxU0txNEZ6QkN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpT3JjN2VRekdlSlBwOFVUQUJaTzBZQ3JreWs4Wmg4bGUzYS9wQVlJc2Q2bHROU2hTa3JRZmRjZFdwQTVPM3RJNHM1MHo2azdEUEp1ZldOb0s4R2xqUT09In0sIm1lIjp7ImlkIjoiMjU0MTE0MTE5MDE1OjQzQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjYyODA1MDM5MDk2MDU2OjQzQGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMTQxMTkwMTU6NDNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmRNbEVYa000UVd1eUEwWkdsUGRvQjIwRFRmWk5pL29vMGg5UlJtRVY1cCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMjkyNjg1LCJsYXN0UHJvcEhhc2giOiIyRjl5eHoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Davie",
    NUMERO_OWNER : process.env.OWNER_NUM || "254114119015",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
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
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

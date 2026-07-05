const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
});

const jokes = [
    "Why do programmers wear glasses? Because they can't C#!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "There are 10 types of people in the world: those who understand binary, and those who don't."
];

const quotes = [
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Failure is success in progress. — Albert Einstein",
    "Code is like humor. When you have to explain it, it’s bad. — Cory House"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

app.command('/mood', async ({ ack, respond }) => {
    await ack();
    await respond("How are you feeling today? Remember to take a deep breath and a quick stretch! 🧘‍♂️");
});

app.command('/tellmeajoke', async ({ ack, respond }) => {
    await ack();
    const randomJoke = getRandom(jokes);
    await respond(`😂 Here is your joke:\n> ${randomJoke}`);
});

app.command('/givemeaquote', async ({ ack, respond }) => {
    await ack();
    const randomQuote = getRandom(quotes);
    await respond(`✨ Inspirational Spark:\n> ${randomQuote}`);
});

(async () => {
    if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
        console.error("❌ Error: SLACK_BOT_TOKEN and SLACK_APP_TOKEN must be set.");
        process.exit(1);
    }

    await app.start();
    console.log('⚡️ Slack Bolt app is running in Socket Mode!');
})();
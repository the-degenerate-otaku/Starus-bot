const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
});

const JOKES = [
    "What do you call a pony with a cough? A little horse.",
    "What did one hat say to the other? You wait here. I'll go on a head.",
    "What do you call a magic dog? A labracadabrador.",
    "What did the shark say when he ate the clownfish? This tastes a little funny.",
    "What's orange and sounds like a carrot? A parrot.",
    "Why can't you hear a pterodactyl go to the bathroom? Because the “P” is silent.",
    "What do you call a woman with one leg? Eileen.",
    "What did the pirate say when he turned 80? Aye matey.",
    "Why did the frog take the bus to work today? His car got toad away.",
    "What did the buffalo say when his son left for college? Bison.",
    "What is an astronaut's favorite part on a computer? The space bar.",
    "Why did the yogurt go to the art exhibition? Because it was cultured.",
    "What do you call an apology written in dots and dashes? Re-Morse code.",
    "Did you hear about the two people who stole a calendar? They each got six months.",
    "Why did the hipster burn his mouth? He drank the coffee before it was cool.",
    "What do cows do on date night? Go to the moo-vies.",
    "What do cows say when they hear a bad joke? “I am not amoosed.”",
    "Why do French people eat snails? They don't like fast food.",
    "Why did the golfer wear two pairs of pants? Just in case he got a hole in one!",
    "Why don't the circus lions eat the clowns? Because they taste funny!"
];

const QUOTES = [
    "A rose by any other name would smell as sweet. — William Shakespeare",
    "All that glitters is not gold. — William Shakespeare",
    "All the world's a stage, and all the men and women merely players. — William Shakespeare",
    "Ask not what your country can do for you; ask what you can do for your country. — John F. Kennedy",
    "Ask, and it shall be given you; seek, and you shall find. — The Bible",
    "Eighty percent of success is showing up. — Woody Allen",
    "Elementary, my dear Watson. — Sherlock Holmes",
    "For those to whom much is given, much is required. — The Bible",
    "Frankly, my dear, I don't give a damn. — Rhett Butler",
    "Genius is one percent inspiration and ninety-nine percent perspiration. — Thomas Edison",
    "Go ahead, make my day. — Harry Callahan",
    "He travels the fastest who travels alone. — Rudyard Kipling",
    "Hell has no fury like a woman scorned. — William Congreve",
    "Hell is other people. — Jean-Paul Sartre",
    "Here's looking at you, kid. — Rick Blaine",
    "Houston, we have a problem. — Jim Lovell",
    "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. — Martin Lutheran King Jr.",
    "I have always depended on the kindness of strangers. — Blanche Dubois",
    "I love the smell of napalm in the morning. — Lt. Kilgore"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

app.command("/mood", async ({ ack, body, respond }) => {
    await ack();
    const userText = (body.text || "").toLowerCase();

    let replyText = "How is your mood today? Type `/mood happy`, `/mood sad`, or `/mood ok` to let me know!";

    if (userText.includes("happy") || userText.includes("good")) {
        replyText = "Awesome! I'm so glad to hear you're having a great day! Keep that momentum going! ☀️";
    } else if (userText.includes("sad") || userText.includes("bad") || userText.includes("rough")) {
        replyText = "I'm sorry to hear that. Take a deep breath, step away from the screen for a minute, and remember it's okay to have off days. 🌧️ (Try typing `/tellmeajoke` if you want a quick laugh!)";
    } else if (userText.includes("ok") || userText.includes("meh")) {
        replyText = "Fair enough. Sometimes a steady, quiet day is exactly what we need. Hang in there! 😐";
    }

    await respond({
        text: replyText,
        response_type: 'in_channel'
    });
});

app.command("/tellmeajoke", async ({ ack, respond }) => {
    await ack();
    const randomJoke = getRandom(JOKES);
    await respond({
        text: `🃏 *Here is a joke to brighten your day:*\n\n${randomJoke}`,
        response_type: 'in_channel'
    });
});

app.command("/givemeaquote", async ({ ack, respond }) => {
    await ack();
    const randomQuote = getRandom(QUOTES);
    await respond({
        text: `✨ *Here is your motivational reminder:*\n\n> "${randomQuote}"`,
        response_type: 'in_channel'
    });
});

(async () => {
    if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
        console.error("❌ Error: SLACK_BOT_TOKEN and SLACK_APP_TOKEN must be set.");
        process.exit(1);
    }

    await app.start();
    console.log('⚡️ Bolt app is running in Socket Mode!');

    try {
        await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: 'general',
            text: "🚀 *Stardance Competition Bot is now Online!* 🚀\n\nTry out my interactive features right here in this workspace:\n• Type `/mood` to check in on your mental energy\n• Type `/tellmeajoke` for a quick coding laugh\n• Type `/givemeaquote` for some engineering inspiration!"
        });
        console.log('📢 Stardance launch broadcast sent successfully!');
    } catch (error) {
        console.error('❌ Failed to send Stardance launch broadcast:', error);
    }
})();
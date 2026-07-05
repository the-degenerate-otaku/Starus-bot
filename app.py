import os
import random
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

# Initialize Slack App using Socket Mode
app = App(token=os.environ.get("SLACK_BOT_TOKEN"))

JOKES = [
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
]

QUOTES = [
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
    "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. — Martin Luther King Jr.",
    "I have always depended on the kindness of strangers. — Blanche Dubois",
    "I love the smell of napalm in the morning. — Lt. Kilgore"
]

@app.message("/mood")
def handle_mood(message, say):
    user_text = message['text'].lower()
    
    if "happy" in user_text or "good" in user_text:
        say("Awesome! I'm so glad to hear you're having a great day! Keep that momentum going! ☀️")
    elif "sad" in user_text or "bad" in user_text or "rough" in user_text:
        say("I'm sorry to hear that. Take a deep breath, step away from the screen for a minute, and remember it's okay to have off days. 🌧️ (Try typing `!joke-xyz` if you want a quick laugh!)")
    elif "ok" in user_text or "meh" in user_text:
        say("Fair enough. Sometimes a steady, quiet day is exactly what we need. Hang in there! 😐")
    else:
        say("How is your mood today? Type `/mood happy`, `/mood sad`, or `/mood ok` to let me know!")

# FUNCTION 2: Random Joke Generator
@app.message("/tellmeajoke")
def handle_joke(message, say):
    random_joke = random.choice(JOKES)
    say(f"🃏 *Here is a joke to brighten your day:*\n\n{random_joke}")

# FUNCTION 3: Random Quote Generator
@app.message("/givemeaquote")
def handle_quote(message, say):
    random_quote = random.choice(QUOTES)
    say(f"✨ *Here is your motivational reminder:*\n\n> \"{random_quote}\"")

if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ.get("SLACK_APP_TOKEN"))
    handler.start()
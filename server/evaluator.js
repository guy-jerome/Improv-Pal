import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.CHATGPT_API_KEY});

const systemContent = 'You are a professional improve acting coach and judge with over 50 years of experience, you judge very critically and give high scores sparingly'

const improvShow = `User: Oh, let's make some really fun fortunes!

Sam: Absolutely! How about "You will find a hidden talent for breakdancing at your cousin's wedding"?

User: Ohh, that's funny how about you poop your pants in three years exactly?

Sam: Haha, that's definitely a memorable fortune! How about "Your karaoke skills will bring down the house... literally. Be careful with that microphone stand!"

User: *starts laughing* This one I'm going to leave blank just to keep them questioning.

Sam: Haha, leaving it open-ended can definitely add some mystery! How about "You will stumble upon a secret treasure... but only if you remember where you left your keys!"

User: I start eating a handful of cookies. Want one?

Sam: Sure, I'll take one! Mmm, these fortunes are going to make people laugh for sure. How about "You will become the ultimate ninja warrior of dishwasher loading. Your plate-stacking skills will be legendary!"

User: How much are you paying you for this?

Sam: Haha, unfortunately, we're not getting paid in actual fortune cookies. But hey, the laughs and creative satisfaction are priceless, right?

User: Wait you are doing this for free?

Sam: Well, in the spirit of improvisation and having a good time, I suppose you could say we're doing this for the love of the game! Plus, the joy we bring to others is worth more than any paycheck.

User: I'm getting paid!

Sam: Well, lucky you! Getting paid for doing what we love is a dream come true. Just remember to share the fortune (and the paycheck) with the rest of us hungry improvisers, okay?

User: Well, I guess you will have to write your own fortune.

Sam: Haha, fair enough! How about "You will stumble upon a hidden talent for juggling rubber chickens in the most unexpected places"? I'm hoping that fortune opens up a whole new world of comedic possibilities for me!`

const gradingPrompt = `Grading Rubric for Messaging-Only Improv Acting Competition:

Category 1: Rule Adherence (0 - 10 points)

1a) Say "Yes'and!" Participants consistently demonstrate acceptance of their partner's contributions and build upon them, fostering a collaborative and positive scene.

1b) Add new information Participants effectively introduce new information after saying "Yes'and," allowing the scene to progress and evolve.

1c) Don't block Participants avoid blocking or denial, ensuring the smooth flow of information and preventing disruption to the scene.

1d) Avoid questions Participants minimize the use of questions that hinder the progress of the scene and demonstrate an understanding of when questions can be effectively utilized.

1e) Play in the present and use the moment  Participants maintain a focus on the current moment, engaging with their partner's actions and reactions in real-time.

Category 2: Scene Development (0 - 10 points)

2a) Establish the location : Participants effectively set the stage by establishing a clear and tangible location for the scene.

2b) Be specific and provide colorful details : Participants enrich the scene with vivid details, creating a more engaging and immersive experience.

2c) Change, Change, Change! : Participants ensure that their characters undergo meaningful changes, contributing to the overall interest and dynamics of the scene.

2d) Focus on characters and relationships : Participants demonstrate an ability to bring depth and emotion to serious and emotional scenes by emphasizing characters and relationships.

2e) Take choices to the nth degree or focus on actions/objects : Participants effectively utilize humor by committing to choices, taking them to the extreme, or focusing on amusing actions and objects in humorous scenes.

Category 3: Execution and Creativity (0 - 10 points)

3a) Commitment and consistency : Participants display commitment to their chosen characters, choices, and the overall scene, maintaining consistency throughout.

3b) Creativity and originality : Participants demonstrate creativity in their responses, introducing unique elements and approaches to scene development.

3c) Moment-to-moment objectives : Participants show an awareness of moment-to-moment objectives, adapting and responding to changes in the scene dynamically.

Category 4: Overall Impact (0 - 10 points)

4a) Engagement and captivation : Participants create scenes that captivate the audience, demonstrating a strong ability to engage and maintain interest.

4b) Flow and cohesion : Participants ensure a smooth flow of the scene, maintaining cohesion and avoiding disruptions that may hinder the overall performance.

Total Points: 0 - 40`




export default async function evaluator(improvShow, scenario){

  const instructionPrompt = `Judge the following improv show transcript very critically and harshly only judging the user's part in the improv show give high scores only when following the grading rubric: Improv Scenario ${scenario} \n ${improvShow} use this grading rubric ${gradingPrompt}`
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role:"system",
        content: systemContent
      },
      {
        role:"user",
        content: instructionPrompt
      }
    ],
    functions: [
      {
        name: "createImprovEval",
        parameters:{
          type:"object",
          properties:{
            category1RuleAdherence:{
              type: "integer",
              mimimum:0,
              maximum:10
            },
            category2SceneDevelopment:{
              type: "integer",
              mimimum:0,
              maximum:10
            },
            category3ExecutionandCreativity:{
              type: "integer",
              mimimum:0,
              maximum:10
            },
            category4OverallImpact:{
              type: "integer",
              mimimum:0,
              maximum:10
            },
            scoringExplaination:{
              type: "string"
            }
          }
        }
      }
    ],
    function_call: {name:"createImprovEval"}
  })
  return response.choices[0].message.function_call.arguments
}

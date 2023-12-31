//This is just a simple random improv scene generator

const improvScenes = [
    "You suspect that your new boss is secretly a vampire",
    "Chaperoning a school trip to an amusement park",
    "Holiday mascots on criminal trial",
    "A writing team trying to think up new fortunes for fortune cookies",
    "A family booking a vacation to space",
    "Staff meeting at a zoo for mythical creatures",
    "The first meeting of an unlikely fan club",
    "An award ceremony with bizarre awards",
    "Grand opening of a restaurant gone wrong",
    "Halloween store employees packing up bizarre and unsold costumes",
    "Surprise birthday party where the guest of honor is late",
    "Birthday party for a 300 year old",
    "An open house at a clearly haunted house",
    "College orientation for unlikely majors",
    "Fairytale characters at a speed dating event",
    "Guide leading a tour through the weirdest museum ever",
    "Career day full of made-up jobs",
    "Interviews for a poison-food taste tester",
    "A group of time travelers from the past in a grocery store",
    "Paparazzi hired to take wedding photos giving instructions to the bridal party",
    "Wedding where all audience members object for ridiculous reasons",
    "If Willy Wonka ran a factory full of healthy foods",
    "An exercise class for action movie stars",
    "If history books were written like tabloid magazines",
    "Celebrity secret Santa",
    "A time traveler from the past is a contestant on 'The Price is Right'",
    "A family reunites after a long time apart",
    "Saying goodbye to a loved one at the airport",
    "A group of older folks share the lessons they wished they had learned sooner",
    "A group support group shares their biggest life regrets",
    "An employee made a major mistake and must tell their boss and team",
    "A group of executives negotiates a business deal",
    "A customer service team tries to solve a problem for a disgruntled customer",
    "A sales team tries to win back an unhappy client",
    "A team of detectives tries to solve a murder",
    "A group of patients waits in an ER waiting room",
    "A team of negotiators strategizes how to solve a hostage situation",
    "A jury debates whether or not a defendant is guilty",
    "A group of strangers stranded at the airport talk about their destinations",
    "A group participates in a mediation",
    "A group strategizes how to survive a natural disaster",
    "A group stranded on a deserted island sets up camp",
    "A team confronts a team member who was caught lying or stealing",
    "A boss responds to employees who are upset and panicking over rumors",
    "A group says goodbye to and thanks a retiring employee",
    "Group has to deliver difficult news",
    "Group diffusing a bomb",
    "A person auditions actors to pretend to be their family members",
    "Famous movie couples go to couples counseling",
    "A group of literary characters wonder into a bookstore and discover their own stories",
    "A group of contractors arrive to renovate a gingerbread house",
    "A family moves into a furniture store display",
    "Filming how-to videos for simple tasks",
    "An evil villain transforms world leaders into toddlers",
    "A team suddenly speaks different languages",
    "Superheroes adjust to retirement",
    "A broken teleporter transports a group to random locations",
    "Tryouts for new cereal mascots",
    "A realtor tries to sell famous fairytale character homes",
    "A genie grants wishes to pets",
    "Snow White gets an office job",
    "White House staff briefs a new president on the country’s biggest secrets",
    "Cave parents confront their children about drawing on the walls",
    "Astronauts explore a new planet",
    "If pessimists wrote horoscopes",
    "Tech support team troubleshoots issues with a time machine hotline",
    "Reality show contestants compete to organize the world's messiest sock drawer",
    "Group of superheroes attends a mandatory team-building retreat",
    "Baristas at a coffee shop create latte art inspired by famous art masterpieces",
    "Secret agents discover an alien invasion while grocery shopping",
    "Support group for retired superheroes deals with the challenges of civilian life",
    "Team of archaeologists discovers a time capsule from the future",
    "Fashion designers create avant-garde outfits for farm animals",
    "Bakers try to recreate a famous painting using only baked goods",
    "In a parallel universe, comedians are the serious philosophers of society",
    "Tour guides lead a group through a haunted amusement park for ghosts",
    "Job interviews for positions as professional wizards",
    "Team of detectives investigates a crime involving stolen fairy tale endings",
    "Superheroes attend a speed-dating event to find the perfect crime-fighting partner",
    "Support group for villains trying to reform their evil ways",
    "Lifeguards at a pool for mythical creatures discuss water safety",
    "Teachers at a wizarding school deal with misbehaving magical creatures in class",
    "Crew of a spaceship competes in a talent show to boost morale",
    "Group of spies tries to blend in at an alien beauty pageant",
    "Team of explorers discovers a lost city inhabited by talking animals",
    "Game show contestants compete to create the best invention using random household items",
    "Tour guides lead a tour through a museum of fictional history",
    "Team of chefs attempts to cook a meal using only ingredients from outer space",
    "Family reunion where everyone has a unique and unusual talent",
    "Team of detectives solves a mystery involving missing socks in a laundromat",
    "Support group for superheroes with bizarre and inconvenient powers",
    "News anchors report on a zombie apocalypse while remaining perfectly composed",
    "Superheroes attend a mandatory anger management class",
    "Group of actors rehearse a play where the characters speak entirely in puns",
    "Team of astronauts tries to organize a talent show on the International Space Station"
  ];

const improvScenesPaired = [
  {
    scene: "You suspect that your new boss is secretly a vampire",
    roles: [
      { role: "Employee", description: "concerned about the boss being a vampire" },
      { role: "Boss", description: "trying to maintain a professional image" }
    ]
  },
  {
    scene: "Chaperoning a school trip to an amusement park",
    roles: [
      { role: "Teacher", description: "responsible for the students" },
      { role: "Parent Volunteer", description: "helping with supervision" }
    ]
  },
  {
    scene: "Holiday mascots on criminal trial",
    roles: [
      { role: "Santa Claus", description: "defendant" },
      { role: "Easter Bunny", description: "witness or co-defendant" }
    ]
  },
  {
    scene: "A writing team trying to think up new fortunes for fortune cookies",
    roles: [
      { role: "Writer 1", description: "creative and quirky" },
      { role: "Writer 2", description: "analytical and logical" }
    ]
  },
  {
    scene: "A family booking a vacation to space",
    roles: [
      { role: "Parent", description: "excited about the space vacation" },
      { role: "Teenager", description: "skeptical and uninterested" }
    ]
  },
  {
    scene: "Staff meeting at a zoo for mythical creatures",
    roles: [
      { role: "Griffin Keeper", description: "presenting concerns about griffin care" },
      { role: "Dragon Trainer", description: "proposing new training methods" }
    ]
  },
  {
    scene: "The first meeting of an unlikely fan club",
    roles: [
      { role: "President of the Fan Club", description: "enthusiastic" },
      { role: "Sceptical Member", description: "doubtful about the fan club's purpose" }
    ]
  },
  {
    scene: "An award ceremony with bizarre awards",
    roles: [
      { role: "Emcee", description: "announcing the awards" },
      { role: "Winner of the 'Most Unusual Talent' Award", description: "" }
    ]
  },
  {
    scene: "Grand opening of a restaurant gone wrong",
    roles: [
      { role: "Chef", description: "frustrated with kitchen mishaps" },
      { role: "Waiter/Waitress", description: "dealing with confused customers" }
    ]
  },
  {
    scene: "Halloween store employees packing up bizarre and unsold costumes",
    roles: [
      { role: "Store Manager", description: "making decisions on what to keep" },
      { role: "Employee", description: "finding humor in the unsold costumes" }
    ]
  }
]


const locations = [
    "Space station",
    "Meeting room",
    "Hotel",
    "Hospital",
    "Art gallery",
    "Amusement park",
    "Mall",
    "Aquarium",
    "Zoo",
    "Haunted house",
    "Mansion",
    "Field trip",
    "Sports stadium",
    "Family reunion",
    "Job interview",
    "Reality show",
    "Orientation",
    "Party",
    "Cruise",
    "Fashion show",
    "Restaurant",
    "Park",
    "Beach",
    "Bus",
    "Airplane",
    "Airport",
    "The DMV",
    "High school",
    "Nightclub",
    "Open house",
    "Library",
    "Audition",
    "Movie theatre",
    "Escape room",
    "Museum",
    "Racetrack",
    "Dressing room",
    "Wedding",
    "Grocery store",
    "Doctor's office",
    "Lawyer's office",
    "Elevator",
    "Graduation",
    "Submarine",
    "Factory",
    "Police station",
    "Ice cream shop",
    "Parking lot",
    "Middle of the ocean",
    "Desert",
    "Highway",
    "Farm",
    "Subway",
    "A foreign country",
    "A fictional universe",
    "Battlefield",
    "Coffee shop",
    "Fast-food restaurant",
    "Drive-thru window",
    "Middle school dance",
    "The Olympics",
    "Laboratory",
    "Bathroom",
    "Garden",
    "Balcony",
    "Cab",
    "Space colony on Mars",
    "Underwater disco club",
    "Wizard's potion lab",
    "Time-traveling library",
    "Robot repair shop",
    "Jungle treehouse",
    "Parallel universe karaoke bar",
    "Alien adoption center",
    "Chocolate factory on a cloud",
    "Superhero retirement home",
    "Pirate ship in a cosmic sea",
    "Dinosaur rodeo",
    "Candyland during a sugar shortage",
    "Giant bubblegum bubble",
    "Viking feast hall in Valhalla",
    "Fairy tale therapy office",
    "Spy agency headquarters for pets",
    "Gourmet restaurant in zero gravity",
    "Hobbit pub in a fantasy realm",
    "Steampunk carnival",
    "Witch's cauldron cooking show",
    "Haunted library of forgotten puns",
    "Interstellar game show arena",
    "Invisible ninja dojo",
    "Safari on a floating island",
    "Haunted rollercoaster track",
    "Space cowboy saloon",
    "Lunar base with a malfunctioning gravity generator",
    "Ice cream dimension",
    "Dreamscape where dreams come to life"
  ];

const characters = [
    "A detective with amnesia",
    "A parent who has misplaced their baby",
    "Lottery winner",
    "Game show host switching careers",
    "An alien trying to blend in with humans",
    "A dog that can suddenly speak English",
    "A clown who gets mad when people laugh at him",
    "Window cleaner who is afraid of heights",
    "Character from a musical who does not understand why no one breaks out into random song and dance with them",
    "Survivor of a horror movie",
    "Translator",
    "Historian who makes up fake stories",
    "Statistician who cannot stop quoting statistics",
    "Person who mistakenly thinks they are on a hidden camera prank show",
    "Dancer who denies that they are currently dancing",
    "Clumsy bartender",
    "Person who misquotes famous sayings",
    "Old-timey detective",
    "Rom com protagonist who falls in love with everyone she talks to",
    "Person who only gives one-word answers",
    "Fortune teller making predictions",
    "A preschool teacher",
    "Aging rockstar",
    "Narrator who does not know other characters can hear them",
    "Superhero with a strange superpower",
    "Person possessed by a series of different ghosts",
    "Child genius",
    "A preteen that makes innuendos out of everything",
    "Person who brags about being able to do completely normal things",
    "Video game character in the real world",
    "The worst advice columnist in the world",
    "Mad scientist",
    "Salesman who cannot stop selling things",
    "Person who is allergic to strange things",
    "An interior designer for supervillain lairs",
    "Sleepwalker",
    "Mermaid in disguise",
    "A time-traveling librarian",
    "A chef who only cooks with bizarre ingredients",
    "A stand-up comedian with a fear of laughter",
    "A robot learning to express emotions",
    "A cat with aspirations of world domination",
    "A conspiracy theorist convinced that everything is a plot against them",
    "A mime who refuses to be silent",
    "A motivational speaker with no motivation",
    "A vampire who's allergic to blood",
    "A superhero with the power of extreme laziness",
    "A pirate with a fear of the sea",
    "A ghost who's afraid of the dark",
    "A spy who can't keep a secret",
    "A time-traveling tour guide stuck in the wrong era",
    "An astronaut who's afraid of heights",
    "A superhero with the ability to talk to plants, but they're all introverts",
    "A stand-up philosopher delivering punchlines of wisdom",
    "A wizard with a broken wand",
    "A ninja who can't keep a secret identity",
    "A mermaid with a fear of water",
    "A scientist allergic to technology",
    "A cowboy afraid of horses",
    "A superhero with the power of extreme politeness",
    "A fortune teller with amnesia",
    "A detective who can only solve crimes in their dreams",
    "A rockstar with stage fright",
    "A mime who communicates exclusively through interpretive dance",
    "A superhero with the power of extreme organization",
    "A time-traveling stand-up comedian",
    "A mad scientist who only invents useless gadgets",
    "A robot with imposter syndrome",
    "A superhero allergic to capes",
    "A superhero who communicates through interpretive dance",
    "A pirate who refuses to say 'arr'",
    "An alien with a fear of outer space",
    "A conspiracy theorist who believes in positive conspiracies",
    "A motivational speaker with a fear of success",
    "A vampire who's a vegetarian",
    "A superhero with the power of extreme clumsiness",
    "A wizard who can only cast spells while breakdancing",
    "A ninja with a fear of the dark",
    "A mermaid with legs but no swimming skills",
    "A scientist with a phobia of lab coats",
    "A cowboy with a fear of wide-open spaces",
    "A superhero with the power of extreme forgetfulness",
    "A detective who only solves crimes by accident",
    "A mime with a fear of invisible walls",
    "A rockstar who only plays air guitar"
  ];

export function getRandomFromArray(array){
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

export function getRandomScenePaired(){
  return getRandomFromArray(improvScenesPaired)
}

export function getRandomScene(){
    return getRandomFromArray(improvScenes)
}

export function getRandomLocation(){
    return getRandomFromArray(locations)
}

export function getRandomCharacter(){
    return getRandomFromArray(characters)
}

//returns a random prompt every time the controller is called
module.exports.dailyPrompts = (req, res) => {
  try {
    const prompts = [
      "Who is someone you’ve always admired?",
      "What was your favorite movie as a kid?",
      "When did you first fall in love?",
      "How would you describe yourself to a stranger in one paragraph?",
      "List three books that have had an impact on you and why?",
      "What brings you joy?",
      "Describe a place where you felt happiest.",
      "What was your greatest fear, and how did you conquer it?",
      "What is something that you would like to change about yourself? How can you change it?",
      "Where’s one place that you’d like to visit, and how do you imagine your time there?",
      "If you are granted a wish, what would you wish for and why?",
      "If you are a superhero, what superpower would you like to have and how would you use it?",
      "List down a bucket list with the things that you have always wanted to do.",
      "Where do you see yourself in the next 1, 3, 5, 10 years from now?",
      "If I could talk to my teenage self, the one thing I would say is…",
      "My favorite way to spend the day is…",
      "The two moments I’ll never forget in my life are… Describe them in great detail, and what makes them so unforgettable.",
      "Make a list of 30 things that make you smile.",
      "Write whatever's on your mind.",
      "The words I’d like to live by are…",
      "I couldn’t imagine living without…",
    ];
    return res.status(200).json({
      prompt: prompts[Math.floor(Math.random() * prompts.length)],
    });
  } catch (err) {
    return res.status(500).json({
      message: `${err}`,
    });
  }
};

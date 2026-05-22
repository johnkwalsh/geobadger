export type QuizQuestion = {
  prompt: string;
  answerLabel: string;
  lat: number;
  lng: number;
  polygon?: Array<{ lat: number; lng: number }>;
};

export const questions: QuizQuestion[] = [
  {
    prompt: "Vitamin B was discovered here.",
    answerLabel: "DeLuca Biochemistry Building",
    lat: 43.07389,
    lng: -89.41056,
    polygon: [
      { lat: 43.07425, lng: -89.41115 },
      { lat: 43.07425, lng: -89.41005 },
      { lat: 43.07350, lng: -89.41005 },
      { lat: 43.07350, lng: -89.41115 },
    ],
  },
  {
    prompt: "Barry Alvarez coached his first game as Wisconsin head coach here.",
    answerLabel: "Camp Randall Stadium",
    lat: 43.07000,
    lng: -89.41278,
    polygon: [
      { lat: 43.07052, lng: -89.41412 },
      { lat: 43.07085, lng: -89.41331 },
      { lat: 43.07083, lng: -89.41216 },
      { lat: 43.07039, lng: -89.41142 },
      { lat: 43.06965, lng: -89.41104 },
      { lat: 43.06894, lng: -89.41113 },
      { lat: 43.06842, lng: -89.41173 },
      { lat: 43.06809, lng: -89.41277 },
      { lat: 43.06818, lng: -89.41371 },
      { lat: 43.06861, lng: -89.41441 },
      { lat: 43.06935, lng: -89.41473 },
      { lat: 43.07005, lng: -89.41464 },
    ],
  },
  {
    prompt: "Verner Suomi, known as the 'father of satellite meteorology,' worked here.",
    answerLabel: "Space Science and Engineering Center",
    lat: 43.07070,
    lng: -89.40690,
    polygon: [
      { lat: 43.07115, lng: -89.40755 },
      { lat: 43.07115, lng: -89.40625 },
      { lat: 43.07035, lng: -89.40625 },
      { lat: 43.07035, lng: -89.40755 },
    ],
  },
  {
    prompt: "This is where graduates sit on Abe Lincoln’s lap.",
    answerLabel: "Abraham Lincoln Statue on Bascom Hill",
    lat: 43.075313,
    lng: -89.403699,
    polygon: [
      { lat: 43.07538, lng: -89.40378 },
      { lat: 43.07538, lng: -89.40362 },
      { lat: 43.07524, lng: -89.40362 },
      { lat: 43.07524, lng: -89.40378 },
    ],
  },
  {
  prompt: "Where was “On, Wisconsin!” first publicly performed in 1909?",
  answerLabel: "Music Hall",
  lat: 43.074647743718074,
  lng: -89.4013518292858,
  polygon: [
    { lat: 43.07492, lng: -89.40178 },
    { lat: 43.07492, lng: -89.40095 },
    { lat: 43.07430, lng: -89.40095 },
    { lat: 43.07430, lng: -89.40178 },
  ],
},
  {
    prompt: "Where can you find the plaque containing UW’s famous “sifting and winnowing” statement?",
    answerLabel: "Bascom Hall",
    lat: 43.07573,
    lng: -89.40401,
    polygon: [
      { lat: 43.07602, lng: -89.40442 },
      { lat: 43.07602, lng: -89.40365 },
      { lat: 43.07544, lng: -89.40365 },
      { lat: 43.07544, lng: -89.40442 },
    ],
  },
  {
    prompt: "Where was the campus’s first female residence hall?",
    answerLabel: "Barnard Hall",
    lat: 43.07360,
    lng: -89.40230,
    polygon: [
      { lat: 43.07386, lng: -89.40260 },
      { lat: 43.07386, lng: -89.40200 },
      { lat: 43.07334, lng: -89.40200 },
      { lat: 43.07334, lng: -89.40260 },
    ],
  },
  {
    prompt: "James Thomson’s human embryonic stem-cell breakthrough came out of work at this UW research center.",
    answerLabel: "Wisconsin National Primate Research Center",
    lat: 43.06861,
    lng: -89.40694,
    polygon: [
      { lat: 43.06900, lng: -89.40745 },
      { lat: 43.06900, lng: -89.40645 },
      { lat: 43.06820, lng: -89.40645 },
      { lat: 43.06820, lng: -89.40745 },
    ],
  },
  {
    prompt: "Where did Wisconsin basketball play home games before moving to the Kohl Center?",
    answerLabel: "Wisconsin Field House",
    lat: 43.068613,
    lng: -89.412921,
    polygon: [
      { lat: 43.06919, lng: -89.41362 },
      { lat: 43.06919, lng: -89.41225 },
      { lat: 43.06803, lng: -89.41225 },
      { lat: 43.06803, lng: -89.41362 },
    ],
  },
  {
    prompt: "Where did UW’s first building house early lecture rooms and labs?",
    answerLabel: "North Hall",
    lat: 43.07522,
    lng: -89.40276,
    polygon: [
      { lat: 43.07550, lng: -89.40310 },
      { lat: 43.07550, lng: -89.40243 },
      { lat: 43.07495, lng: -89.40243 },
      { lat: 43.07495, lng: -89.40310 },
    ],
  },
  {
    prompt: "Where did UW’s journalism school move into its first permanent home in 1972?",
    answerLabel: "Vilas Communication Hall",
    lat: 43.072639,
    lng: -89.399806,
    polygon: [
      { lat: 43.07325, lng: -89.40065 },
      { lat: 43.07325, lng: -89.39925 },
      { lat: 43.07200, lng: -89.39925 },
      { lat: 43.07200, lng: -89.40065 },
    ],
  },
  {
    prompt: "Where has the University's famous ice cream been made for generations?",
    answerLabel: "Babcock Hall",
    lat: 43.07495,
    lng: -89.41374,
    polygon: [
      { lat: 43.07539, lng: -89.41433 },
      { lat: 43.07539, lng: -89.41315 },
      { lat: 43.07451, lng: -89.41315 },
      { lat: 43.07451, lng: -89.41433 },
    ],
  },
];

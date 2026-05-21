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
  lat: 43.0767,
  lng: -89.4125,
  polygon: [
    { lat: 43.07708, lng: -89.41305 },
    { lat: 43.07708, lng: -89.41195 },
    { lat: 43.07632, lng: -89.41195 },
    { lat: 43.07632, lng: -89.41305 },
  ],
},
  {
    prompt: "Barry Alvarez coached his first game as Wisconsin head coach here.",
    answerLabel: "Camp Randall Stadium",
    lat: 43.0699,
    lng: -89.4128,
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
    prompt: "The Onion was founded by UW–Madison students here.",
    answerLabel: "Memorial Union",
    lat: 43.0769,
    lng: -89.4003,
    polygon: [
      { lat: 43.07738, lng: -89.40105 },
      { lat: 43.07746, lng: -89.40047 },
      { lat: 43.07736, lng: -89.39982 },
      { lat: 43.07698, lng: -89.39957 },
      { lat: 43.07658, lng: -89.39962 },
      { lat: 43.07643, lng: -89.40006 },
      { lat: 43.07645, lng: -89.40067 },
      { lat: 43.07675, lng: -89.40102 },
    ],
  },
  {
    prompt: "Verner Suomi, known as the 'father of satellite meteorology,' worked here.",
    answerLabel: "Space Science and Engineering Center",
    lat: 43.0746,
    lng: -89.4008,
    polygon: [
      { lat: 43.07489, lng: -89.40114 },
      { lat: 43.07496, lng: -89.40077 },
      { lat: 43.07483, lng: -89.40045 },
      { lat: 43.07452, lng: -89.40032 },
      { lat: 43.07427, lng: -89.40049 },
      { lat: 43.07422, lng: -89.40088 },
      { lat: 43.07436, lng: -89.40115 },
      { lat: 43.07465, lng: -89.40122 },
    ],
  },
  {
    prompt: "This is where graduates sit on Abe Lincoln’s lap.",
    answerLabel: "Abraham Lincoln Statue on Bascom Hill",
    lat: 43.075313,
    lng: -89.403699,
  },
  {
  prompt: "Where was “On, Wisconsin!” first publicly performed in 1909?",
  answerLabel: "Music Hall",
  lat: 43.07453,
  lng: -89.40077,
  polygon: [
    { lat: 43.07479, lng: -89.40105 },
    { lat: 43.07479, lng: -89.40049 },
    { lat: 43.07427, lng: -89.40049 },
    { lat: 43.07427, lng: -89.40105 },
  ],
},
{
  prompt: "Where can you find the plaque containing UW’s famous “sifting and winnowing” statement?",
  answerLabel: "Bascom Hall",
  lat: 43.07573,
  lng: -89.40401,
  polygon: [
    { lat: 43.07602, lng: -89.40434 },
    { lat: 43.07602, lng: -89.40367 },
    { lat: 43.07543, lng: -89.40367 },
    { lat: 43.07543, lng: -89.40434 },
  ],
},
{
  prompt: "Where was the campus’s first female residence hall?",
  answerLabel: "Barnard Hall",
  lat: 43.07360,
  lng: -89.40230,
  polygon: [
    { lat: 43.07386, lng: -89.40259 },
    { lat: 43.07386, lng: -89.40201 },
    { lat: 43.07334, lng: -89.40201 },
    { lat: 43.07334, lng: -89.40259 },
  ],
},
{
  prompt: "Where did UW researchers first isolate human embryonic stem cells?",
  answerLabel: "Wisconsin Institutes for Medical Research",
  lat: 43.07845,
  lng: -89.43137,
  polygon: [
    { lat: 43.07903, lng: -89.43202 },
    { lat: 43.07903, lng: -89.43072 },
    { lat: 43.07786, lng: -89.43072 },
    { lat: 43.07786, lng: -89.43202 },
  ],
},
{
  prompt: "Where did students once line up to register for classes entirely by hand in the pre-digital era?",
  answerLabel: "Wisconsin Field House",
  lat: 43.06861,
  lng: -89.41250,
  polygon: [
    { lat: 43.06917, lng: -89.41318 },
    { lat: 43.06917, lng: -89.41182 },
    { lat: 43.06805, lng: -89.41182 },
    { lat: 43.06805, lng: -89.41318 },
  ],
},
{
  prompt: "Where did early radio broadcasts from the university originate?",
  answerLabel: "Vilas Hall",
  lat: 43.07377,
  lng: -89.40071,
  polygon: [
    { lat: 43.07429, lng: -89.40143 },
    { lat: 43.07429, lng: -89.39999 },
    { lat: 43.07325, lng: -89.39999 },
    { lat: 43.07325, lng: -89.40143 },
  ],
},
{
  prompt: "Where has UW students’ famous campus ice cream been made for generations?",
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

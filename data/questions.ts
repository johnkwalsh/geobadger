export type QuizQuestion = {
  prompt: string;
  answerLabel: string;
  lat: number;
  lng: number;
  radiusMeters?: number;
};

export const questions: QuizQuestion[] = [
 {
  prompt: "Vitamin B was discovered here.",
  answerLabel: "DeLuca Biochemistry Building",
  lat: 43.0767,
  lng: -89.4125,
},
  {
    prompt: "Barry Alvarez coached his first game as Wisconsin head coach here.",
    answerLabel: "Camp Randall Stadium",
    lat: 43.0699,
    lng: -89.4128,
    radiusMeters: 180,
  },
  {
    prompt: "The Onion was founded by UW–Madison students here.",
    answerLabel: "Memorial Union",
    lat: 43.0769,
    lng: -89.4003,
  },
  {
    prompt: "Students jump into this lake after major Badger victories.",
    answerLabel: "Lake Mendota",
    lat: 43.0997,
    lng: -89.4218,
    radiusMeters: 1200,
  },
  {
    prompt: "The famous UW tradition of rubbing Lincoln’s shoe for good luck happens here.",
    answerLabel: "Abraham Lincoln Statue at Bascom Hill",
    lat: 43.0755,
    lng: -89.4041,
  },
];

export type QuizQuestion = {
  prompt: string;
  answerLabel: string;
  lat: number;
  lng: number;
};

export const questions: QuizQuestion[] = [
  {
    prompt: "Where is Bascom Hall?",
    answerLabel: "Bascom Hall",
    lat: 43.075197,
    lng: -89.404245,
  },
  {
    prompt: "Where is Memorial Union?",
    answerLabel: "Memorial Union",
    lat: 43.076179,
    lng: -89.400882,
  },
  {
    prompt: "Where is Camp Randall Stadium?",
    answerLabel: "Camp Randall Stadium",
    lat: 43.069889,
    lng: -89.412464,
  },
  {
    prompt: "Where is the Kohl Center?",
    answerLabel: "Kohl Center",
    lat: 43.069911,
    lng: -89.396938,
  },
  {
    prompt: "Where is Babcock Hall?",
    answerLabel: "Babcock Hall",
    lat: 43.076738,
    lng: -89.423698,
  },
];

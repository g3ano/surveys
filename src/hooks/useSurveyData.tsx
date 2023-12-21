import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type SurveyData = {
  title: string;
  description: string;
  status: boolean;
  expire_date: string;
  questions: Question[];
  image_file?: File | null;
  image: string | undefined;
};

export type Question = {
  id: string;
  survey_id: string | null;
  type: string;
  question: string;
  description?: string;
  data: {
    id: string;
    text: string;
  }[];
};

type SurveyDataContextType = {
  surveyData: SurveyData;
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  question: Question;
  setQuestion: React.Dispatch<React.SetStateAction<Question>>;
  addQuestion: (question: Question) => void;
  rmQuestion: (question: Question) => void;
};

const SurveyDataContext = createContext<SurveyDataContextType>({
  surveyData: {
    title: '',
    description: '',
    status: false,
    expire_date: '',
    image_file: null,
    image: '',
    questions: [],
  },
  setSurveyData: () => {},
  questions: [],
  setQuestions: () => {},
  question: {
    id: '',
    survey_id: '',
    type: 'text',
    question: '',
    description: '',
    data: [],
  },
  setQuestion: () => {},
  addQuestion: () => {},
  rmQuestion: () => {},
});

export default function SurveyDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    title: '',
    description: '',
    status: false,
    expire_date: '',
    image_file: null,
    image: '',
    questions: [],
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>({
    id: '',
    survey_id: '',
    type: 'text',
    question: '',
    description: '',
    data: [],
  });

  const addQuestion = (q: Question) => {
    if (q.question === '') {
      return;
    }

    const qId = uuidv4();

    const toUpdate = questions.findIndex((question) => q.id === question.id);

    if (toUpdate !== -1) {
      setQuestions((prev) => {
        const temp = [...prev];
        temp.splice(toUpdate, 1, { ...q, id: qId });
        return temp;
      });
    } else {
      const isExist = questions.some((question) => {
        return q.question === question.question && q.type === question.type;
      });

      if (!isExist) {
        setQuestions((prev) => {
          return [
            ...prev,
            {
              ...question,
              id: qId,
            },
          ];
        });
      }
    }
  };

  const rmQuestion = (question: Question) => {
    const res = questions.filter((q) => {
      return q.question !== question.question;
    });

    setQuestions(res);
  };

  const values = {
    surveyData,
    setSurveyData,
    questions,
    setQuestions,
    question,
    setQuestion,
    addQuestion,
    rmQuestion,
  };

  return (
    <SurveyDataContext.Provider value={values}>
      {children}
    </SurveyDataContext.Provider>
  );
}

export const useSurvey = () => useContext(SurveyDataContext);

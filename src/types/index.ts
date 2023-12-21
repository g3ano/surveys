export type Answer = {
  id: number;
  survey_id: number;
  survey_question_id: number;
  answer: string;
  created_at: string;
  updated_at: string;
  survey: {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    status: number;
    description: string;
    created_at: string;
    updated_at: string;
    expire_date: string;
  };
};

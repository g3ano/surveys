import QuestionPublic from '@/components/form/question-public';
import Button from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import Toast from '@/components/ui/toast';
import useGet from '@/hooks/useGet';
import { Question } from '@/hooks/useSurveyData';
import axiosClient from '@/lib/axios';
import { capitalize } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type ComingQuestion = Omit<Question, 'id' & 'data'> & {
  id: number;
  data: string;
};

export default function SurveyPublic() {
  const { surveySlug } = useParams();
  const { data, isSuccess, isLoading, isError } = useGet(
    `/survey/public/${surveySlug}`
  );
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const startDate = new Date();

  let answers: {
    questionId: number;
    data: string | string[];
  }[] = [];

  const setAnswers = (answer: string | string[], qId: number) => {
    answers = answers.filter((answer) => {
      return answer.questionId !== qId;
    });
    answers.push({
      questionId: qId,
      data: answer,
    });
  };

  const handleSurveySubmit = () => {
    axiosClient
      .post(`/survey/public/${surveySlug}`, {
        startDate: startDate,
        answers: answers,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate('/surveys/public/thanks', {
            replace: true,
          });
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className='w-full min-h-screen'>
      <div className='md:w-2/3 md:mx-auto py-8 mb-30'>
        {isError && (
          <div>
            <div>An Error happened during execution. Try again later</div>
          </div>
        )}
        {errorMessage && <Toast message={errorMessage} />}
        <Loading isLoading={isLoading} />
        {isSuccess && (
          <div>
            <div className='space-y-2'>
              <h2 className='font-bold text-3xl'>
                {capitalize(data.survey.title)}
              </h2>
              <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
                ad?
              </div>
              {data.survey.description && (
                <p>{capitalize(data.survey.description)}</p>
              )}
              <p className='text-sm opacity-70'>
                Feel free to answer the questions however you like
              </p>
            </div>

            <div className='space-y-10 mt-20'>
              {data.questions.map((q: ComingQuestion) => {
                return (
                  <div
                    key={q.id}
                    className='space-y-4'
                  >
                    <div>
                      <p>{q.question}</p>
                    </div>
                    <QuestionPublic
                      question={q}
                      setAnswers={setAnswers}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className='mt-8 flex items-center justify-end'>
          <Button onClick={handleSurveySubmit}>submit</Button>
        </div>
      </div>
    </div>
  );
}

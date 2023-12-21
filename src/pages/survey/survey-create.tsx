import QuestionForm from '@/components/form/question-form';
import SurveyForm from '@/components/form/survey-form';
import { Card, CardContent } from '@/components/ui/card';
import SubHeader from '@/components/ui/sub-header';
import { useSurvey } from '@/hooks/useSurveyData';
import axiosClient from '@/lib/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type SurveyFormErrors = {
  title?: [];
  description?: [];
  expire_date?: [];
};

export default function SurveyCreate() {
  const { surveyData, setSurveyData, questions, setQuestions } = useSurvey();
  const [errors, setErrors] = useState<SurveyFormErrors>();
  const navigate = useNavigate();

  const handleSurveyCreate = () => {
    setErrors({});

    axiosClient
      .post('/survey', {
        ...surveyData,
        questions: [...questions],
      })
      .then(() => {
        setSurveyData({
          title: '',
          description: '',
          status: false,
          image: '',
          expire_date: '',
          questions: [],
        });
        setQuestions([]);

        navigate('/surveys');
      })
      .catch((err) => {
        const errors: SurveyFormErrors = err.response?.data.errors;
        if (errors?.title) {
          setErrors((prev) => {
            return { ...prev, title: errors.title };
          });
        } else if (errors?.description) {
          setErrors((prev) => {
            return { ...prev, description: errors.description };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, expire_date: errors?.expire_date };
          });
        }
      });
  };

  return (
    <>
      <SubHeader
        head='new survey'
        withButton
        onClick={handleSurveyCreate}
      >
        <p>Save survey</p>
      </SubHeader>
      <Card>
        <CardContent>
          <div className='px-3 py-4'>
            <div className='flex flex-col gap-8 mb-8'>
              <h3 className='text-lg'>Fill up the survey information</h3>
              <SurveyForm errors={errors} />
            </div>
            <div className='mt-4'>
              <QuestionForm>
                <h3 className='mt-8 text-lg'>Add questions to your survey</h3>
              </QuestionForm>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

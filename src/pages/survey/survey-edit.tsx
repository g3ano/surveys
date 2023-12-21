import { useNavigate, useParams } from 'react-router-dom';
import { useSurvey } from '@/hooks/useSurveyData';
import useGet from '@/hooks/useGet';
import { useEffect, useState } from 'react';
import SurveyForm from '@/components/form/survey-form';
import { SurveyFormErrors } from '@/pages/survey/survey-create';
import axiosClient from '@/lib/axios';
import SubHeader from '@/components/ui/sub-header';
import QuestionForm from '@/components/form/question-form';
import Loading from '@/components/ui/loading';
import { Card, CardContent } from '@/components/ui/card';

export default function SurveyEdit() {
  const { surveyId } = useParams();
  const { surveyData, setSurveyData, questions, setQuestions } = useSurvey();
  const [errors, setErrors] = useState<SurveyFormErrors>();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError } = useGet(`/survey/${surveyId}`);

  useEffect(() => {
    if (isSuccess) {
      setSurveyData(() => data.survey);
      setQuestions(() => data.questions);
    }

    return () => {
      setSurveyData({
        title: '',
        description: '',
        status: false,
        expire_date: '',
        image_file: null,
        image: '',
        questions: [],
      });
      setQuestions([]);
    };
  }, [isSuccess]);

  const handleSurveyUpdate = () => {
    setErrors({});

    axiosClient
      .put(`/survey/${surveyId}`, {
        ...surveyData,
        questions: questions,
      })
      .then(() => {
        setSurveyData({
          title: '',
          description: '',
          status: false,
          image: '',
          image_file: null,
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
            return { ...prev, title: errors?.title };
          });
        } else if (errors?.description) {
          setErrors((prev) => {
            return { ...prev, description: errors?.description };
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
        head='edit survey'
        withButton
        onClick={handleSurveyUpdate}
      >
        <p>Save survey</p>
      </SubHeader>
      <Loading isLoading={isLoading} />
      {isSuccess && (
        <Card>
          <CardContent>
            <div className='px-2 py-4'>
              <div className='flex flex-col gap-8'>
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
      )}
      {isError && <div>No survey found</div>}
    </>
  );
}

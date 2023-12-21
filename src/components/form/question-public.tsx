import Input from '@/components/form/input';
import SelectQuestion from '@/components/public-page/select-question';
import { ComingQuestion } from '@/pages/survey/survey-public';
import CheckboxQuestion from '@/components/public-page/checkbox-question';

type QuestionPublicProps = {
  setAnswers: (answer: string | string[], qId: number) => void;
  question: ComingQuestion;
};

function QuestionPublic({ setAnswers, question }: QuestionPublicProps) {
  const { id, type, data } = question;
  const options: { id: string; text: string }[] = JSON.parse(data);

  return (
    <div>
      {type === 'text' && (
        <div>
          <Input
            id={`${id}`}
            onChange={(e) => setAnswers(e.target.value, id)}
          />
        </div>
      )}
      {type === 'select' && (
        <SelectQuestion
          options={options}
          setAnswers={setAnswers}
          qId={id}
        />
      )}
      {type === 'checkbox' && (
        <CheckboxQuestion
          options={options}
          setAnswers={setAnswers}
          qId={id}
        />
      )}
    </div>
  );
}
export default QuestionPublic;

import Label from '@/components/form/label';
import { Checkbox } from '@/components/ui/checkbox';
import { capitalize } from '@/lib/utils';

export default function CheckboxQuestion({
  options,
  setAnswers,
  qId,
}: {
  options: {
    id: string;
    text: string;
  }[];
  setAnswers: (v: string | string[], qId: number) => void;
  qId: number;
}) {
  let answers: string[] = [];

  // TODO:  this function needs more testing
  const addCheckedAnswer = (text: string) => {
    const index = answers.findIndex((ans) => {
      return ans === text;
    });
    if (index !== -1) {
      answers.splice(index, 1);
    } else {
      answers = [...answers, text];
      setAnswers(answers, qId);
    }
  };

  return (
    <>
      {options.map(({ id, text }) => {
        return (
          <Label
            key={id}
            className='flex items-center gap-2'
          >
            <Checkbox
              id={id}
              onCheckedChange={() => addCheckedAnswer(text)}
            />
            <span>{capitalize(text)}</span>
          </Label>
        );
      })}
    </>
  );
}

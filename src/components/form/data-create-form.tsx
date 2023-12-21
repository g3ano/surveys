import Input from '@/components/form/input';
import Label from '@/components/form/label';
import Button from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Question, useSurvey } from '@/hooks/useSurveyData';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function DataCreateForm({
  question,
  setQuestion,
}: {
  question: Question;
  setQuestion: React.Dispatch<React.SetStateAction<Question>>;
}) {
  const [option, setOption] = useState('');
  const optionRef = useRef<any>(null);

  const addOption = (option: string) => {
    const res = question.data.find((elem) => {
      return elem.text === option;
    });

    if (option.length === 0 || res) {
      return;
    }

    const optionId = uuidv4();

    setQuestion((prev) => ({
      ...prev,
      data: [
        ...prev.data,
        {
          id: optionId,
          text: option,
        },
      ],
    }));
  };

  const rmOption = (toDelete: { id: string; text: string }) => {
    const res = question.data.filter((o) => o.id !== toDelete.id);
    setQuestion((prev) => ({
      ...prev,
      data: [...res],
    }));
  };

  return (
    <>
      <div className='space-y-2'>
        <Label htmlFor='option'>Options</Label>
        <div className='flex-1 flex items-end gap-2'>
          <p className=''>{question.data?.length + 1}.</p>
          <div className='flex-1'>
            <Input
              name='option'
              ref={optionRef}
              placeholder='Add option'
              value={option}
              onChange={(e) => {
                setOption(e.target.value);
              }}
            />
          </div>
          <Button
            type='button'
            intent='outline'
            shape='icon'
            onClick={() => {
              addOption(option);
              setOption('');
              optionRef.current?.focus();
            }}
          >
            <Icon name={PlusIcon} />
          </Button>
        </div>
      </div>

      {question.data.length !== 0 && (
        <div className='space-y-1'>
          {question.data.map(
            (elem: { id: string; text: string }, index: number) => {
              return (
                <div key={elem.id}>
                  <div className='flex-1 flex items-end gap-2'>
                    <p className=''>{index + 1}.</p>
                    <div className='flex-1 relative group'>
                      <Input
                        name='option'
                        placeholder='Add option'
                        value={elem.text}
                        onChange={(e) => {
                          setOption(e.target.value);
                        }}
                      />

                      <Button
                        type='button'
                        shape='icon'
                        intent='ghost'
                        className='absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity'
                        onClick={() => rmOption(elem)}
                      >
                        <Icon
                          name={TrashIcon}
                          intent='red'
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
}

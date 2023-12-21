import Input from '@/components/form/input';
import Label from '@/components/form/label';
import Button from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Question, useSurvey } from '@/hooks/useSurveyData';
import { capitalize } from '@/lib/utils';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRef, useState } from 'react';
import DataCreateForm from '@/components/form/data-create-form';
import NotFound from '@/components/ui/not-found';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const types = ['text', 'select', 'checkbox'];
const withOptions = ['select', 'checkbox'];

type QuestionFormProps = {
  children: React.ReactNode;
};

export default function QuestionForm({ children }: QuestionFormProps) {
  const { question, questions, setQuestion, addQuestion, rmQuestion } =
    useSurvey();
  const questionRef = useRef<HTMLInputElement>(null);
  const [questionUpdate, setQuestionUpdate] = useState<Question>({
    id: '',
    survey_id: '',
    type: 'text',
    question: '',
    description: '',
    data: [],
  });
  const [openEditModal, setOpenEditModal] = useState(false);

  const haveOption = (type: string) => {
    return withOptions.includes(type);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    update?: boolean
  ) => {
    const { name, value } = e.target;
    if (update) {
      setQuestionUpdate((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setQuestion((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <form>
        <div className='flex flex-col gap-8'>
          <div className='flex justify-between items-end'>
            {children}
            <Button
              type='button'
              shape='icon'
              intent='outline'
              autoFocus
              onClick={() => {
                addQuestion(question);
                setQuestion({
                  id: '',
                  survey_id: '',
                  type: 'text',
                  question: '',
                  description: '',
                  data: [],
                });
                if (questionRef.current) {
                  questionRef.current.focus();
                }
              }}
            >
              <Icon name={PlusIcon} />
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <div className='space-y-2 flex-1'>
              <Label
                className='flex items-center gap-2'
                htmlFor='title'
              >
                <span>{questions?.length + 1}.</span>
                <span className='line-clamp-1'>
                  {capitalize(question.question)}
                </span>
              </Label>
              <Input
                type='text'
                name='question'
                id='question'
                value={question.question}
                onChange={handleChange}
                placeholder='What is your question?'
                ref={questionRef}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='type'>{capitalize('question type')}</Label>
              <Select
                name='type'
                value={question.type}
                onValueChange={(value) =>
                  setQuestion((prev) => ({
                    ...prev,
                    type: value,
                  }))
                }
              >
                <SelectTrigger className='w-60 capitalize'>
                  <SelectValue
                    placeholder='Select a type'
                    className='placeholder:text-slate-500 placeholder:text-sm placeholder:capitalize'
                  />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => {
                    return (
                      <SelectItem
                        className='capitalize'
                        key={type}
                        value={type}
                      >
                        {type}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='space-y-2'>
            <label
              className='capitalize'
              htmlFor='description'
            >
              description
            </label>
            <Input
              name='description'
              id='description'
              value={question.description}
              onChange={handleChange}
              placeholder='Describe your question'
            />
          </div>

          {haveOption(question.type) && (
            <DataCreateForm
              question={question}
              setQuestion={setQuestion}
            />
          )}

          <div className='grid grid-cols-3 gap-2 mt-5'>
            {questions.length === 0 ? (
              <NotFound className='col-span-3'>You have no questions</NotFound>
            ) : (
              questions.map((q: Question, index: number) => {
                return (
                  <div
                    key={q.id}
                    className='bg-indigo-100/30 text-slate-800 px-5 py-4 rounded-md group relative'
                  >
                    <div className='space-y-1'>
                      <h2 className='text-xl font-medium line-clamp-1'>
                        {capitalize(q.question)}
                      </h2>
                      {q.description ? (
                        <p className='line-clamp-1'>{q.description}</p>
                      ) : (
                        <p>No description was found</p>
                      )}
                    </div>
                    <div className='absolute top-0 bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <div className='h-full flex flex-col items-center justify-around'>
                        <Dialog
                          open={openEditModal}
                          onOpenChange={(open) => {
                            setOpenEditModal(open);
                            setQuestionUpdate(questions[index]);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              type='button'
                              shape='icon'
                              intent='ghost'
                            >
                              <Icon name={PencilIcon} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='sm:max-w-3xl max-h-[30rem] overflow-auto'>
                            <div className='py-4 px-4 h-full'>
                              <div className='flex flex-col items-stretch justify-between w-full gap-12'>
                                <div className='space-y-4'>
                                  <div className='flex items-center gap-2'>
                                    <span>{index + 1}.</span>
                                    <span className='line-clamp-1'>
                                      {capitalize(questionUpdate?.question)}
                                    </span>
                                  </div>
                                  <div className='flex items-center gap-2'>
                                    <div className='space-y-2 flex-1'>
                                      <Input
                                        type='text'
                                        name='question'
                                        id='question'
                                        value={questionUpdate.question}
                                        onChange={(e) => handleChange(e, true)}
                                        placeholder='What is your question?'
                                        ref={questionRef}
                                      />
                                    </div>
                                    <div className='space-y-2'>
                                      <Select
                                        name='type'
                                        value={questionUpdate.type}
                                        onValueChange={(value) =>
                                          setQuestionUpdate((prev) => ({
                                            ...prev,
                                            type: value,
                                          }))
                                        }
                                      >
                                        <SelectTrigger className='w-40 capitalize'>
                                          <SelectValue
                                            placeholder='Select a type'
                                            className='placeholder:text-slate-500 placeholder:text-sm placeholder:capitalize'
                                          />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {types.map((type) => {
                                            return (
                                              <SelectItem
                                                className='capitalize'
                                                key={type}
                                                value={type}
                                              >
                                                {type}
                                              </SelectItem>
                                            );
                                          })}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div className='space-y-2'>
                                    <label
                                      className='capitalize'
                                      htmlFor='description'
                                    >
                                      description
                                    </label>
                                    <Input
                                      name='description'
                                      id='description'
                                      value={questionUpdate.description}
                                      onChange={(e) => handleChange(e, true)}
                                      placeholder='Describe your question'
                                    />
                                  </div>

                                  {haveOption(questionUpdate.type) && (
                                    <DataCreateForm
                                      question={questionUpdate}
                                      setQuestion={setQuestionUpdate}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className='flex justify-between w-full mt-8'>
                                <DialogClose asChild>
                                  <Button
                                    intent='ghost'
                                    autoFocus
                                  >
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button
                                  intent='danger'
                                  onClick={() => {
                                    addQuestion(questionUpdate);
                                    setOpenEditModal(false);
                                  }}
                                >
                                  Update
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          type='button'
                          shape='icon'
                          intent='ghost'
                          className=''
                          onClick={() => rmQuestion(q)}
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
              })
            )}
          </div>
        </div>
      </form>
    </>
  );
}

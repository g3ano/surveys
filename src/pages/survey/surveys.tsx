import Button from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import Loading from '@/components/ui/loading';
import NotFound from '@/components/ui/not-found';
import SubHeader from '@/components/ui/sub-header';
import useGet from '@/hooks/useGet';
import axiosClient from '@/lib/axios';
import { capitalize } from '@/lib/utils';
import {
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Survey = {
  id: number;
  title: string;
  slug: string;
  status: number;
  image: string;
  description: string;
  expire_date: string;
  number_of_questions: string;
};

export default function Surveys() {
  const { data, isSuccess, isLoading, isError, errors } = useGet('/survey');
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setSurveys(data.surveys);
    }
  }, [isSuccess]);

  const removeSurvey = (surveyId: string | number) => {
    const res = surveys.filter((elem) => {
      return elem.id !== surveyId;
    });
    return res;
  };

  const handleSurveyDelete = (surveyId: string | number) => {
    axiosClient.delete(`/survey/${surveyId}`).then(() => {
      setSurveys(() => removeSurvey(surveyId));
    });
  };

  return (
    <>
      <SubHeader
        head='surveys'
        shape='icon'
        withButton
        asChild
      >
        <Link to='/surveys/create'>
          <Icon name={PlusIcon} />
        </Link>
      </SubHeader>
      <div className='flex flex-col pb-8'>
        <div>
          {isError && <div>{errors.data.message}</div>}
          {isLoading && <Loading isLoading={isLoading} />}
        </div>
        {isSuccess && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {surveys.length === 0 ? (
              <div className='w-full col-span-3'>
                <NotFound>Woahh! Create a survey to show here.</NotFound>
              </div>
            ) : (
              surveys.map((survey) => {
                return (
                  <Card
                    className='max-w-md h-[30rem]'
                    key={survey.id}
                  >
                    <CardContent>
                      <div className='space-y-5 py-1 px-2'>
                        <div className='mt-1 flex gap-4 relative'>
                          <div className='bg-slate-100 rounded-md relative w-full h-48 overflow-hidden shadow'>
                            {survey.image ? (
                              <img
                                src={survey.image}
                                alt=''
                                className='w-full h-48 object-cover rounded-md'
                              />
                            ) : (
                              <div className='flex items-center justify-center h-full opacity-75'>
                                <p>No image is found</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <h2 className='font-semibold text-xl line-clamp-2'>
                          {capitalize(survey.title)}
                        </h2>
                        {survey.description ? (
                          <p
                            className='flex-1 line-clamp-3'
                            dangerouslySetInnerHTML={{
                              __html: capitalize(survey.description),
                            }}
                          />
                        ) : (
                          <div>No description is found</div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className='flex items-center justify-between'>
                        <Button asChild>
                          <Link to={`/surveys/${survey.id}/edit`}>Edit</Link>
                        </Button>
                        <div className='flex items-center'>
                          <Button
                            shape='icon'
                            intent='ghost'
                            disabled={survey.status === 0}
                          >
                            <Link
                              to={`/surveys/public/${survey.slug}`}
                              target='_blank'
                            >
                              <Icon name={ArrowTopRightOnSquareIcon} />
                            </Link>
                          </Button>

                          <Dialog
                            open={openDeleteModal}
                            onOpenChange={(open) => {
                              setOpenDeleteModal(open);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                shape='icon'
                                intent='ghost'
                              >
                                <Icon
                                  name={TrashIcon}
                                  className='text-red-500'
                                />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <div className='flex flex-col justify-center items-center flex-1'>
                                <div className='mb-10 text-center p-4'>
                                  <p className='text-lg mb-2'>
                                    Do you really want to delete this survey?
                                  </p>
                                  <p className='text-sm'>
                                    Click the Delete button to continue
                                  </p>
                                </div>

                                <div className='flex justify-between w-full'>
                                  <DialogClose asChild>
                                    <Button intent='ghost'>Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    intent='danger'
                                    onClick={() =>
                                      handleSurveyDelete(survey.id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}

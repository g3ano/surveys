import Button from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Loading from '@/components/ui/loading';
import SubHeader from '@/components/ui/sub-header';
import useGet from '@/hooks/useGet';
import { capitalize } from '@/lib/utils';
import { Answer } from '@/types';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data, isLoading, isSuccess, isError, errors } = useGet('/stats');

  return (
    <div>
      <SubHeader
        head='dashboard'
        shape='icon'
      />
      <Loading isLoading={isLoading} />
      {isError && <div>{errors.data.message}</div>}
      {isSuccess && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <Card>
            <CardTitle>Latest survey</CardTitle>
            <CardContent>
              {data?.latestSurvey.image && (
                <div className='mb-4'>
                  <img
                    className='rounded-md object-cover'
                    src={data?.latestSurvey.image}
                    alt={`image of ${data?.latestSurvey.title} survey`}
                  />
                </div>
              )}
              <h2 className='font-semibold text-xl line-clamp-2'>
                {capitalize(data?.latestSurvey.title)}
              </h2>
              <div className='mt-4 space-y-1'>
                {data?.latestSurvey.create_date && (
                  <div className='flex items-center justify-between'>
                    <p>Create date</p>
                    <p>{data?.latestSurvey.create_date}</p>
                  </div>
                )}
                {data?.latestSurvey.expire_date && (
                  <div className='flex items-center justify-between'>
                    <p>Expire date</p>
                    <p>{data?.latestSurvey.expire_date}</p>
                  </div>
                )}
                <div className='flex items-center justify-between'>
                  <p>Status</p>
                  {data?.latestSurvey.status === 1 ? (
                    <p>Active</p>
                  ) : (
                    <p>Not active</p>
                  )}
                </div>
                <div className='flex items-center justify-between'>
                  <p>Questions</p>
                  <p>{data?.latestSurvey.numberOfQuestions}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Participants</p>
                  <p>{data?.latestSurvey.numberOfParticipants}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Answers</p>
                  <p>{data?.latestSurvey.numberOfAnswers}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex justify-between items-center'>
                {/* TODO: implement view answers */}
                <Button
                  intent='secondary'
                  className='flex items-center gap-2 text-base text-indigo-500'
                >
                  <Icon
                    name={EyeIcon}
                    isButton
                  />
                  <p>View answers</p>
                </Button>
                <Button
                  intent='secondary'
                  className='flex items-center gap-2 text-base'
                  asChild
                >
                  <Link to={`/surveys/${data?.latestSurvey.id}/edit`}>
                    <Icon
                      name={PencilIcon}
                      isButton
                    />
                    <p>Edit</p>
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
          <div className='flex flex-col gap-5 h-full'>
            <Card className='flex-1'>
              <CardTitle>Total surveys</CardTitle>
              <CardContent>
                <p className='text-7xl text-center font-semibold pb-4 line-clamp-1'>
                  {data?.totalSurveys}
                </p>
              </CardContent>
            </Card>

            <Card className='flex-1'>
              <CardTitle>Total participants</CardTitle>
              <CardContent>
                <p className='text-7xl text-center font-semibold pb-4 line-clamp-1'>
                  {data?.totalParticipants}
                </p>
              </CardContent>
            </Card>
            <Card className='flex-1'>
              <CardTitle>Total answers</CardTitle>
              <CardContent>
                <p className='text-7xl text-center font-semibold pb-4 line-clamp-1'>
                  {data?.totalAnswers}
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardTitle>Latest answers</CardTitle>
            <CardContent>
              <div className='space-y-2'>
                {data?.latestAnswers.map((answer: Answer) => {
                  return (
                    <div key={answer.id}>
                      <Link to='/'>
                        <div className='px-3 py-2 rounded-md hover:bg-indigo-300/40'>
                          <p className='font-semibold line-clamp-1'>
                            {capitalize(answer.survey.title)}
                          </p>
                          <div className='flex gap-2'>
                            <p>Answer made at</p>
                            <p className=''>{answer.created_at}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

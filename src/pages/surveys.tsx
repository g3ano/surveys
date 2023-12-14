export default function Surveys() {
    return (
        <div>
            <div className='my-4'>
                <h2 className='font-bold text-3xl'>Surveys</h2>
            </div>
            <div className='flex gap-8'>
                <div>
                    {/* {surveys.map((survey: SurveyProps) => {
                        return (
                            <div className='h-64 w-80 bg-white flex'>
                                <div className='rounded-md shadow px-4 py-6 flex flex-col justify-between'>
                                    <div className='flex flex-col gap-4'>
                                        <h3 className='font-bold line-clamp-2'>
                                            {survey.title}
                                        </h3>
                                        <p
                                            className='line-clamp-3'
                                            dangerouslySetInnerHTML={{
                                                __html: survey.description,
                                            }}
                                        ></p>
                                    </div>
                                    <div className=''>
                                        <button className='bg-emerald-600 text-white px-2 py-1 text-sm rounded-md'>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })} */}
                </div>
            </div>
        </div>
    );
}

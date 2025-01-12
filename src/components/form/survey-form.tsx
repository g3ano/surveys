import Label from '@/components/form/label';
import Input from '@/components/form/input';
import { Checkbox } from '@/components/ui/checkbox';
import { SurveyFormErrors } from '@/pages/survey/survey-create';
import { useSurvey } from '@/hooks/useSurveyData';
import { PencilIcon } from '@heroicons/react/24/outline';
import Icon from '@/components/ui/icon';
import Button from '@/components/ui/button';
import { useState } from 'react';

type SurveyFormProps = {
  errors?: SurveyFormErrors;
};

export default function SurveyForm({ errors }: SurveyFormProps) {
  const { setSurveyData, surveyData } = useSurvey();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSurveyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();
    reader.onload = () => {
      setSurveyData((prev: any) => ({
        ...prev,
        image_file: file,
        image: reader.result,
      }));

      e.target.value = '';
    };
    reader.readAsDataURL(file);
    console.log(reader);
  };
  console.log(isLoading);

  return (
    <form>
      <div className='flex flex-col gap-8'>
        <div>
          <Label htmlFor='image'>Photo</Label>
          <div className='mt-1 flex gap-4 relative'>
            <div className='bg-slate-100 rounded-md relative w-48 h-48 overflow-hidden shadow'>
              {surveyData.image && (
                <img
                  src={surveyData.image}
                  alt=''
                  className='w-48 h-48 object-cover rounded-md'
                />
              )}
              <Button
                type='button'
                intent='ghost'
                asChild
                className='group'
              >
                <div className='absolute inset-0 bottom-0 z-50 h-full'>
                  <input
                    type='file'
                    id='image'
                    className='absolute left-0 top-0 right-0 bottom-0 opacity-0'
                    onChange={handleImage}
                  />
                  <Icon
                    name={PencilIcon}
                    className='hidden group-hover:block'
                  />
                </div>
              </Button>
            </div>
            <p className='ms-2 text-sm'>*Pick an image for your survey</p>
          </div>
        </div>
        <div className='flex items-start justify-between gap-5'>
          <div className='space-y-2 flex-1'>
            <Label htmlFor='title'>Title</Label>
            <Input
              type='text'
              name='title'
              id='title'
              value={surveyData?.title}
              onChange={handleChange}
              placeholder='Survey title'
              autoFocus
              isError={Boolean(errors?.title)}
              errors={errors?.title}
            />
          </div>
          <div className='space-y-2 w-60'>
            <Label htmlFor='expire_date'>Expire date</Label>
            <Input
              type='date'
              name='expire_date'
              id='expire_date'
              value={surveyData.expire_date || ''}
              onChange={handleChange}
              isError={Boolean(errors?.expire_date)}
              errors={errors?.expire_date}
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Input
            name='description'
            id='description'
            value={surveyData.description || ''}
            onChange={handleChange}
            placeholder='Describe your survey'
            isError={Boolean(errors?.description)}
            errors={errors?.description}
          />
        </div>
        <div className='flex items-start gap-2'>
          <div className='flex items-start mt-0.5'>
            <Checkbox
              id='status'
              name='status'
              checked={surveyData.status || false}
              onCheckedChange={(checked) => {
                setSurveyData((prev: any) => ({
                  ...prev,
                  status: checked,
                }));
              }}
            />
          </div>
          <div className='flex flex-col items-start'>
            <Label htmlFor='status'>active</Label>
            <p className='text-gray-500 text-sm'>
              Whether to make survey publicly available
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

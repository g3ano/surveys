import Input from '@/components/form/input';
import Button from '@/components/ui/button';
import { errorType, formDataType } from '@/pages/register';

interface RegisterFormProps {
  formData: formDataType;
  setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  errors: errorType;
  usernameRef: React.MutableRefObject<any>;
}

export default function RegisterForm({
  formData,
  setFormData,
  handleSubmit,
  isLoading,
  errors,
  usernameRef,
}: RegisterFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='bg-inherit'>
      <form>
        <div className='w-96 rounded-md space-y-2'>
          <Input
            type='text'
            id='username'
            name='username'
            required
            value={formData.username}
            onChange={handleChange}
            placeholder='username'
            ref={usernameRef}
            isError={Boolean(errors.username)}
            errors={errors.username}
          />
          <Input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='email'
            isError={Boolean(errors.email)}
            errors={errors.email}
          />
          <Input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='password'
            isError={Boolean(errors.password)}
            errors={errors.password}
          />
          <Input
            type='password'
            id='password_confirmation'
            name='password_confirmation'
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder='password confirmation'
          />
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <Button
              className='w-full'
              onClick={handleSubmit}
            >
              {!isLoading && <span>Register</span>}
              {isLoading && <span>sending...</span>}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

import Input from '@/components/form/input';

export default function InputQuestion({
  setValues,
  qId,
}: {
  setValues: (value: string, qId: number) => void;
  qId: number;
}) {
  return (
    <Input
      type='text'
      id={`${qId}`}
      onChange={(e) => setValues(e.target.value, qId)}
    />
  );
}

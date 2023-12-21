import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { capitalize } from '@/lib/utils';
import { useState } from 'react';

export default function SelectQuestion({
  options,
  setAnswers,
  qId,
}: {
  options: {
    id: string;
    text: string;
  }[];
  setAnswers: (value: string, qId: number) => void;
  qId: number;
}) {
  const [selectValue, setSelectValue] = useState(options[0].text);

  return (
    <Select
      value={selectValue}
      onValueChange={(v) => {
        setAnswers(v, qId);
        setSelectValue(() => v);
      }}
    >
      <SelectTrigger id={`${qId}`}>
        <SelectValue defaultValue={selectValue} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ id, text }: { id: string; text: string }) => {
          return (
            <SelectItem
              key={id}
              value={text}
            >
              {capitalize(text)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

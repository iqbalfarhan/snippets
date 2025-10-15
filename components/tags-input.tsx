import { FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

type Props = {
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

const TagsInput: FC<Props> = ({ value = [], onValueChange }) => {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const newTag = tag.trim();
    if (newTag && !value.includes(newTag)) {
      onValueChange?.([...value, newTag]);
    }
  };

  const removeTag = (tag: string) => {
    onValueChange?.(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
      setInput('');
    }
    if (e.key === 'Backspace' && input === '' && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const handleRemoveClick = (e: MouseEvent, tag: string) => {
    e.stopPropagation(); // biar ga trigger event lain
    removeTag(tag);
  };

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((tag) => (
            <Badge key={tag} variant="default" className="flex items-center gap-1 pr-1">
              <span>{tag}</span>
              <button type="button" onClick={(e) => handleRemoveClick(e, tag)}>
                ✕
              </button>
            </Badge>
          ))}
        </div>
      )}
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tambah tag..."
        className="min-w-[100px] flex-1 outline-none"
      />
    </div>
  );
};

export default TagsInput;

import type { ComponentProps, FC } from 'react';
import { useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

type Props = ComponentProps<typeof Input> & {
  onValueChange?: (value: File) => void;
  showPreview?: boolean;
};

const FileInput: FC<Props> = ({ onValueChange, showPreview, ...props }) => {
  const [preview, setPreview] = useState<File>();

  return (
    <>
      <Input
        type="file"
        onChange={(e) => {
          setPreview(e.target.files?.[0]);
          onValueChange?.(e.target.files?.[0] ?? new File([], ''));
        }}
        {...props}
      />
      {showPreview && preview && (
        <div>
          <Avatar className="size-24 rounded-lg">
            <AvatarImage src={URL.createObjectURL(preview ?? new Blob())} />
          </Avatar>
        </div>
      )}
    </>
  );
};

export default FileInput;

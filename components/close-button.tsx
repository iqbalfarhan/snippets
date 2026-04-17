import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { DialogClose } from '../ui/dialog';

const CloseButton = () => {
  return (
    <DialogClose asChild>
      <Button variant={'secondary'}>
        <X />
        Close
      </Button>
    </DialogClose>
  );
};

export default CloseButton;

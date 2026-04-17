import { router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

const BackButton = ({ href }: { href?: string }) => {
  return (
    <Button
      variant={'secondary'}
      onClick={() => (href ? router.visit(href) : window.history.back())}
    >
      <ArrowLeft />
      Kembali
    </Button>
  );
};

export default BackButton;

import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {};

const SnippetFilterSheet: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, get } = useForm({
    name: '',
  });

  const applyFilter = () => {
    get(route('snippet.index'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Filter applied successfully');
        setOpen(false);
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  const resetFilter = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter snippet</SheetTitle>
          <SheetDescription>Filter data snippet</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            method="get"
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilter();
            }}
          >
            <FormControl label="Nama Snippet">
              <Input type="text" placeholder="Name snippet" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={applyFilter}>
            <Check /> Apply filter
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'} onClick={resetFilter}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SnippetFilterSheet;

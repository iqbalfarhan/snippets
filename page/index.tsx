import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Snippet } from '@/types';
import { Edit, Filter, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import SnippetDeleteDialog from './delete-dialog';
import SnippetFilterSheet from './filter-sheet';
import SnippetFormSheet from './form-sheet';

type Props = {
  snippets: Snippet[];
};

const SnippetList: FC<Props> = ({ snippets }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  return (
    <AppLayout
      title="Snippets"
      description="Manage your snippets"
      actions={
        <SnippetFormSheet purpose="create">
          <Button>
            <Plus />
            Create new snippet
          </Button>
        </SnippetFormSheet>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search snippets..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <SnippetFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </SnippetFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <Button>
              <Edit /> Edit selected
            </Button>
            <Button variant={'destructive'}>
              <Trash2 /> Delete selected
            </Button>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === snippets.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(snippets.map((snippet) => snippet.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {snippets
            .filter((snippet) => JSON.stringify(snippet).toLowerCase().includes(cari.toLowerCase()))
            .map((snippet) => (
              <TableRow key={snippet.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(snippet.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, snippet.id]);
                          } else {
                            setIds(ids.filter((id) => id !== snippet.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{snippet.name}</TableCell>
                <TableCell>
                  <SnippetFormSheet purpose="edit" snippet={snippet}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </SnippetFormSheet>
                  <SnippetDeleteDialog snippet={snippet}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </SnippetDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default SnippetList;

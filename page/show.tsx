import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Snippet } from '@/types';
import { FC } from 'react';

type Props = {
  snippet: Snippet;
};

const showSnippet: FC<Props> = ({ snippet }) => {
  return (
    <AppLayout title="Detail Snippet" description="Detail snippet">
      <Card>
        <CardHeader>
          <CardTitle>{snippet.name}</CardTitle>
          <CardTitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardTitle>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default showSnippet;

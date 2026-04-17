import type { FC } from 'react';

type Props = {
  data: unknown;
};

const Dump: FC<Props> = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Dump;

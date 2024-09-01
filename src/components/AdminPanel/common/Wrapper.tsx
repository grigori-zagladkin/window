import { FC, PropsWithChildren } from 'react';

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

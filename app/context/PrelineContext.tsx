'use client';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const PrelineContext = ({ children }: Props) => {
  useEffect(() => {
    // @ts-ignore
    import('preline');
  }, []);
  return <>{children}</>;
};

export default PrelineContext;

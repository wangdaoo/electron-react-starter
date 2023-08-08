import { CSSProperties } from 'react';
import useBack from '@hooks/useBack';

const style: CSSProperties = {
  position: 'fixed',
  right: '10px',
  bottom: '10px',
  height: '70px',
  width: '70px',
  padding: '0',
};

export default function BackButton() {
  const back = useBack();

  return (
    <button type="button" onClick={back} style={style}>
      Back
    </button>
  );
}

import { useEffect } from 'react';

const useKeys = (setUpKeyPressed: any) => {
  useEffect(() => {
    const downHandler = ({ key }: any) => {
      if (key === 'ArrowUp') {
        setUpKeyPressed(true);
      }
    }

    const upHandler = ({ key }: any) => {
      if (key === 'ArrowUp') {
        setUpKeyPressed(false);
      }
    }

    window.addEventListener('keydown', downHandler, { passive: true })
    window.addEventListener('keyup', upHandler, { passive: true })

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [setUpKeyPressed])
}


export const Keyboard = ({setUpKeyPressed}: any) => {
  useKeys(setUpKeyPressed);
  return null;
}
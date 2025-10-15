import { useRef, useEffect } from 'react';

export default function Dialog({open, onClose, children }:{open:boolean,onClose: () => void, children: React.ReactNode}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} >
      {children}
      <button onClick={onClose}>Cancel</button>
    </dialog>
  );
}

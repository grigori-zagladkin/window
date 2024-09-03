import {createContext, FC, useContext, useState} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onCancel: () => void;
  onApprove: () => void;
  title?: string;
  description?: string;
  cancelCaption?: string;
  approveCaption?: string;
}

export const Alert: FC<IProps> = () => {
  const { openAlert } = useContext(AlertContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || 'Вы точно уверены'}</AlertDialogTitle>
          {!!description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelCaption || 'Отмена'}</AlertDialogCancel>
          <AlertDialogAction>{approveCaption || 'Подтвердить'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface IAlertContext {
  openAlert: (onApprove: () => void, alertConfig: object) => void;
}

const alertContext: IAlertContext = {
  // openAlert
}

export const AlertContext = createContext<IAlertContext>(alertContext);

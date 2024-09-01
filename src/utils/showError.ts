import { toast } from 'sonner';

export const showError = (err: object, errMessage: string = '') => {
  console.error(err);
  throw new Error(errMessage);
  toast.error(errMessage);
};

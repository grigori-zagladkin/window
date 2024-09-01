'use client';

import { FC, useState, useCallback, useRef, ChangeEvent } from 'react';
import { Eye } from '@/components/icons/icon-eye';
import { Trash } from '@/components/icons/icon-trash';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';

interface IImageUploadProps {
  onChange: (imgs: string[]) => void;
  initialValues: string[];
  maxCount?: number;
}

export const ImageUpload: FC<IImageUploadProps> = ({ onChange, initialValues, maxCount = 8 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [idxVisibleImg, setIdxVisibleImg] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState(initialValues);
  const plusClickHandler = useCallback(() => {
    inputRef.current?.click();
  }, []);
  const handleUploadImage = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && images.length < maxCount) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        const newImages = [...images, reader.result as string];
        setImages(newImages);
        onChange(newImages);
      };
    }
  }, []);

  const deleteImage = useCallback((index: number) => {
    const newImages = images.filter((_, idx) => idx === index);
    setImages(newImages);
    onChange(newImages);
  }, []);

  const seeImage = useCallback((index: number) => {
    setIdxVisibleImg(index);
    setIsOpen(true);
  }, []);

  return (
    <div className="relative h-[400px] w-[400px] rounded-lg border-[1px] p-2">
      {images.map((img, idx) => (
        <div key={idx} className="group relative h-fit w-fit transition hover:brightness-50">
          <img
            alt="Картинка"
            width={80}
            className="h-[80px] w-[80px] rounded-lg"
            height={80}
            src={img}
            key={idx}
          />
          <Eye
            onClick={() => seeImage(idx)}
            className="absolute left-1/4 top-1/2 hidden h-4 w-4 -translate-x-1/4 -translate-y-1/2 transform stroke-white group-hover:block"
          />
          <Trash
            onClick={() => deleteImage(idx)}
            className="absolute left-3/4 top-1/2 hidden h-4 w-4 -translate-x-3/4 -translate-y-1/2 transform stroke-white group-hover:block"
          />
        </div>
      ))}
      <input type="file" className="hidden" onChange={handleUploadImage} ref={inputRef} />
      <span
        onClick={plusClickHandler}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer select-none text-4xl font-light text-slate-300"
      >
        +
      </span>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <img alt="Картинка" src={images[idxVisibleImg]} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

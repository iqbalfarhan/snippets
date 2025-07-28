import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const em = (e: { [key: string]: string }) => {
  return Object.entries(e)
    .map(([, v]) => v)
    .join(', ');
};

export function strLimit(text: string = '', limit: number = 50, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}

export function dateDFY(date: string | Date) {
  return dayjs(date).format('DD MMMM YYYY');
}

export function handlePasteScreenshot(callback: (file: File) => void) {
  const onPaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image')) {
        const file = item.getAsFile();
        if (file) {
          callback(file);
        }
      }
    }
  };

  window.addEventListener('paste', onPaste);
  return () => window.removeEventListener('paste', onPaste); // biar bisa cleanup
}

export function copyMarkdownImage(alt: string, url: string) {
  const markdown = `![${alt}](${url})`;

  navigator.clipboard
    .writeText(markdown)
    .then(() => toast.success(`${alt} copied to clipboard`))
    .catch((err) => toast.error(err));
}

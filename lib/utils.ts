import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const em = (e: { [key: string]: string }) => {
  return Object.entries(e)
    .map(([, v]) => v)
    .join(", ");
};

export function strLimit(
  text: string = "",
  limit: number = 50,
  end: string = "...",
): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}

export function dateDFY(date: string | Date) {
  return dayjs(date).format("DD MMMM YYYY");
}

export function handlePasteScreenshot(callback: (file: File) => void) {
  const onPaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) {
          callback(file);
        }
      }
    }
  };

  window.addEventListener("paste", onPaste);
  return () => window.removeEventListener("paste", onPaste); // biar bisa cleanup
}

// cara pakai handlePasteScreenShot

// useEffect(() => {
//   const cleanup = handlePasteScreenshot((file) => {
//     router.post(
//       route('article.upload-media', article.id),
//       {
//         file,
//       },
//       {
//         preserveScroll: true,
//         onSuccess: () => toast.success('upload completed'),
//         onError: (e) => toast.error(em(e)),
//       },
//     );
//   });

//   return cleanup;
// }, [article.id]);

export function generateSlug(text: string): string {
  const slugBase = text.replace(/\//g, "");
  return slugBase.toLowerCase().replace(/\s+/g, "-");
}

export function generateRandomPassword(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";

  const randomChars = (charset: string, length: number): string => {
    return Array.from({ length }, () =>
      charset.charAt(Math.floor(Math.random() * charset.length)),
    ).join("");
  };

  const part1 = randomChars(letters, 4); // \w{4}
  const part2 = randomChars(digits, 4); // \d{4}

  return part1 + part2;
}

export function copyMarkdownImage(alt: string, url: string) {
  const markdown = `![${alt}](${url})`;

  navigator.clipboard
    .writeText(markdown)
    .then(() => toast.success(`${alt} copied to clipboard`))
    .catch((err) => toast.error(err));
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

// export function formatRupiah(value: number, prefix: boolean = false): string {
//   if (isNaN(value) || value === 0) {
//     return '';
//   }

//   return (prefix ? 'Rp ' : '') + new Intl.NumberFormat('id-ID').format(value);
// }

export function parseRupiah(display: string): number {
  // Remove all non-digit characters (dots, spaces used as thousand separators)
  const cleaned = display.replace(/\D/g, "");
  const parsed = parseInt(cleaned, 10);

  return isNaN(parsed) ? 0 : parsed;
}

export function sortData<T>(
  datas: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...datas].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA === null || valA === undefined) {
      return 1;
    }

    if (valB === null || valB === undefined) {
      return -1;
    }

    let result = 0;

    if (typeof valA === "string" && typeof valB === "string") {
      result = valA.localeCompare(valB);
    } else if (typeof valA === "number" && typeof valB === "number") {
      result = valA - valB;
    } else if (valA instanceof Date && valB instanceof Date) {
      result = valA.getTime() - valB.getTime();
    } else {
      result = String(valA).localeCompare(String(valB));
    }

    return order === "asc" ? result : -result;
  });
}

export function groupBy<T>(
  datas: T[],
  keyOrSelector: keyof T | ((item: T) => string),
): Record<string, T[]> {
  return datas.reduce(
    (acc, item) => {
      const groupKey =
        typeof keyOrSelector === "function"
          ? keyOrSelector(item)
          : String(item[keyOrSelector] ?? "undefined");

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }

      acc[groupKey].push(item);

      return acc;
    },
    {} as Record<string, T[]>,
  );
}

export function groupAndSort<T>(
  datas: T[],
  groupKey: keyof T,
  sortKey: keyof T,
  order: "asc" | "desc" = "asc",
): Record<string, T[]> {
  const grouped = groupBy(datas, groupKey);

  return Object.fromEntries(
    Object.entries(grouped).map(([key, items]) => [
      key,
      sortData(items, sortKey, order),
    ]),
  );
}

export function strPad(value: number, length: number = 10): string {
  return String(value).padStart(length, "0");
}

export function parseAddress(data: Address): string {
  return `Jalan ${data.jalan} No ${data.no} RT ${data.rt}. Kelurahan ${data.kelurahan} Kecamatan ${data.kecamatan} ${data.kota}, ${data.provinsi}`;
}

export const getPercentage = (number: number, total: number): number => {
  if (total === 0) {
    return 0;
  }

  return Math.round((number / total) * 100);
};

export function getSum<T, K extends keyof T>(data: T[], key: K): number {
  return data.reduce((acc, item) => acc + Number(item[key]), 0);
}

export function getAverage<T, K extends keyof T>(data: T[], key: K): number {
  if (data.length === 0) {
    return 0;
  }

  return getSum(data, key) / data.length;
}

export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

export const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() ?? "";
};

export function safeAverage<T>(arr: T[], fn: (item: T) => number): number {
  if (arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce((acc, item) => acc + fn(item), 0);

  return sum / arr.length;
}

export function removeAtIndexMutable<T>(arr: T[], index: number): T[] {
  if (index < 0 || index >= arr.length) {
    return arr;
  } // biar aman

  arr.splice(index, 1);

  return arr;
}

export function flattenValues(obj: Record<string, any>): string[] {
  return Object.values(obj).flatMap((v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? flattenValues(v)
      : [String(v)],
  );
}

export function numberPad(num: number, size = 5): string {
  return num.toString().padStart(size, "0");
}

export const generatePassword = (): string => {
  const benda = [
    "buku",
    "pulpen",
    "meja",
    "kursi",
    "lampu",
    "dasi",
    "pensil",
    "seragam",
    "sepatu",
    "pintu",
  ];

  const warna = [
    "kuning",
    "merah",
    "hijau",
    "biru",
    "ungu",
    "jingga",
    "putih",
    "hitam",
    "coklat",
    "pink",
  ];

  const randomBenda = benda[Math.floor(Math.random() * benda.length)];
  const randomWarna = warna[Math.floor(Math.random() * warna.length)];
  const randomAngka = Math.floor(Math.random() * 90 + 10); // 10–99

  return `${randomBenda}${randomWarna}${randomAngka}`;
};

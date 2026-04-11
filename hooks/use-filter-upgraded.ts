import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// ============================================================
// Types
// ============================================================

export type FilterConfig<T> = {
  key: keyof T;
  label: string;
  type: 'select' | 'text';
  getValue?: (item: T) => string;
};

export type FilterState = Record<string, string>;

export type SortConfig<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
  getValue?: (item: T) => string;
};

export type UseFilterOptions = {
  debounce?: number;   // default 300ms
  syncUrl?: boolean;   // default false
};

// ============================================================
// Helper
// ============================================================

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function flattenValues(obj: Record<string, any>): string[] {
  return Object.values(obj).flatMap((v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? flattenValues(v)
      : [String(v)],
  );
}

// ============================================================
// Hook
// ============================================================

export function useFilter<T extends Record<string, any>>(
  data: T[],
  configs?: FilterConfig<T>[],
  options: UseFilterOptions = {},
) {
  const { debounce = 300, syncUrl = false } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Normalize configs ──────────────────────────────────────
  const activeConfigs = useMemo(() => {
    const raw =
      configs ??
      (data.length
        ? Object.keys(data[0])
            .filter((key) => typeof data[0][key] !== 'object')
            .map((key) => ({
              key: key as keyof T,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              type: 'select' as const,
            }))
        : []);

    return raw.map((cfg) => ({
      ...cfg,
      getValue:
        ('getValue' in cfg ? cfg.getValue : undefined) ??
        ((item: T) => String(item[cfg.key])),
    }));
  }, [data, configs]);

  // ── State — init dari URL kalau syncUrl aktif ──────────────
  const [search, setSearch] = useState(() =>
    syncUrl ? (searchParams.get('q') ?? '') : '',
  );

  const [filters, setFilters] = useState<FilterState>(() => {
    if (!syncUrl) return {};
    const init: FilterState = {};
    activeConfigs.forEach((cfg) => {
      const val = searchParams.get(cfg.key as string);
      if (val) init[cfg.key as string] = val;
    });
    return init;
  });

  const [sort, setSort] = useState<SortConfig<T> | null>(() => {
    if (!syncUrl) return null;
    const key = searchParams.get('sortKey');
    const direction = searchParams.get('sortDir') as 'asc' | 'desc' | null;
    if (!key || !direction) return null;
    return { key: key as keyof T, direction };
  });

  const debouncedSearch = useDebounce(search, debounce);

  // ── Sync ke URL ────────────────────────────────────────────
  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    if (sort) {
      params.set('sortKey', sort.key as string);
      params.set('sortDir', sort.direction);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [search, filters, sort, syncUrl]);

  // ── Options untuk dropdown ─────────────────────────────────
  const options_ = useMemo(() => {
    const result: Record<string, string[]> = {};
    activeConfigs.forEach((cfg) => {
      if (cfg.type === 'select') {
        result[cfg.key as string] = [
          ...new Set(
            data.map((item) => cfg.getValue(item)).filter(Boolean),
          ),
        ].sort();
      }
    });
    return result;
  }, [data, activeConfigs]);

  // ── Filter + Sort ──────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = data.filter((item) => {
      const matchSearch =
        !debouncedSearch ||
        flattenValues(item).some((v) =>
          v.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );

      const matchFilters = activeConfigs.every((cfg) => {
        const activeVal = filters[cfg.key as string];
        if (!activeVal) return true;

        const itemVal = cfg.getValue(item);

        if (cfg.type === 'text') {
          return itemVal.toLowerCase().includes(activeVal.toLowerCase());
        }

        return itemVal.toLowerCase() === activeVal.toLowerCase();
      });

      return matchSearch && matchFilters;
    });

    if (sort) {
      result = [...result].sort((a, b) => {
        const aVal = sort.getValue
          ? sort.getValue(a)
          : String(a[sort.key]);
        const bVal = sort.getValue
          ? sort.getValue(b)
          : String(b[sort.key]);
        return sort.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return result;
  }, [data, debouncedSearch, filters, sort, activeConfigs]);

  // ── Reset ──────────────────────────────────────────────────
  const reset = () => {
    setSearch('');
    setFilters({});
    setSort(null);
  };

  // ── Derived state ──────────────────────────────────────────
  const filterCount =
    Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  const hasActiveFilter = filterCount > 0;

  return {
    // data
    filtered,
    // search
    search,
    setSearch,
    // filter
    filters,
    setFilters,
    options: options_,
    // sort
    sort,
    setSort,
    // utils
    reset,
    hasActiveFilter,
    filterCount,
    configs: activeConfigs,
  };
}


// --- HOW TO USE ---
// const {
//   filtered,
//   search, setSearch,
//   filters, setFilters,
//   options,
//   sort, setSort,
//   reset,
//   hasActiveFilter,
//   filterCount,
// } = useFilter<Kelas>(
//   data,
//   [
//     { key: 'name',      label: 'Nama Kelas', type: 'select' },
//     { key: 'grade',     label: 'Grade',      type: 'select', getValue: (item) => item.grade?.name ?? '' },
//     { key: 'walikelas', label: 'Walikelas',  type: 'text',   getValue: (item) => item.walikelas?.name ?? '' },
//   ],
//   {
//     debounce: 300,
//     syncUrl: true,   // ← filter persist di URL
//   }
// )

// setSort({ key: 'name', direction: 'asc' })
// setSort({ key: 'grade', direction: 'desc', getValue: (item) => item.grade?.name ?? '' })

// reset()

// <button>
//   Filter {filterCount > 0 && <span>{filterCount}</span>}
// </button>

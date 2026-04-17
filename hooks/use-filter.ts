import { flattenValues } from "@/lib/utils";
import { useMemo, useState } from "react";

export type FilterConfig<T> = {
  key: keyof T;
  label: string;
  type: "select" | "text";
  getValue?: (item: T) => string;
};

export type FilterState = Record<string, string>;

export function useFilter<T extends Record<string, any>>(
  data: T[],
  configs?: FilterConfig<T>[],
) {
  const activeConfigs = useMemo(() => {
    const raw =
      configs ??
      (data.length
        ? Object.keys(data[0])
            .filter((key) => typeof data[0][key] !== "object")
            .map((key) => ({
              key: key as keyof T,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              type: "select" as const,
            }))
        : []);

    // Normalisasi — inject default getValue kalau tidak ada
    return raw.map((cfg) => ({
      ...cfg,
      getValue:
        ("getValue" in cfg ? cfg.getValue : undefined) ??
        ((item: T) => String(item[cfg.key])),
    }));
  }, [data, configs]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({});

  const options = useMemo(() => {
    const result: Record<string, string[]> = {};
    activeConfigs.forEach((cfg) => {
      if (cfg.type === "select") {
        result[cfg.key as string] = [
          "Semua",
          ...new Set(data.map((item) => cfg.getValue(item)).filter(Boolean)),
        ].sort();
      }
    });

    return result;
  }, [data, activeConfigs]);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        !search ||
        flattenValues(item).some((v) =>
          v.toLowerCase().includes(search.toLowerCase()),
        );

      const matchFilters = activeConfigs.every((cfg) => {
        const activeVal = filters[cfg.key as string];

        if (!activeVal || activeVal === "Semua") {
          return true;
        }

        const itemVal = cfg.getValue(item);

        if (cfg.type === "text") {
          return itemVal.toLowerCase().includes(activeVal.toLowerCase());
        }

        return itemVal.toLowerCase() === activeVal.toLowerCase();
      });

      return matchSearch && matchFilters;
    });
  }, [data, search, filters, activeConfigs]);

  const reset = () => {
    setSearch("");
    setFilters({});
  };

  const hasActiveFilter = !!search || Object.values(filters).some(Boolean);

  return {
    filtered,
    search,
    setSearch,
    filters,
    setFilters,
    options,
    reset,
    hasActiveFilter,
    configs: activeConfigs,
  };
}

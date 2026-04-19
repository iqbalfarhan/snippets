import { FilterConfig, useFilter } from "@/hooks/use-filter";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import SearchInput from "./search-input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DynamicFilterProps<T> {
  data: T[];
  configs?: FilterConfig<T>[]; // opsional — auto-detect jika tidak diisi
  searchable?: boolean; // tampilkan search input (default: true)
  children: (filtered: T[]) => ReactNode;
}

export function DynamicFilter<T extends Record<string, any>>({
  data,
  configs,
  searchable = true,
  children,
}: DynamicFilterProps<T>) {
  const {
    filtered,
    search,
    setSearch,
    filters,
    setFilters,
    options,
    reset,
    configs: activeConfigs,
  } = useFilter(data, configs);

  const hasActiveFilter = search || Object.values(filters).some(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 justify-between">
        {/* Search input */}
        {searchable && (
          <div>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          {activeConfigs
            .filter((cfg) => cfg.type === "select")
            .map((cfg) => (
              <Select
                key={cfg.key as string}
                value={filters[cfg.key as string] || ""}
                onValueChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    [cfg.key]: e,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={cfg.label} />
                </SelectTrigger>
                <SelectContent>
                  {(options[cfg.key as string] || []).map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

          {/* Reset button */}
          {hasActiveFilter && (
            <Button onClick={reset} variant={"destructive"}>
              <X />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Hasil: pakai render props */}
      <div>{children(filtered)}</div>
    </div>
  );
}

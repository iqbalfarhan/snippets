// hooks/useCanAccess.ts
import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';

type Permission = string;

export function useCanAccess() {
  const { auth } = usePage().props;

  const canAccess = useCallback(
    (
      requiredPermissions: Permission | Permission[],
      mode: 'all' | 'any' = 'all',
    ): boolean => {
      const permissions = auth?.permissions ?? [];

      if (permissions.length === 0) {
        return false;
      }

      // Normalize ke array
      const normalized = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      if (mode === 'any') {
        return normalized.some((p) => permissions.includes(p));
      }

      return normalized.every((p) => permissions.includes(p));
    },
    [auth?.permissions],
  );

  return { canAccess };
}

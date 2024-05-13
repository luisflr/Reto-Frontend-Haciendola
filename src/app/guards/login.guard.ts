import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const loginGuard = (): boolean => {
  const router = inject(Router);
  if(localStorage.getItem('user-access') !== null) return true;
  router.navigate(['/login']);
  return false;
}
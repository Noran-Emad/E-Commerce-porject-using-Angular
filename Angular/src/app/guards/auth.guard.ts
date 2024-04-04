import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] =['/profile','/orders','/payment/:id'];
  return protectedRoutes.includes(state.url) && !localStorage.getItem('jwt')
  ?router.navigate(['/login']): true;
};
 
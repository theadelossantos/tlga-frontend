import { INavbarData } from "./helper";
import { AuthService } from "src/app/services/auth.service";
import { map } from "rxjs/operators";

export const navbarData: INavbarData[] = [
    {
        routeLink: '/teacher/dashboard',
        icon: 'fa-solid fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: '/teacher/weeklyprog',
        icon: 'fas fa-list-alt',
        label: 'Weekly Progress',
    },
    {
        routeLink: '/teacher/grades',
        icon: 'fas fa-sticky-note',
        label: 'Grades',
    },
    {
      routeLink: '/teacher/analytics',
      icon: 'fas fa-chart-line',
      label: 'Analytics',
      expanded: false,
    },
    {
        routeLink: '/teacher/settings',
        icon: 'fa-solid fa-gears',
        label: 'Settings',
        expanded: true,
        items: [
            {
                routeLink: '/teacher/settings/profile',
                label: 'Profile'
            }
        ]
    },
];

export async function loadDepartments(navbarData: INavbarData[], authService: AuthService, routeLink: string) {
    const item = navbarData.find(item => item.routeLink === routeLink);
    console.log('item:', item);
  
    if (item) {
      try {
        const departments = await authService.getDepartments()
          .pipe(
            map((data: any) => {
              return data.departments.map((department: any) => ({
                routeLink: `${routeLink}/${department.id}`,
                label: department.name
              }));
            })
          )
          .toPromise();
          
        console.log('Departments:', departments);
  
        if (departments.length > 0) {
          item.items = departments;
        }
      } catch (error) {
        console.error('Error loading departments:', error);
      }
    }
  }
  
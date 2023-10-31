import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData, loadDepartments } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-student-sidenav',
  templateUrl: './student-sidenav.component.html',
  styleUrls: ['./student-sidenav.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '500ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class StudentSidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  departments: any[] = [];
  departmentsExpanded = false;
  user: any;
  studentInfo: any = {}
  gradelevel: string;
  section: string;
  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    const classesRouteLink = '/student/classes';
    loadDepartments(this.navData, this.authService, classesRouteLink);

    const teacherRouteLink = '/student/teachers';
    loadDepartments(this.navData, this.authService, teacherRouteLink);

    const studentsRouteLink = '/student/students';
    loadDepartments(this.navData, this.authService, studentsRouteLink);

    const coursesRouteLink = '/student/courses';
    loadDepartments(this.navData, this.authService, coursesRouteLink);

    this.authService.getDepartments().subscribe((data) => {
      this.departments = data.departments;
    });
    this.authService.getStudentProfile().subscribe((userData: any) => {
      this.user = userData; 

      this.studentInfo = userData
      console.log(this.studentInfo)
      this.authService.getGradeLevelById(this.studentInfo.gradelvl_id).subscribe((data)=>{
        this.gradelevel = data.gradelevelss[0].gradelvl
      })
      this.authService.getSectionById(this.studentInfo.section_id).subscribe((data)=>{
        this.section = data.sections[0].section_name
      })
    });
    
  }

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav():void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});

  }
handleclick(item: INavbarData):void{
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
  item.expanded = !item.expanded
  }
  getActiveClass(data: INavbarData): string{
    return this.router.url.includes(data.routeLink) ? 'active':'';
  }

  @Output() departmentSelected = new EventEmitter<any>(); 

  setSelectedDepartment(department: any) {
    this.departmentSelected.emit(department);
  }

  logout(){
    console.log('Logout function called');
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out:', error);
      }
    )
  }
  
}

import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit, OnInit {
  currentDate: HTMLElement;
  prevNextIcon: NodeListOf<HTMLElement>;
  date: Date;
  currYear: number;
  currMonth: number;
  months: string[];
  daysArray: { value: number; isActive: boolean }[] = [];
  studentCount: any = {};
  teacherCount: any = {};
  departments:any[] = []
  selectedDepartments: number[] = [];
  announcementMessage = '';
  announcementSubject: string = ''
  announcementlist: any [] = []
  selectedAnnouncement: any = {};  
  selectedDepartmentsForEdit: { [key: number]: boolean } = {};
  selectedDepartmentId: number;
  queriesCount: number
  queries: any[] = [];
  showAlert: boolean = false;
  showAddAlert: boolean = false;
  showDelAlert: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.getStudentCount().subscribe(
      count => {
        this.studentCount = count;
      }
    )
    this.authService.getTeacherCount().subscribe(
      count => {
        this.teacherCount = count;
      }
    )
    this.authService.getDepartments().subscribe(
      (data) => {
        this.departments = data.departments
      }
    )
    this.authService.getAnnouncement().subscribe(
      (data) => {
        this.announcementlist = data

        
      }
    )
    this.authService.getQueries().subscribe(
      (data: any) => {
        this.queries = data
        this.queriesCount = this.queries.length
      }
    )
  }

  toggleDepartmentSelection(deptId: number) {
    const index = this.selectedDepartments.indexOf(deptId);
    if (index === -1) {
      this.selectedDepartments.push(deptId);
    } else {
      this.selectedDepartments.splice(index, 1);
    }
  }
  
  postAnnouncement(){
    if (this.selectedDepartments.length === 0) {
      return;
    }
    for (const deptId of this.selectedDepartments) {
      const announcementData = {
        department: deptId, 
        subject: this.announcementSubject,
        message: this.announcementMessage,
      };
  
      this.authService.addAnnouncement(announcementData).subscribe(
        (response: any) => {
  
          this.announcementMessage = '';
          this.announcementSubject = '';

          this.showAddAlert = true;

          setTimeout(() => {
            this.hideAlert();
          }, 3000);

          this.authService.getAnnouncement().subscribe(
            (data) => {
              this.announcementlist = data
      
            }
          )

        },
        (error: any) => {
          console.error(`Error posting announcement for department ${deptId}`);
        }
      );
    }
  }

  editAnnouncement() {
    if (this.selectedAnnouncement && this.selectedAnnouncement.id) {
      this.authService.editAnnouncement(this.selectedAnnouncement.id, this.selectedAnnouncement).subscribe(
        (response) => {
          this.showAlert = true;

          setTimeout(() => {
            this.hideAlert();
          }, 3000);
        },
        (error) => {
          console.error('Error updating announcement:');
        }
      );
    } else {
      console.error('Selected announcement is missing an ID.');
    }
  }
  hideAlert() {
    this.showAlert = false;
  }

  deleteAnnouncement(){
    if(this.selectedAnnouncement.id){
      this.authService.deleteAnnouncement(this.selectedAnnouncement.id).subscribe(
        (response) => {
          this.showDelAlert = true;

          setTimeout(() => {
            this.hideAlert();
          }, 3000);

          this.authService.getAnnouncement().subscribe(
            (data) => {
              this.announcementlist = data
            }
          )

        }
      )
    }
  }

  openAnnouncementModal(announcement: any) {
    this.selectedAnnouncement = announcement;
    this.selectedDepartmentId = announcement.department;
  
    this.selectedDepartmentsForEdit = {};
    this.selectedDepartmentsForEdit[announcement.department] = true;
  
  }
  
  isSelectedDepartment(deptId: number): boolean {
    return !!this.selectedDepartmentsForEdit[deptId];
  }


  ngAfterViewInit() {
    this.currentDate = document.querySelector(".current-date") as HTMLElement;
    this.prevNextIcon = document.querySelectorAll(".icons span") as NodeListOf<HTMLElement>;

    this.date = new Date();
    this.currYear = this.date.getFullYear();
    this.currMonth = this.date.getMonth();

    this.months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    this.renderCalendar();

    this.prevNextIcon.forEach(icon => {
      icon.addEventListener("click", () => {
        this.currMonth = icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;
        if (this.currMonth < 0 || this.currMonth > 11) {
          this.date = new Date(this.currYear, this.currMonth, new Date().getDate());
          this.currYear = this.date.getFullYear();
          this.currMonth = this.date.getMonth();
        } else {
          this.date = new Date();
        }
        this.renderCalendar();
      });
    });
    this.cdr.detectChanges();

  }

  renderCalendar() {
    let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    let lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
    this.daysArray = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      this.daysArray.push({ value: lastDateofLastMonth - i + 1, isActive: false });
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday = i === this.date.getDate() && this.currMonth === new Date().getMonth() && this.currYear === new Date().getFullYear();
      this.daysArray.push({ value: i, isActive: isToday });
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      this.daysArray.push({ value: i - lastDayofMonth + 1, isActive: false });
    }

    this.currentDate.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
    this.cdr.detectChanges();

  }
  
}

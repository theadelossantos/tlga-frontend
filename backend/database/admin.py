from django.contrib import admin
from .models import *
# Register your models here.

class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'dept_id', 'gradelvl_id', 'section_id', 'fname', 'mname', 'lname', 'address', 'phone', 'gender', 'birthdate', 'user_id')

admin.site.register(Student, StudentAdmin)

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('teacher_id', 'dept_id', 'gradelvl_id', 'section_id', 'fname', 'mname', 'lname', 'address', 'phone', 'gender', 'birthdate', 'user_id')

   
admin.site.register(Teacher, TeacherAdmin)

class AssignAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'subject_id', 'dept_id', 'gradelvl_id', 'section_id')

admin.site.register(Assigned, AssignAdmin)


class AdminMain(admin.ModelAdmin):
    list_display = ('admin_id', 'fname', 'mname', 'lname', 'address', 'phone', 'gender', 'user_id')
admin.site.register(Admin, AdminMain)

class GradeLevelAdmin(admin.ModelAdmin):
    list_display = ('gradelvl_id', 'dept_id', 'gradelvl')

admin.site.register(GradeLevel, GradeLevelAdmin)

class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('dept_id', 'dept_name')
admin.site.register(Department, DepartmentAdmin)

class SectionAdmin(admin.ModelAdmin):
    list_display = ('section_id','dept_id', 'gradelvl_id','section_name')
admin.site.register(Section, SectionAdmin)

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('subject_id','dept_id','gradelvl_id', 'subject_name')
admin.site.register(Subject, SubjectAdmin)

class QuarterAdmin(admin.ModelAdmin):
    list_display = ('quarter_id','quarter_name')
admin.site.register(Quarter, QuarterAdmin)

class WeeklyProgressAdmin(admin.ModelAdmin): 
    list_display = ('student_id','dept_id','gradelvl_id','section_id','subject_id', 'quarter_id', 'task_name', 'task_score', 'task_status', 'input_date')
admin.site.register(WeeklyProgress, WeeklyProgressAdmin)

class ItemAnalysisAdmin(admin.ModelAdmin):
    list_display = ('gradelvl_id','section_id','subject_id', 'correct_responses', 'percentage_correct') 
admin.site.register(ItemAnalysis, ItemAnalysisAdmin)

admin.site.register(Announcement)
admin.site.register(HpsScores)    
admin.site.register(CustomUser)

admin.site.register(StudentGrade)


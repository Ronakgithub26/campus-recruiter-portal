package com._sem.campus_portal.service;

import com._sem.campus_portal.model.Student;
import java.util.List;

public interface StudentService
{
    //method declaration
    Student saveStudent(Student student);
    Student getById(String id);
    List<Student> getAllStudents();
    Student updateStudent(String id, Student student);
    void deleteStudent(String id);
}

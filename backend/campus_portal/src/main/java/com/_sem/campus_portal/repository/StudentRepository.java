package com._sem.campus_portal.repository;

//import com._sem.campus_portal.controller.StudentController;
import com._sem.campus_portal.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

//implementing student repo extending jparepo
public interface StudentRepository extends MongoRepository<Student,String>
{
    List<Student> findByName(String name);
    Student findByEmail(String email);
}

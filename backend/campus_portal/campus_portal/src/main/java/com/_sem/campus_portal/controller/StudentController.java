package com._sem.campus_portal.controller;

import com._sem.campus_portal.model.Student;
import com._sem.campus_portal.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController
{
    @Autowired
    private StudentServiceImpl studentService;

    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody Student student)
    {
        Student saveStudent = studentService.saveStudent(student);
        return ResponseEntity.ok(saveStudent);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Student> getStudent(@PathVariable String email)
    {
        Student student = studentService.getByEmail(email);
        if (student == null)
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<Student> updateStudent(@PathVariable String email, @RequestBody Student student)
    {
        Student existing = studentService.getByEmail(email);

        if(existing == null)
        {
            return ResponseEntity.notFound().build();
        }

        //email can't be edited
        existing.setName(student.getName());
        existing.setContact(student.getContact());
        existing.setCgpa(student.getCgpa());
        existing.setGender(student.getGender());
        existing.setDept(student.getDept());
        existing.setPassword(student.getPassword());

        Student saved = studentService.saveStudent(existing);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<Student> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Student student = studentService.getByEmail(email);
        if (student == null) {
            return ResponseEntity.status(401).body(null); // User not found
        }

        if (!student.getPassword().equals(password)) {
            return ResponseEntity.status(401).body(null); // Wrong password
        }

        return ResponseEntity.ok(student); // Success
    }

}

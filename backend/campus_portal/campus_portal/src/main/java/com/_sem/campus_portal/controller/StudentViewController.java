package com._sem.campus_portal.controller;

import com._sem.campus_portal.model.Student;
import com._sem.campus_portal.service.StudentService;
import com._sem.campus_portal.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/student")
public class StudentViewController
{
    @Autowired
    private StudentServiceImpl studentService;

    @PostMapping("/form")
    public String submitForm(@ModelAttribute Student student,Model model) {
        studentService.saveStudent(student);
        model.addAttribute("message", "Student Saved Successfully");
        model.addAttribute("student", student);
        return "Student-home";
    }

    //for editing the student details
    @GetMapping("/edit")
    public String editForm(@RequestParam("id") String id, Model model)
    {
        Student student = studentService.getById(id);
        model.addAttribute("student", student);
        return "editstudent";
    }

    @PostMapping("/update")
    public String updateForm(@ModelAttribute Student student,Model model)
    {
        studentService.saveStudent(student);
        model.addAttribute("student", student);
        return "Student-home";
    }

}

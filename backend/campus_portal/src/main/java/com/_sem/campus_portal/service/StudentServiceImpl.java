package com._sem.campus_portal.service;

import com._sem.campus_portal.model.Student;
import com._sem.campus_portal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl
{
    @Autowired
    private StudentRepository studentRepository;


    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }


    public Student getById(String id)
    {
        return studentRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Student not found with id:"+id)
        );
    }


    public List<Student> getAllStudents()
    {
        return studentRepository.findAll();
    }


    public Student updateStudent(String id, Student student)
    {
        Student st = getById(id);
        //getById from above will already throw exception if not found
        st.setName(student.getName());
        st.setEmail(student.getEmail());
        st.setPassword(student.getPassword());
        st.setContact(student.getContact());
        st.setGender(student.getGender());
        st.setDept(student.getDept());
        st.setCgpa(student.getCgpa());


        return studentRepository.save(st);
    }


    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }

    public Student getByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}

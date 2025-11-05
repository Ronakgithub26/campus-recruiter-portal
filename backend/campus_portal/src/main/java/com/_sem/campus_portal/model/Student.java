package com._sem.campus_portal.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

//@Entity -> only used for JPA for Relational Databases like Mysql or Postgresql

//@Table(name = "students")  //creates table automatically in db
@Data  //generates getters, setters, toString equals, hashcode
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "studentdata") //replaces entity
public class Student
{
    //@Id                   //marking primary key
//    @GeneratedValue(strategy = GenerationType.IDENTITY) //for auto-increment
    @Id
    private String id;
    // Personal Info
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    private String college;

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    private String email;
    private String password;
    private String contact;
    private Double cgpa;
    private String dept;
    private String gender;
   // private String resumeUrl;  // Will store the path or MongoDB GridFS file ID

    // For application tracking (list of jobIds applied to)
    //private List<String> appliedJobIds;

}

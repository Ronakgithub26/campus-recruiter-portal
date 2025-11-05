package com._sem.campus_portal.model.recruiter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "recruiters")
public class Recruiter
{
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String companyName;

    private List<String> jobIds; // store references to job _ids

    // Constructors
    public Recruiter() {}

    public Recruiter(String name, String email, String password, String companyName,String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.companyName = companyName;
        this.role = role;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public List<String> getJobIds() { return jobIds; }
    public void setJobIds(List<String> jobIds) { this.jobIds = jobIds; }

    public String getRole() {return role;}
    public void setRole(String role){this.role = role;}
}

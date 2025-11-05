package com._sem.campus_portal.model.recruiter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "applications")
public class Application
{
    @Id
    private String id;

    private String jobId;
    private String studentId;

    private String status; // "Pending", "Shortlisted", "Rejected"
    private String appliedDate;

    // Constructors
    public Application() {}

    public Application(String jobId, String studentId, String status, String appliedDate) {
        this.jobId = jobId;
        this.studentId = studentId;
        this.status = status;
        this.appliedDate = appliedDate;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAppliedDate() { return appliedDate; }
    public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }
}

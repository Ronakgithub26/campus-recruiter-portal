package com._sem.campus_portal.model.recruiter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "jobs")
public class Job
{
    @Id
    private String id;
    private String title;
    private String description;
    private String skillsRequired;
    private LocalDate deadline;

    private String recruiterId;  // reference to recruiter
    private List<String> applicantIds;  // references to Application IDs

    // Constructors
    public Job() {}

    public Job(String title, String description, String skillsRequired, LocalDate deadline, String recruiterId) {
        this.title = title;
        this.description = description;
        this.skillsRequired = skillsRequired;
        this.deadline = deadline;
        this.recruiterId = recruiterId;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSkillsRequired() { return skillsRequired; }
    public void setSkillsRequired(String skillsRequired) { this.skillsRequired = skillsRequired; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public String getRecruiterId() { return recruiterId; }
    public void setRecruiterId(String recruiterId) { this.recruiterId = recruiterId; }

    public List<String> getApplicantIds() { return applicantIds; }
    public void setApplicantIds(List<String> applicantIds) { this.applicantIds = applicantIds; }
}

package com._sem.campus_portal.service;

import com._sem.campus_portal.model.Resume;
import com._sem.campus_portal.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeService
{
    @Autowired
    private ResumeRepository resumeRepository;

    public Resume saveResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    public Resume getResumeById(String resume_id){
        return resumeRepository.findById(resume_id).orElse(null);
    }
}

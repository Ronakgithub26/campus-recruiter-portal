package com._sem.campus_portal.controller;

import com._sem.campus_portal.model.Resume;
import com._sem.campus_portal.service.PdfService;
import com._sem.campus_portal.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.springframework.http.*;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController
{
    @Autowired
    private ResumeService resumeService;

    @PostMapping("/save")
    public Resume saveResume(@RequestBody Resume resume)
    {
        return resumeService.saveResume(resume);
    }

    @GetMapping("/{id}")
    public Resume getResumeById(@PathVariable String id)
    {
        return resumeService.getResumeById(id);
    }

    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(
            @RequestParam String jobId,
            @RequestParam String title,
            @RequestParam String companyName,
            @RequestParam String studentEmail,
            @RequestParam(required = false) String resumeId,
            @RequestParam(required = false) MultipartFile resumeFile) {

        // If resumeId is present, link it
        // If resumeFile is present, store the file in GridFS / local directory

        // Save application in DB
        return ResponseEntity.ok("Application submitted successfully");
    }

}

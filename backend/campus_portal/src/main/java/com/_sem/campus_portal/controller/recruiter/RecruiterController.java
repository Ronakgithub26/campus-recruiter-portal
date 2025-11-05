package com._sem.campus_portal.controller.recruiter;

import com._sem.campus_portal.model.recruiter.Job;
import com._sem.campus_portal.model.recruiter.Recruiter;
import com._sem.campus_portal.repository.JobRepository;
import com._sem.campus_portal.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recruiter")
@CrossOrigin(origins = "http://localhost:3000")
public class RecruiterController
{
    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerRecruiter(@RequestBody Recruiter recruiter) {
        Recruiter savedRecruiter = recruiterRepository.save(recruiter);
        return ResponseEntity.ok(savedRecruiter);
    }


    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Recruiter loginRequest) {
        Recruiter recruiter = recruiterRepository.findByEmail(loginRequest.getEmail());

        if (recruiter == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        if (!recruiter.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Remove password before sending response
        recruiter.setPassword(null);
        return ResponseEntity.ok(recruiter);
    }

    @GetMapping("/{id}")
    public Optional<Recruiter> getRecruiterById(@PathVariable String id) {
        return recruiterRepository.findById(id);
    }

    @PutMapping("/update/{id}")
    public Recruiter updateRecruiter(@PathVariable String id, @RequestBody Recruiter updatedRecruiter) {
        return recruiterRepository.findById(id)
                .map(existingRecruiter -> {
                    existingRecruiter.setName(updatedRecruiter.getName());
                    existingRecruiter.setEmail(updatedRecruiter.getEmail());
                    existingRecruiter.setCompanyName(updatedRecruiter.getCompanyName());
                    existingRecruiter.setPassword(updatedRecruiter.getPassword());
                    return recruiterRepository.save(existingRecruiter);
                })
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRecruiter(@PathVariable String id) {
        recruiterRepository.deleteById(id);
        return "Recruiter deleted successfully";
    }

    @PostMapping("/post-job")
    public ResponseEntity<Job> postJob(@RequestBody Job job) {
        Job savedJob = jobRepository.save(job);
        return ResponseEntity.ok(savedJob);
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable String id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deletejob/{id}")
    public ResponseEntity<Void> deleteJobById(@PathVariable String id) {
        if(jobRepository.existsById(id)){
            jobRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}

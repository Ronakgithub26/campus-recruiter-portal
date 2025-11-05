package com._sem.campus_portal.controller;

import com._sem.campus_portal.model.Test;
import com._sem.campus_portal.repository.TestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController
{
    @Autowired
    private TestRepo testRepo;

    @PostMapping("/register")
    public ResponseEntity<?> registerTest(@RequestBody Test test)
    {
        testRepo.save(test);
        return ResponseEntity.ok("User Saved");
    }
}

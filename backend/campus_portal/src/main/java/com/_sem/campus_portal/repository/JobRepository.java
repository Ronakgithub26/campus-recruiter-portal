package com._sem.campus_portal.repository;

import com._sem.campus_portal.model.recruiter.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends MongoRepository<Job,String> {
}

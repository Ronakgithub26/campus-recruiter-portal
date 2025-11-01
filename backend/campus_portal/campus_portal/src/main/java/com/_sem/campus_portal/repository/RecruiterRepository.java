package com._sem.campus_portal.repository;

import com._sem.campus_portal.model.recruiter.Recruiter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepository extends MongoRepository<Recruiter,String>
{
    Recruiter findByEmail(String username);
}

package com._sem.campus_portal.repository;

import com._sem.campus_portal.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResumeRepository extends MongoRepository<Resume,String>
{
}

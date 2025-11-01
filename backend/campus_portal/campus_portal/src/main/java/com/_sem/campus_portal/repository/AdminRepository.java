package com._sem.campus_portal.repository;

import com._sem.campus_portal.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin,Long>
{
}

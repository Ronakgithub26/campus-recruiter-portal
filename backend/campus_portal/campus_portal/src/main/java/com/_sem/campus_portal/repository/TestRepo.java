package com._sem.campus_portal.repository;

import com._sem.campus_portal.model.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepo extends MongoRepository<Test,String> {
}

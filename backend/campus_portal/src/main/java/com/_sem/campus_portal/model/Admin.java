package com._sem.campus_portal.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "adminData")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin
{
    @Id
    private Long id;
    private String name;
    private String email;
    private String password;
}

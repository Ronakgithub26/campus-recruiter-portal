package com._sem.campus_portal.service;

import com._sem.campus_portal.model.Admin;
import com._sem.campus_portal.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl
{
    @Autowired
    private AdminRepository adminRepository;
    public List<Admin> getAll()
    {
        return adminRepository.findAll();
    }

    public Optional<Admin> getById(Long id)
    {
        return adminRepository.findById(id);
    }

    public Admin addAdmin(Admin admin)
    {
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id)
    {
        adminRepository.deleteById(id);
    }

    public Admin updateAdmin(Long id,Admin admin)
    {
        Admin existingAdmin = adminRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Admin not found"));

        existingAdmin.setId(admin.getId());
        existingAdmin.setName(admin.getName());
        existingAdmin.setEmail(admin.getEmail());
        existingAdmin.setPassword(admin.getPassword());

        return adminRepository.save(existingAdmin);
    }


}

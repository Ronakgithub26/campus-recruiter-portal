package com._sem.campus_portal.controller;

import com._sem.campus_portal.model.Admin;
import com._sem.campus_portal.service.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminViewController
{
    @Autowired
    private AdminServiceImpl adminService;

    @GetMapping("/form")
    public String showForm(Model model)
    {
        model.addAttribute("admin",new Admin());
        return "admin-form";
    }

    @PostMapping("/form")
    public String submitForm(@ModelAttribute Admin admin,Model model)
    {
        adminService.addAdmin(admin);  //saves to mongodb atlas
        model.addAttribute("message","Admin saved Successfully");
        model.addAttribute("admin",new Admin());
        return "admin-form";
    }

    @PutMapping("/edit")
    public String editAdmin(@ModelAttribute Admin admin,Long id)
    {
        adminService.updateAdmin(id,admin);
        return "Admin updated Succesfully";
    }

    //show form for updating an existing admin
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model)
    {
        Admin existingAdmin = adminService.getById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        model.addAttribute("admin",existingAdmin);
        return "admin-edit-form";
    }

    @PostMapping("/edit/{id}")
    public String updateAdmin(@PathVariable Long id,@ModelAttribute Admin admin)
    {
        adminService.updateAdmin(id,admin);
        return "redirect:/admin/list";
    }
}

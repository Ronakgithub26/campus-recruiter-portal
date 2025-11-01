package com._sem.campus_portal.controller;

import com._sem.campus_portal.model.dto.ResumeDto;
import com._sem.campus_portal.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.springframework.http.*;

@RestController
@RequestMapping("/api/resume")
public class ResumeController
{
    @Autowired
    private PdfService pdfService;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateResume(@RequestBody ResumeDto resume) {
        // Render HTML from Thymeleaf template
        Context context = new Context();
        context.setVariable("resume", resume);
        String html = templateEngine.process("resume", context);

        // Convert HTML → PDF via PDFShift
        byte[] pdfBytes = pdfService.convertHtmlToPdf(html);

        // Return the PDF directly to frontend
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=resume.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}

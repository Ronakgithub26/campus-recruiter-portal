package com._sem.campus_portal.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;

@Service
public class PdfService
{
    @Value("${pdfshift.api.key}")
    private String apiKey;

    public byte[] convertHtmlToPdf(String html) {
        String url = "https://api.pdfshift.io/v3/convert/";
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> body = Map.of("source", html);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth("api", apiKey);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);

        return response.getBody();
    }
}

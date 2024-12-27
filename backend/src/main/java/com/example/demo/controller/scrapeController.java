

package com.example.demo.controller;

import com.example.demo.service.scrapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class scrapeController {

    private final scrapeService scrapeService;

    @Autowired
    public scrapeController(scrapeService scrapeService) {
        this.scrapeService = scrapeService;
    }

    @GetMapping("/scrape")
    public ResponseEntity<String> scrapeAndClean(@RequestParam String url) {
        try {
            String cleanText = scrapeService.fetchAndCleanHtml(url);
            return ResponseEntity.ok(cleanText);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}

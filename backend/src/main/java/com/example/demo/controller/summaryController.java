


package com.example.demo.controller;

import com.example.demo.service.summaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class summaryController {

    private final summaryService summaryService;

    @Autowired
    public summaryController(summaryService summaryService) {
        this.summaryService = summaryService;
    }

    @PostMapping("/summary")
    public ResponseEntity<?> processText(@RequestBody Map<String, String> requestBody) {
        try {
            String inputText = requestBody.getOrDefault("input", "").trim();

            if (inputText.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Input teks tidak boleh kosong."));
            }

            String summary = summaryService.processText(inputText);

            return ResponseEntity.ok(Map.of("summary_text", summary));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Terjadi kesalahan: " + e.getMessage()));
        }
    }
}

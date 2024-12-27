

package com.example.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class summaryService {

    private final RestTemplate huggingFaceRestTemplate;
    private final String huggingFaceApiUrl;
    private final ObjectMapper objectMapper;

    @Autowired
    public summaryService(@Qualifier("huggingFaceRestTemplate") RestTemplate huggingFaceRestTemplate,
                          @Qualifier("huggingFaceApiUrl") String huggingFaceApiUrl) {
        this.huggingFaceRestTemplate = huggingFaceRestTemplate;
        this.huggingFaceApiUrl = huggingFaceApiUrl;
        this.objectMapper = new ObjectMapper();
    }

    public String processText(String inputText) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("inputs", inputText);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = huggingFaceRestTemplate.postForEntity(
                    huggingFaceApiUrl, requestEntity, String.class);

            JsonNode jsonResponse = objectMapper.readTree(response.getBody());

            if (jsonResponse.isArray() && jsonResponse.size() > 0) {
                JsonNode firstElement = jsonResponse.get(0);
                if (firstElement.has("summary_text")) {
                    return firstElement.get("summary_text").asText();
                }
            }

            throw new RuntimeException("Respons API tidak memiliki 'summary_text' yang valid.");

        } catch (Exception e) {
            throw new RuntimeException("Gagal memproses permintaan ke Hugging Face API: " + e.getMessage());
        }
    }
}

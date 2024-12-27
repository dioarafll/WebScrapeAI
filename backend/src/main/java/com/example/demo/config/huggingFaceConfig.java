

package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class huggingFaceConfig {

    @Value("${huggingface.api.key}")
    private String apiKey;

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.timeout.connect:10}") // Default 10 detik jika tidak diatur
    private int connectTimeout;

    @Value("${huggingface.timeout.read:10}") // Default 10 detik jika tidak diatur
    private int readTimeout;

    /**
     * RestTemplate khusus untuk HuggingFace API
     */
    @Bean
    public RestTemplate huggingFaceRestTemplate(RestTemplateBuilder builder) {
        return builder
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .setConnectTimeout(Duration.ofSeconds(connectTimeout))
                .setReadTimeout(Duration.ofSeconds(readTimeout))
                .build();
    }

    /**
     * Mengembalikan URL API HuggingFace untuk injeksi mudah
     */
    @Bean
    public String huggingFaceApiUrl() {
        return apiUrl;
    }
}

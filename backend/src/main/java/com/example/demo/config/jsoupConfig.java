
package com.example.demo.config;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class jsoupConfig {

    @Value("${jsoup.user-agent}")
    private String userAgent;

    @Value("${jsoup.timeout}")
    private int timeout;

    @Value("${jsoup.follow-redirects}")
    private boolean followRedirects;

    /**
     * Bean untuk koneksi Jsoup dengan konfigurasi yang fleksibel.
     * 
     * @return Konfigurasi dasar Connection Jsoup
     */
    @Bean
    public Connection jsoupConnection() {
        return Jsoup.newSession()
                .timeout(timeout)
                .userAgent(userAgent)
                .followRedirects(followRedirects);
    }
}



package com.example.demo.config;

import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class httpClientConfig {

    @Value("${httpclient.timeout.connection}")
    private int connectionTimeout;

    @Value("${httpclient.timeout.socket}")
    private int socketTimeout;

    @Value("${httpclient.timeout.request}")
    private int requestTimeout;

    @Value("${httpclient.user-agent}")
    private String userAgent;

    /**
     * Bean untuk HttpClient yang dikonfigurasi dengan timeout dan User-Agent.
     *
     * @return CloseableHttpClient instance yang siap digunakan
     */
    @Bean
    public CloseableHttpClient httpClient() {
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectTimeout(connectionTimeout)
                .setSocketTimeout(socketTimeout)
                .setConnectionRequestTimeout(requestTimeout)
                .build();

        return HttpClients.custom()
                .setDefaultRequestConfig(requestConfig)
                .setUserAgent(userAgent)
                .build();
    }
}

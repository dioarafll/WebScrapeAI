

package com.example.demo.service;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class scrapeService {

    private final CloseableHttpClient httpClient;

    private static final String[] REMOVABLE_SELECTORS = {
            "script", "style", "iframe", "nav", "footer",
            ".ad", ".ads", ".advertisement", ".sponsored",
            "svg", "img", "table", "thead", "tr", "th", "tbody", "tfoot"
    };

    @Autowired
    public scrapeService(CloseableHttpClient httpClient) {
        this.httpClient = httpClient;
    }

    public String fetchAndCleanHtml(String url) throws Exception {
        HttpGet request = new HttpGet(url);

        try (CloseableHttpResponse response = httpClient.execute(request)) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }

            Document document = Jsoup.parse(content.toString());
            cleanHtmlContent(document);
            return document.body().text();
        }
    }

    private void cleanHtmlContent(Document document) {
        for (String selector : REMOVABLE_SELECTORS) {
            Elements elementsToRemove = document.select(selector);
            elementsToRemove.remove();
        }
    }
}

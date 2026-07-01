package com.nasia.smarthire.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    public String analyzeCV(String cvText, String jobRequirements) {
        String prompt = """
                Analyze this CV against the job requirements and provide:
                1. A match score from 0-100
                2. A brief summary (max 3 sentences) explaining the score
                
                Job Requirements: %s
                
                CV: %s
                
                Respond in this exact JSON format:
                {"score": <number>, "summary": "<text>"}
                """.formatted(jobRequirements, cvText);

        RestTemplate restTemplate = new RestTemplate();

        String url = apiUrl + "?key=" + apiKey;

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            Map<String, Object> body = response.getBody();
            List<Map> candidates = (List<Map>) body.get("candidates");
            Map content = (Map) candidates.get(0).get("content");
            List<Map> parts = (List<Map>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            log.error("Gemini API error: {}", e.getMessage());
            return "{\"score\": 0, \"summary\": \"AI analysis unavailable\"}";
        }
    }
}
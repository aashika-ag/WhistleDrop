package com.whistledrop.whistledrop.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI whistleDropOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("WhistleDrop API")
                        .version("1.0")
                        .description(
                                "Anonymous confidential reporting API " +
                                "for submitting, tracking and managing reports."
                        ));
    }
}
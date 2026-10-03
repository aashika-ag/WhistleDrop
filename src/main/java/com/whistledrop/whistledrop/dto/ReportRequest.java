package com.whistledrop.whistledrop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ReportRequest {

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must not exceed 50 characters")
    private String category;

    @NotBlank(message = "Description is required")
    @Size(
            min = 10,
            max = 5000,
            message = "Description must be between 10 and 5000 characters"
    )
    private String description;

    @Size(
            max = 500,
            message = "Evidence URL must not exceed 500 characters"
    )
    private String evidenceUrl;

    public ReportRequest() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEvidenceUrl() {
        return evidenceUrl;
    }

    public void setEvidenceUrl(String evidenceUrl) {
        this.evidenceUrl = evidenceUrl;
    }
}
package com.whistledrop.whistledrop.dto;

import com.whistledrop.whistledrop.entity.ReportStatus;

import java.time.LocalDateTime;

public class ReportResponse {

    private Long id;
    private String caseCode;
    private String category;
    private String description;
    private String evidenceUrl;
    private ReportStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ReportResponse() {
    }

    public ReportResponse(
            Long id,
            String caseCode,
            String category,
            String description,
            String evidenceUrl,
            ReportStatus status,
            LocalDateTime createdAt,
            LocalDateTime updatedAt) {

        this.id = id;
        this.caseCode = caseCode;
        this.category = category;
        this.description = description;
        this.evidenceUrl = evidenceUrl;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaseCode() {
        return caseCode;
    }

    public void setCaseCode(String caseCode) {
        this.caseCode = caseCode;
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

    public ReportStatus getStatus() {
        return status;
    }

    public void setStatus(ReportStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
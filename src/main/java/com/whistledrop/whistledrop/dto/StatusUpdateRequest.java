package com.whistledrop.whistledrop.dto;

import com.whistledrop.whistledrop.entity.ReportStatus;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {

    @NotNull(message = "Status is required")
    private ReportStatus status;

    public StatusUpdateRequest() {
    }

    public ReportStatus getStatus() {
        return status;
    }

    public void setStatus(ReportStatus status) {
        this.status = status;
    }
}
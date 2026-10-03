package com.whistledrop.whistledrop.controller;

import com.whistledrop.whistledrop.dto.ReportResponse;
import com.whistledrop.whistledrop.dto.StatusUpdateRequest;
import com.whistledrop.whistledrop.entity.ReportStatus;
import com.whistledrop.whistledrop.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moderator")
public class ModeratorController {

    private final ReportService reportService;

    public ModeratorController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/reports")
    public List<ReportResponse> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/reports/status/{status}")
    public List<ReportResponse> getReportsByStatus(
            @PathVariable ReportStatus status) {

        return reportService.getReportsByStatus(status);
    }

    @GetMapping("/reports/category/{category}")
    public List<ReportResponse> getReportsByCategory(
            @PathVariable String category) {

        return reportService.getReportsByCategory(category);
    }

    @PatchMapping("/reports/{id}/status")
    public ReportResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        return reportService.updateStatus(
                id,
                request.getStatus()
        );
    }
}
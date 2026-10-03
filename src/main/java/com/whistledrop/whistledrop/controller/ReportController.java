package com.whistledrop.whistledrop.controller;

import com.whistledrop.whistledrop.dto.ReportRequest;
import com.whistledrop.whistledrop.dto.ReportResponse;
import com.whistledrop.whistledrop.dto.StatusUpdateRequest;
import com.whistledrop.whistledrop.entity.ReportStatus;
import com.whistledrop.whistledrop.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReportResponse createReport(
            @Valid @RequestBody ReportRequest request) {

        return reportService.createReport(request);
    }

    @GetMapping("/track/{caseCode}")
    public ReportResponse trackReport(
            @PathVariable String caseCode) {

        return reportService.getReportByCaseCode(caseCode);
    }

    @GetMapping
    public List<ReportResponse> getAllReports() {

        return reportService.getAllReports();
    }

    @GetMapping("/status/{status}")
    public List<ReportResponse> getByStatus(
            @PathVariable ReportStatus status) {

        return reportService.getReportsByStatus(status);
    }

    @GetMapping("/category/{category}")
    public List<ReportResponse> getByCategory(
            @PathVariable String category) {

        return reportService.getReportsByCategory(category);
    }

    @PatchMapping("/{id}/status")
    public ReportResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        return reportService.updateStatus(
                id,
                request.getStatus()
        );
    }
}
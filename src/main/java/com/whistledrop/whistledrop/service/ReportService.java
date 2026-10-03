package com.whistledrop.whistledrop.service;

import com.whistledrop.whistledrop.dto.ReportRequest;
import com.whistledrop.whistledrop.dto.ReportResponse;
import com.whistledrop.whistledrop.entity.Report;
import com.whistledrop.whistledrop.entity.ReportStatus;
import com.whistledrop.whistledrop.exception.InvalidStatusTransitionException;
import com.whistledrop.whistledrop.exception.ReportNotFoundException;
import com.whistledrop.whistledrop.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public ReportResponse createReport(ReportRequest request) {
        Report report = new Report();

        report.setCaseCode(generateCaseCode());
        report.setCategory(request.getCategory());
        report.setDescription(request.getDescription());
        report.setEvidenceUrl(request.getEvidenceUrl());
        report.setStatus(ReportStatus.SUBMITTED);

        return toResponse(reportRepository.save(report));
    }

    public ReportResponse getReportByCaseCode(String caseCode) {
        Report report = reportRepository.findByCaseCode(caseCode)
                .orElseThrow(() -> new ReportNotFoundException(
                        "No report found for the provided case code."
                ));

        return toResponse(report);
    }

    public List<ReportResponse> getAllReports() {
        return reportRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ReportResponse> getReportsByStatus(ReportStatus status) {
        return reportRepository.findByStatus(status)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ReportResponse> getReportsByCategory(String category) {
        return reportRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ReportResponse updateStatus(Long id, ReportStatus newStatus) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() ->
                        new ReportNotFoundException("Report not found."));

        validateStatusTransition(
                report.getStatus(),
                newStatus
        );

        report.setStatus(newStatus);

        return toResponse(reportRepository.save(report));
    }

    private void validateStatusTransition(
            ReportStatus currentStatus,
            ReportStatus newStatus) {

        if (currentStatus == newStatus) {
            throw new InvalidStatusTransitionException(
                    "Report is already in the " + newStatus + " status."
            );
        }

        boolean valid = switch (currentStatus) {
            case SUBMITTED ->
                    newStatus == ReportStatus.UNDER_REVIEW;

            case UNDER_REVIEW ->
                    newStatus == ReportStatus.RESOLVED ||
                    newStatus == ReportStatus.DISMISSED;

            case RESOLVED, DISMISSED ->
                    false;
        };

        if (!valid) {
            throw new InvalidStatusTransitionException(
                    "Invalid status transition from "
                            + currentStatus
                            + " to "
                            + newStatus
            );
        }
    }

    private ReportResponse toResponse(Report report) {
        return new ReportResponse(
                report.getId(),
                report.getCaseCode(),
                report.getCategory(),
                report.getDescription(),
                report.getEvidenceUrl(),
                report.getStatus(),
                report.getCreatedAt(),
                report.getUpdatedAt()
        );
    }

    private String generateCaseCode() {
        String characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        StringBuilder code = new StringBuilder();

        do {
            code.setLength(0);

            for (int i = 0; i < 12; i++) {
                code.append(
                        characters.charAt(
                                secureRandom.nextInt(
                                        characters.length()
                                )
                        )
                );
            }

        } while (reportRepository.existsByCaseCode(code.toString()));

        return code.toString();
    }
}
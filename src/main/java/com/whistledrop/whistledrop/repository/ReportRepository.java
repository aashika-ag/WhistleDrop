package com.whistledrop.whistledrop.repository;

import com.whistledrop.whistledrop.entity.Report;
import com.whistledrop.whistledrop.entity.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Optional<Report> findByCaseCode(String caseCode);

    List<Report> findByStatus(ReportStatus status);

    List<Report> findByCategoryIgnoreCase(String category);

    boolean existsByCaseCode(String caseCode);
}
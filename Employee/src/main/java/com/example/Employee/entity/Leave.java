package com.example.Employee.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "leaves")
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeName;
    private String leaveType;
    private String fromDate;
    private String toDate;
    private String reason;
    private int days;
    private String status;

    public Leave() {}

    public Leave(String employeeName, String leaveType, String fromDate, String toDate, String reason, int days, String status) {
        this.employeeName = employeeName;
        this.leaveType = leaveType;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
        this.days = days;
        this.status = status;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public String getLeaveType() { return leaveType; }
    public void setLeaveType(String leaveType) { this.leaveType = leaveType; }

    public String getFromDate() { return fromDate; }
    public void setFromDate(String fromDate) { this.fromDate = fromDate; }

    public String getToDate() { return toDate; }
    public void setToDate(String toDate) { this.toDate = toDate; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public int getDays() { return days; }
    public void setDays(int days) { this.days = days; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

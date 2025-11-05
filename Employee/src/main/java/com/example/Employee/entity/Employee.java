package com.example.Employee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String employeeId;  // e.g. EMP101, EMP102

    private String name;
    private String email;
    private String phone;
    private String department;
    private String role;
    private String address;
    private String gender;  // ✅ Added
    private LocalDate dob;
    private LocalDate joiningDate;
}

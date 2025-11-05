package com.example.Employee.service;

import com.example.Employee.entity.Employee;
import com.example.Employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return repository.findById(id);
    }

    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        if (updatedEmployee == null) {
            throw new IllegalArgumentException("Updated employee data cannot be null");
        }

        Employee existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

        try {
            if (updatedEmployee.getName() != null) existing.setName(updatedEmployee.getName());
            if (updatedEmployee.getEmail() != null) existing.setEmail(updatedEmployee.getEmail());
            if (updatedEmployee.getPhone() != null) existing.setPhone(updatedEmployee.getPhone());
            if (updatedEmployee.getDepartment() != null) existing.setDepartment(updatedEmployee.getDepartment());
            if (updatedEmployee.getAddress() != null) existing.setAddress(updatedEmployee.getAddress());
            if (updatedEmployee.getRole() != null) existing.setRole(updatedEmployee.getRole());
            if (updatedEmployee.getGender() != null) existing.setGender(updatedEmployee.getGender()); // ✅ Added
            if (updatedEmployee.getDob() != null) existing.setDob(updatedEmployee.getDob());
            if (updatedEmployee.getJoiningDate() != null) existing.setJoiningDate(updatedEmployee.getJoiningDate());
        } catch (Exception e) {
            throw new RuntimeException("Error updating employee fields: " + e.getMessage(), e);
        }

        return repository.save(existing);
    }

    public void deleteEmployee(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Employee not found with ID: " + id);
        }
        repository.deleteById(id);
    }
}

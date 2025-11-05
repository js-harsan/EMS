package com.example.Employee.service;

import com.example.Employee.entity.Leave;
import com.example.Employee.repository.LeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    private final LeaveRepository leaveRepository;

    public LeaveService(LeaveRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    public Leave addLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    // ✅ Update only the status field (Approve / Reject)
    public Leave updateLeaveStatus(Long id, String status) {
        Leave existingLeave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found with id: " + id));
        existingLeave.setStatus(status);
        return leaveRepository.save(existingLeave);
    }

    public void deleteLeave(Long id) {
        leaveRepository.deleteById(id);
    }

    public void deleteAllLeaves() {
        leaveRepository.deleteAll();
    }
}

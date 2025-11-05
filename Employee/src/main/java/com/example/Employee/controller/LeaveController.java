package com.example.Employee.controller;

import com.example.Employee.entity.Leave;
import com.example.Employee.service.LeaveService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    // ✅ Get all leaves
    @GetMapping
    public List<Leave> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    // ✅ Add new leave
    @PostMapping
    public Leave addLeave(@RequestBody Leave leave) {
        return leaveService.addLeave(leave);
    }

    // ✅ Update leave status (Approve / Reject)
    @PutMapping("/{id}")
    public Leave updateLeaveStatus(@PathVariable Long id, @RequestBody Leave updatedLeave) {
        return leaveService.updateLeaveStatus(id, updatedLeave.getStatus());
    }

    // ✅ Delete leave by ID
    @DeleteMapping("/{id}")
    public void deleteLeave(@PathVariable Long id) {
        leaveService.deleteLeave(id);
    }

    // ✅ Optional: Reset all leaves
    @DeleteMapping("/reset")
    public void deleteAllLeaves() {
        leaveService.deleteAllLeaves();
    }
}

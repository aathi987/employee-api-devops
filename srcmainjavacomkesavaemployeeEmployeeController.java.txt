package com.kesava.employee;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class EmployeeController {
    @GetMapping("/api/employees")
    public List<Employee> getEmployees() {
        return List.of(
            new Employee(1, "Kesavaraja"),
            new Employee(2, "DevOps Engineer")
        );
    }
}
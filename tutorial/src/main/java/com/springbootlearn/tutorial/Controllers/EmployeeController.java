package com.springbootlearn.tutorial.Controllers;

import com.springbootlearn.tutorial.DTO.EmployeeDTO;
import com.springbootlearn.tutorial.services.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    private final EmployeeService employeeService;

    @GetMapping(path = "employees/{id}")
    public EmployeeDTO getEmployeeById(@PathVariable Long id){
        return employeeService.getEmployeeById(id);
    }
    @GetMapping(path="/allEmployees")
    public List<EmployeeDTO> getAllEmployees(){
        return employeeService.getAllEmployees();
    }
    @PostMapping(path = "/employees")
    public EmployeeDTO createNewEmployee(@RequestBody EmployeeDTO employeeDTO){
        return employeeService.createNewEmployee(employeeDTO);
    }

    @DeleteMapping(path = "/employees/{id}")
    public String deleteEmployeeById(@PathVariable Long id) {
        return employeeService.deleteEmployeeById(id);
    }


//   @GetMapping(path = "/employees/{id}")
//    public EmployeeDTO getEmployee(@PathVariable Long id) {
//       return new EmployeeDTO(id,"Sarthak", LocalDate.of(2024,4,24),true);
//   }
}

package com.springbootlearn.tutorial.services;

import com.springbootlearn.tutorial.DTO.EmployeeDTO;
import com.springbootlearn.tutorial.Entities.EmployeeEntity;
import com.springbootlearn.tutorial.Repositories.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class EmployeeService {

    final EmployeeRepository employeeRepository;
    final ModelMapper modelMapper;

    public EmployeeService(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }




    public EmployeeDTO getEmployeeById(Long id){
       EmployeeEntity employeeEntity = employeeRepository.getById(id);
       return modelMapper.map(employeeEntity, EmployeeDTO.class);
    }

    public List<EmployeeDTO> getAllEmployees() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll(); // assuming employeeRepository is already autowired
        List<EmployeeDTO> employeeDTOList = new ArrayList<>();

        for (EmployeeEntity e : employeeEntities) {
            EmployeeDTO dto = new EmployeeDTO(
                    e.getId(),
                    e.getName(),
                    e.getDateofJoining(),
                    e.isActive()
            );
            employeeDTOList.add(dto);
        }

        return employeeDTOList;
    }

    public EmployeeDTO createNewEmployee(EmployeeDTO employeeDTO){
        EmployeeEntity employeeEntity = modelMapper.map(employeeDTO, EmployeeEntity.class);
        return modelMapper.map(employeeRepository.save(employeeEntity), EmployeeDTO.class);

    }

    public String deleteEmployeeById(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return "Employee with ID " + id + " has been deleted successfully.";
        } else {
            return "Employee with ID " + id + " not found.";
        }
    }
}

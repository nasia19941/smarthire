package com.nasia.smarthire.mapper;

import com.nasia.smarthire.dto.CompanyDTO;
import com.nasia.smarthire.dto.UserDTO;
import com.nasia.smarthire.model.Company;
import com.nasia.smarthire.model.Role;
import com.nasia.smarthire.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SmartHireMapperTest {

    private SmartHireMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new SmartHireMapper();
    }

    @Test
    void toCompanyDTO_ShouldMapAllFields() {
        Company company = new Company();
        company.setId(1L);
        company.setCompanyName("Netcompany");
        company.setWebsite("netcompany.gr");
        company.setDescription("IT Solutions");

        CompanyDTO dto = mapper.toCompanyDTO(company);

        assertEquals(1L, dto.getId());
        assertEquals("Netcompany", dto.getCompanyName());
        assertEquals("netcompany.gr", dto.getWebsite());
        assertEquals("IT Solutions", dto.getDescription());
    }

    @Test
    void toCompanyDTO_ShouldReturnNullWhenCompanyIsNull() {
        assertNull(mapper.toCompanyDTO(null));
    }

    @Test
    void toUserDTO_ShouldNotExposePassword() {
        User user = new User();
        user.setId(1L);
        user.setUsername("nasia");
        user.setEmail("nasia@smarthire.com");
        user.setPassword("secret123");
        user.setRole(Role.CANDIDATE);

        UserDTO dto = mapper.toUserDTO(user);

        assertEquals("nasia", dto.getUsername());
        assertEquals("nasia@smarthire.com", dto.getEmail());
        assertEquals(Role.CANDIDATE, dto.getRole());
    }

    @Test
    void toUserDTO_ShouldReturnNullWhenUserIsNull() {
        assertNull(mapper.toUserDTO(null));
    }
}
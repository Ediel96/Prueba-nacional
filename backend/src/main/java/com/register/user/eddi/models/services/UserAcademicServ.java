package com.register.user.eddi.models.services;

import com.register.user.eddi.models.entity.UserAcademic;

import java.util.List;


public interface UserAcademicServ {
    public List<UserAcademic> findAllByUser(Long id);

    public UserAcademic findById(Long id);

    public List<UserAcademic> findAll();

    public UserAcademic save(UserAcademic userAcademic);

    public void delete(Long id);
}

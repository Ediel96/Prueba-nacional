package com.register.user.eddi.models.services;

import com.register.user.eddi.models.dao.IUserAcademicDao;
import com.register.user.eddi.models.entity.UserAcademic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserAcademicImpServ implements UserAcademicServ {

    @Autowired
    private IUserAcademicDao iUserAcademicDao;

    @Override
    @Transactional(readOnly = true)
    public List<UserAcademic> findAllByUser(Long id) {
        return iUserAcademicDao.findAllByUser(id);
    }

    @Override
    public UserAcademic findById(Long id) {
        return iUserAcademicDao.findById(id).orElse(null);
    }

    @Override
    public List<UserAcademic> findAll() {
        return iUserAcademicDao.findAll();
    }

    @Override
    @Transactional
    public UserAcademic save(UserAcademic userAcademic) {
        return iUserAcademicDao.save(userAcademic);
    }

    @Override
    public void delete(Long id) {
            iUserAcademicDao.deleteById(id);
    }
}

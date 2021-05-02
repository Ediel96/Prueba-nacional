package com.register.user.eddi.models.services;

import com.register.user.eddi.models.dao.IUserDoa;
import com.register.user.eddi.models.entity.TypeDocument;
import com.register.user.eddi.models.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImpService implements UserService{


    @Autowired
    private IUserDoa userDoa;

    @Override
    public List<User> findAll() {
        return (List<User>) userDoa.findAll();
    }

    @Override
    public User findById(Long id) {
        return userDoa.findById(id).orElse(null);
    }

    @Override
    public User save(User user) {
        return userDoa.save(user);
    }

    @Override
    public void delete(Long id) {
            userDoa.deleteById(id);
    }

    @Override
    public List<TypeDocument> findAllDocumet() {
        return (List<TypeDocument>) userDoa.findAllByTypeDocument();
    }
}

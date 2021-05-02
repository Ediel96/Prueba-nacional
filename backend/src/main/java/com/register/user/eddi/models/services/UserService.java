package com.register.user.eddi.models.services;

import com.register.user.eddi.models.entity.TypeDocument;
import com.register.user.eddi.models.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public List<User> findAll();

    public User findById(Long id);

    public User save(User user);

    public void  delete(Long id);

    public List<TypeDocument> findAllDocumet();
}

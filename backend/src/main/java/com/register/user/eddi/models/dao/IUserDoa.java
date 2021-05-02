package com.register.user.eddi.models.dao;

import com.register.user.eddi.models.entity.TypeDocument;
import com.register.user.eddi.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IUserDoa extends JpaRepository<User, Long> {

//    @Query("from TypeDocument")
    @Query("select t from TypeDocument t" )
    public List<TypeDocument> findAllByTypeDocument();

}

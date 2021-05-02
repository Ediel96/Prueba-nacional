package com.register.user.eddi.models.dao;

import com.register.user.eddi.models.entity.User;
import com.register.user.eddi.models.entity.UserAcademic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IUserAcademicDao extends JpaRepository<UserAcademic, Long> {

//    @Query(value = "select  u from UserAcademic  u where u.user_id = ?1", nativeQuery = true)

//    @Query(value = "select * from user_academic where  u.", nativeQuery = true)
    @Query("select  u from UserAcademic u where u.user.id = ?1")
    public List<UserAcademic> findAllByUser(long id);

    public  UserAcademic findByUser(long id);
}

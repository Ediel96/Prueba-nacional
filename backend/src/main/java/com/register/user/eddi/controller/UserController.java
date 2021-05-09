package com.register.user.eddi.controller;


import com.register.user.eddi.models.entity.TypeDocument;
import com.register.user.eddi.models.entity.User;
import com.register.user.eddi.models.entity.UserAcademic;
import com.register.user.eddi.models.services.UserAcademicServ;
import com.register.user.eddi.models.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAcademicServ userAcademicServ;

    @GetMapping("/user")
    public List<User> index(){
        return userService.findAll();
    }

    @GetMapping("/type_document")
    public List<TypeDocument> indexDocument(){
        return userService.findAllDocumet();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        User user = null;
        Map<String , Object > response  = new HashMap<>();


        try {
            user = userService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje" , "Error al realizar la  cconsulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(user == null){
            response.put("mensaje" , "El cliente id: " .concat(id.toString().concat("no existe")));
            return  new ResponseEntity<Map<String , Object>>( response, HttpStatus.NOT_FOUND);
        }
        return  new ResponseEntity<User>(user , HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result){
        Map<String, Object> response = new HashMap<>();
        User userNew = null;

        if(result.hasErrors()){
            //Manejo de errores en java 11
            List<String> errros = new ArrayList<>();

            for(FieldError err: result.getFieldErrors()){
                errros.add("El campo " + err.getField()+ "' " + err.getDefaultMessage());
            }

            response.put("errors", errros);
            return  new ResponseEntity<Map <String, Object>>(response, HttpStatus.BAD_REQUEST);

        }

        try {
            userNew = userService.save(user);
        }catch (DataAccessException e){
            response.put("mensaje" , "Error al realizar la  consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido creado el insert en la base de datos");
        response.put("cliente", userNew);
        return new ResponseEntity<Map <String, Object> >(response, HttpStatus.CREATED);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody User user, BindingResult result , @PathVariable Long id){
        User userAct = userService.findById(id);
        Map<String, Object> response = new HashMap<>();

        if(result.hasErrors()){
            //Manejo de errores en java 11
            List<String> errros = new ArrayList<>();

            for(FieldError err: result.getFieldErrors()){
                errros.add("El campo " + err.getField()+ "' " + err.getDefaultMessage());
            }

            response.put("errors", errros);
            return  new ResponseEntity<Map <String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if(userAct == null){
            response.put("mensaje", "Error: no pudo editar, el ciente ID : " .concat(id.toString().concat(" no existe en la base de datos")));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.NOT_FOUND);
        }

        User userUpdate = null;

        try {
            userAct.setFirstName(user.getFirstName());
            userAct.setLastName(user.getLastName());
            userAct.setAndress(user.getAndress());
            userAct.setAndress(user.getAndress());
            userAct.setDateOfBirth(user.getDateOfBirth());
            userAct.setTypeDocument(user.getTypeDocument());

            userUpdate = userService.save(userAct);

        }catch (DataAccessException e){
            response.put("mensaje" , "Error al actualizar la base de datos");
            response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity <Map <String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El usuario ha sido actualizado con exito");
        response.put("user", userUpdate);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> delete (@PathVariable Long id){
        Map<String, Object> response = new HashMap<>();

        try {
            User user = userService.findById(id);

            userService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje" , "Error al eliminar en la base de datos ");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "se eliminado correctamente el usuario");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/user_academy")
    public List<UserAcademic> indexAllAcademy(){
        return userAcademicServ.findAll();
    }

    @GetMapping("/user_academy/{id_user}")
    public ResponseEntity<?> indexAcademy(@PathVariable Long id_user){
        Map<String, Object> response = new HashMap<>();
        List<UserAcademic> userAcademic = null;

        try {
            userAcademic = userAcademicServ.findAllByUser(id_user);
        }catch (DataAccessException e){
            response.put("mensaje" , "Error el Usuario no existe");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido creado el insert en la base de datos");
        response.put("user", userAcademic);
        return new ResponseEntity<Map <String, Object> >(response, HttpStatus.CREATED);
    }

    @PostMapping("/user_academy/{id_user}")
    public ResponseEntity<?> saveAcademy(@Valid @RequestBody UserAcademic userAcademic, BindingResult result , @PathVariable Long id_user){
        Map<String, Object> response = new HashMap<>();
        UserAcademic userAcademicNew = null;
        User user = null;

        user = userService.findById(id_user);
        if(user == null){
            response.put("mensaje", "El  Usuario ID: ".concat(id_user.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            userAcademic.setUser(user);
            userAcademicNew = (UserAcademic) userAcademicServ.save(userAcademic);
        }catch (DataAccessException e){
            response.put("mensaje" , "Error el Usuario no existe");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido creado el insert en la base de datos");
        response.put("user", userAcademic);
        return new ResponseEntity<Map <String, Object> >(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/user_academy/{id}")
    public  ResponseEntity <?> deleteAcademy(@PathVariable Long id){
        Map<String, Object> response = new HashMap<>();
        List<UserAcademic> userAcademic = null;

        try {
            UserAcademic userAcademicNew = userAcademicServ.findById(id);

            userAcademicServ.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el cliente de la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente eliminado con éxito!");

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
}

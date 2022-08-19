package tech.empresta.backend.api._Private;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.empresta.backend.response.Response;
import tech.empresta.backend.role.Role;
import tech.empresta.backend.user.User;
import tech.empresta.backend.user.UserDTO;
import tech.empresta.backend.user.UserDTOupdate;
import tech.empresta.backend.user.UserService;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@AllArgsConstructor
@RestController
@RequestMapping("/v1/private")
public class UserController {
    private final UserService userService;

    private final ModelMapper modelMapper;

    @GetMapping("/users")
    public ResponseEntity<Response<List<User>>> getUsers() {

        Response<List<User>> response = new Response<>();

        response.setData(userService.getUsers());

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/user/id/{userId}")
    public ResponseEntity<Response<User>> getOneUserById(@PathVariable("userId") Long userId) {

        Response<User> response = new Response<>();

        response.setData(userService.getUserById(userId));

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/user/username/{email}/{id}")
    public ResponseEntity<Response<User>> getOneUserByUsernameAndId(@PathVariable("email") String email,
                                                                    @PathVariable("id") Long id) {

        Response<User> response = new Response<>();

        User user = userService.getUserByEmailAndId(email,id);

        response.setData(user);

        return ResponseEntity.ok().body(response);
    }

    // TODO: disable in production
    @PostMapping("/user/save")
    public ResponseEntity<Response<UserDTO>> saveUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        Response<UserDTO> response = new Response<>();

        if (result.hasErrors()){
            result.getAllErrors().forEach( e -> response.getErrors().add(e.getDefaultMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        User user = userService.saveUser(toEntity(userDTO));

        response.setData(toDto(user));

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/v1/private/user/save").toUriString());


        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/create/user")
    public ResponseEntity<Response<UserDTO>> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        Response<UserDTO> response = new Response<>();

        if (result.hasErrors()){
            result.getAllErrors().forEach( e -> response.getErrors().add(e.getDefaultMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        User user = userService.saveUser(toEntity(userDTO));

        response.setData(toDto(user));

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/v1/private/create/user").toUriString());

        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/update/user/{userId}")
    public ResponseEntity<Response<User>> updateUser(
            @PathVariable("userId") Long userId,
            @RequestBody UserDTOupdate userDTOupdate, BindingResult result) {

        Response<User> response = new Response<>();

        if (result.hasErrors()){
            result.getAllErrors().forEach( e -> response.getErrors().add(e.getDefaultMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        User user = userService.getUserById(userId);

        userDTOupdate.setId(userId);
        userDTOupdate.setEmail(user.getEmail());
        userDTOupdate.setPassword(user.getPassword());

        User userUpdated = userService.saveUser(toEntity(userDTOupdate));

        response.setData(userUpdated);

        return ResponseEntity.accepted().body(response);
    }

    @PostMapping("/role/save")
    public ResponseEntity<Response<Role>> saveRole(@RequestBody Role role, BindingResult result) {

        Response<Role> response = new Response<>();

        if (result.hasErrors()){
            result.getAllErrors().forEach( e -> response.getErrors().add(e.getDefaultMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.setData(userService.saveRole(role));

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/v1/private/role/save").toUriString());

        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/role/attach")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form, BindingResult result) {

        Response<?> response = new Response<>();

        if (result.hasErrors()){
            result.getAllErrors().forEach( e -> response.getErrors().add(e.getDefaultMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        userService.addRoleToUser(form.getEmail(), form.getRoleName()) ;

        return ResponseEntity.ok().body(response.getErrors());
    }
    private UserDTO toDto(User user){
        return modelMapper.map(user, UserDTO.class);
    }
    private UserDTOupdate toDtoUpdate(User user){
        return modelMapper.map(user, UserDTOupdate.class);
    }
    private User toEntity(UserDTO userDTO){
        return modelMapper.map(userDTO, User.class);
    }private User toEntity(UserDTOupdate userDTO){
        return modelMapper.map(userDTO, User.class);
    }

}

@Data
class RoleToUserForm{
    private String email;
    private String roleName;
}

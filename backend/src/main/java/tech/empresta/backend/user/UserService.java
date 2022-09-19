package tech.empresta.backend.user;

import tech.empresta.backend.role.Role;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */
public interface UserService {
    ArrayList<String> isNotEmailTaken(String userEmail);
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String email, String roleName);
    User getUserByEmailAndId(String email, Long id);
    User getUserByEmail(String email);
    User getUserById(Long id);

    // TODO: paginate
    List<User> getUsers();
    String signUpUser(User user);
    int enableUser(String email);
    void resendEmail(User user, String token);
}

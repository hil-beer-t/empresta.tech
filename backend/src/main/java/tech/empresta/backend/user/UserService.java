package tech.empresta.backend.user;

import tech.empresta.backend.role.Role;

import java.util.List;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */
public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String email, String roleName);
    User getUser(String username);

    User getUserById(Long id);

    // TODO: paginate
    List<User> getUsers();
}

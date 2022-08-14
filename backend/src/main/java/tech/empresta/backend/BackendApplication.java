package tech.empresta.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import tech.empresta.backend.role.Role;
import tech.empresta.backend.user.User;
import tech.empresta.backend.user.UserService;

import java.util.ArrayList;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService userService){
		return args -> {
			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));
			userService.saveRole(new Role(null, "ROLE_MANAGER"));
			userService.saveRole(new Role(null, "ROLE_AUDITOR"));
			userService.saveRole(new Role(null, "ROLE_CSC"));

			userService.saveUser(new User(null, "John","John Plink", "elias@gmail.com", "123321", new ArrayList<Role>()));
			userService.saveUser(new User(null, "JohnS","John Sand", "sand@gmail.com", "123321", new ArrayList<Role>()));
			userService.saveUser(new User(null, "JohnC","John Craw", "craw@gmail.com", "123321", new ArrayList<Role>()));
			userService.saveUser(new User(null, "JohnQ","John Queue", "queue@gmail.com", "123321", new ArrayList<Role>()));

			userService.addRoleToUser("elias@gmail.com", "ROLE_USER");
			userService.addRoleToUser("sand@gmail.com", "ROLE_ADMIN");
			userService.addRoleToUser("craw@gmail.com", "ROLE_MANAGER");
			userService.addRoleToUser("craw@gmail.com", "ROLE_AUDITOR");
			userService.addRoleToUser("queue@gmail.com", "ROLE_SAC");
		};
	}
}

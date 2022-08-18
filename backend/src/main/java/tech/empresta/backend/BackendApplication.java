package tech.empresta.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
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

			userService.saveUser(new User( "JohnQ","John Queue", "elias@gmail.com", "123321", new ArrayList<>()));
			userService.saveUser(new User( "JohnD","John Queue", "sand@gmail.com", "123321", new ArrayList<>()));
			userService.saveUser(new User( "JohnF","John Queue", "craw@gmail.com", "123321", new ArrayList<>()));
			userService.saveUser(new User( "JohnAS","John Queue", "queue@gmail.com", "123321", new ArrayList<>()));

			userService.enableUser("elias@gmail.com");
			userService.enableUser("sand@gmail.com");
			userService.enableUser("craw@gmail.com");
			userService.enableUser("queue@gmail.com");

			userService.addRoleToUser("elias@gmail.com", "ROLE_USER");
			userService.addRoleToUser("sand@gmail.com", "ROLE_ADMIN");
			userService.addRoleToUser("craw@gmail.com", "ROLE_MANAGER");
			userService.addRoleToUser("craw@gmail.com", "ROLE_AUDITOR");
			userService.addRoleToUser("queue@gmail.com", "ROLE_SAC");
		};
	}
}

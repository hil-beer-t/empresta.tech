package tech.empresta.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import tech.empresta.backend.security.filter.CustomAuthenticationFilter;
import tech.empresta.backend.security.filter.CustomAuthorizationFilter;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

/**
 * @author Hilbert Digenio ON 14/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@Configuration @EnableWebSecurity @RequiredArgsConstructor @EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests().antMatchers("/signup/**").permitAll();
        http.authorizeRequests().antMatchers("/login/**").permitAll();

        http.authorizeRequests().antMatchers(GET, "/v*/private/users").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers(GET, "/v*/private/loans")
            .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_AUDITOR");

        http.authorizeRequests().antMatchers(POST, "/v*/private/create/user").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers(POST, "/v*/private/update/user/**").hasAnyAuthority("ROLE_ADMIN");

        http.authorizeRequests().antMatchers(POST, "/v*/private/create/loan/**")
                .hasAnyAuthority(
                        "ROLE_ADMIN", "ROLE_USER", "ROLE_AUDITOR", "ROLE_SCS", "ROLE_MANAGER");

        // TODO: user should not have rights to change some status
        http.authorizeRequests().antMatchers(GET, "/v*/private/change/loan/status/**")
                .hasAnyAuthority(
                        "ROLE_ADMIN", "ROLE_USER", "ROLE_AUDITOR", "ROLE_SCS", "ROLE_MANAGER");

        // Em tese, qualquer pessoa com ROLE_USER poderia dar pegar informações dos outros usuários se souber o ID e
        // EMAIL
        http
                .authorizeRequests()
                .antMatchers(GET, "/v*/private/user/**")
                .hasAnyAuthority(
                        "ROLE_ADMIN", "ROLE_USER", "ROLE_AUDITOR", "ROLE_SCS", "ROLE_MANAGER");

        http
                .authorizeRequests()
                .antMatchers(GET, "/v*/private/loan/**")
                .hasAnyAuthority(
                        "ROLE_ADMIN", "ROLE_USER", "ROLE_AUDITOR", "ROLE_SCS", "ROLE_MANAGER");

        http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

}

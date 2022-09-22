package tech.empresta.backend.api._Public;

import lombok.AllArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.empresta.backend.response.Response;
import tech.empresta.backend.signup.SignUpRequest;
import tech.empresta.backend.signup.SignUpService;

import java.net.URI;

/**
 * @author Hilbert Digenio ON 14/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@AllArgsConstructor
@RestController
@RequestMapping("/signup")
public class SignUpController {

    private final SignUpService signUpService;

    @PostMapping
    public ResponseEntity<Response<String>> signUp(@RequestBody SignUpRequest request){

        Response<String> response = new Response<>();

        response.setData(signUpService.register(request));

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/signup").toUriString());

        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return signUpService.confirmToken(token);
    }

}

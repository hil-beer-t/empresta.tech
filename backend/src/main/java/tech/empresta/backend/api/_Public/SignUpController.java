package tech.empresta.backend.api._Public;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tech.empresta.backend.signup.SignUpRequest;
import tech.empresta.backend.signup.SignUpService;

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
    public String signUp(@RequestBody SignUpRequest request){
        return signUpService.register(request);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return signUpService.confirmToken(token);
    }

}

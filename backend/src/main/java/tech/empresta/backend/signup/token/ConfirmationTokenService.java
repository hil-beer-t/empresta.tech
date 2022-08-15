package tech.empresta.backend.signup.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tech.empresta.backend.user.User;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * @author Hilbert Digenio ON 18/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */

@AllArgsConstructor
@Service
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;
    public void saveConfirmationToken (ConfirmationToken confirmationToken){
        confirmationTokenRepository.save(confirmationToken);
    }
    public Optional<ConfirmationToken> getToken(String token){
        return confirmationTokenRepository.findByToken(token);
    }

    public ConfirmationToken getTokenByUser(User user){
        return confirmationTokenRepository.findByUser(user);
    }
    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}

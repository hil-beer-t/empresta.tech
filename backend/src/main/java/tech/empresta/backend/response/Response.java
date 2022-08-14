package tech.empresta.backend.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hilbert Digenio ON 11/08/2022
 * @version 0.0.1-SNAPSHOT
 * @project empresta.tech
 */
@Getter
@Setter
@NoArgsConstructor
public class Response<T> {

    private T data;
    private List<String> errors;

    public List<String> getErrors() {
        if (this.errors == null){
            this.errors = new ArrayList<String>();
        }
        return errors;
    }

}
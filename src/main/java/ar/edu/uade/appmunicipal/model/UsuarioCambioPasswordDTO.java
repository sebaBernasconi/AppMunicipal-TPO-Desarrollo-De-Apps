package ar.edu.uade.appmunicipal.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UsuarioCambioPasswordDTO {
    private String dni;
    private String oldPassword;
    private String newPassword;
}

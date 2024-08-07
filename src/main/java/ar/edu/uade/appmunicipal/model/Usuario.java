package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Base64;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    private String dni; //usuario

    private String password;

    private String email;

    @Column(name = "tipo_usuario")
    private String tipoUsuario;

    @Lob
    @JsonIgnore
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imagenPerfil;

    @Column(name = "cambios_en_reclamos")
    private boolean cambiosEnReclamos;

    @Column(name = "cambios_en_denuncias")
    private boolean cambiosEnDenuncias;

    @Column(name = "espera_confirmacion")
    @JsonIgnore
    private boolean esperaConfirmacion;

    @JsonProperty("imagenPerfil")
    public String getImagenLocalBase64() {
        if (imagenPerfil == null) {
            return null;
        }
        return Base64.getEncoder().encodeToString(this.imagenPerfil);
    }
}

package ar.edu.uade.appmunicipal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Nullable
    @JsonIgnore
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imagenPerfil;
}

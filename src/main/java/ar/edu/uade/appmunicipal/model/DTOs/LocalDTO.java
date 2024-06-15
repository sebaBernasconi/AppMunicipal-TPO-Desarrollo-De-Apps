package ar.edu.uade.appmunicipal.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocalDTO {
    private String nombre;

    private Integer idVecino;

    private Integer idRubro;

    private String promocion;

    private String contacto;

    private String descripcion;
}

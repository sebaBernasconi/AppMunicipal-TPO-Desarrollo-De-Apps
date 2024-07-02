package ar.edu.uade.appmunicipal.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovimientoReclamoDTO {

    private Integer idReclamo;
    private Integer legajoPersonalMunicipal;
    private String causa;
    private String nuevoEstado;
}

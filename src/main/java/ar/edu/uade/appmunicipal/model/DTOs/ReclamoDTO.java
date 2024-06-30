package ar.edu.uade.appmunicipal.model.DTOs;


import ar.edu.uade.appmunicipal.model.Sitio;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ReclamoDTO {

    private Integer idVecino;

    private Sitio sitio;

    private DesperfectoDTO desperfecto;

    private String descripcion;

}

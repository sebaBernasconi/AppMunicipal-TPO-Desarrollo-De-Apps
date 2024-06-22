package ar.edu.uade.appmunicipal.model.DTOs;


import ar.edu.uade.appmunicipal.model.Desperfecto;
import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.model.Sitio;
import ar.edu.uade.appmunicipal.model.Vecino;
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

    private Integer idPersonalMunicipal;

    private Integer idSitio;

    private Integer idDesperfecto;

    private String descripcion;

    private String estado;

}

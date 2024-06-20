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

    private Vecino vecino;

    private PersonalMunicipal personalMunicipal;

    private Sitio sitio;

    private Desperfecto desperfecto;

    private String descripcion;

    private String estado;

}

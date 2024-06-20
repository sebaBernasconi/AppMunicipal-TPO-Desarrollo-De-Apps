package ar.edu.uade.appmunicipal.model.DTOs;

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

public class DenunciaDTO {

    private Vecino vecino;

    private Sitio sitio;

    private String descripcion;

    private String estado;

    private boolean aceptaResponsabilidad;
}

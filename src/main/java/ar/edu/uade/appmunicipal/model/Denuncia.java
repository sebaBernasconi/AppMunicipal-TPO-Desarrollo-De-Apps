package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "denuncias")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_denuncia")
    private Integer idDenuncia;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dni")
    private Vecino vecino;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_sitio")
    private Sitio sitio;

    @Column(name = "descripcion")
    private String descripcion;

    //Transformar en enumeracion(?
    //Patron state?(jodaaaa)
    @Column(name = "estado")
    private String estado;

    @Column(name = "acepta_responsabilidad")
    private boolean aceptaResponsabilidad;

    //ToString

    @Override
    public String toString() {
        return "Denuncia{" +
                "idDenuncia=" + idDenuncia +
                ", vecino=" + vecino +
                ", sitio=" + sitio +
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                ", aceptaResponsabilidad=" + aceptaResponsabilidad +
                '}';
    }
}

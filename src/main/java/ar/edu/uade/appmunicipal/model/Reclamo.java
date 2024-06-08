package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "reclamos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para persistencia
public class Reclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reclamo")
    private Integer idReclamo;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dni_vecino")
    private Vecino vecino;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "legajo")
    private PersonalMunicipal personalMunicipal;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_sitio")
    private Sitio sitio;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_desperfecto")
    private Desperfecto desperfecto;

    @Column(name = "descripcion")
    private String descripcion;

    //Transformar en enumeracion(?
    //Patron state?(jodaaaa)
    @Column(name = "estado")
    private String estado;

    @Column(name = "id_reclamo_unificado")
    private  Integer idReclamoUnificado;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_movimiento")
    private List<MovimientoReclamo>movimientosDelReclamo;


    //Metodos de la clase
    /*
    * actualizar estado
    * asignar personal municipal
    * asignar fotos + atributo(clase img + limite de 7 imgs)*/

    public void actualizarEstado (String nuevoEstado){
        this.estado = nuevoEstado;
    }

    public void asignarPersonalMunicipal(PersonalMunicipal personalMunicipalAsignado){
        this.personalMunicipal = personalMunicipalAsignado;
    }
    //ToString

    @Override
    public String toString() {
        return "Reclamo{" +
                "idReclamo=" + idReclamo +
                ", vecino=" + vecino +
                ", personalMunicipal=" + personalMunicipal +
                ", sitio=" + sitio +
                ", desperfecto=" + desperfecto +
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                ", movimientosDelReclamo=" + movimientosDelReclamo +
                '}';
    }
}

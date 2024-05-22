package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "reclamos")
public class Reclamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reclamo")
    private int idReclamo;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "dni_vecino")
    private Vecino vecino;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "legajo")
    private PersonalMunicipal personalMunicipal;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "id_sitio")
    private Sitio sitio;

    @OneToOne(cascade = CascadeType.ALL)
    @Column(name = "id_desperfecto")
    private Desperfecto desperfecto;

    @Column(name = "descripcion")
    private String descripcion;

    //Transformar en enumeracion(?
    //Patron state?(jodaaaa)
    @Column(name = "estado")
    private String estado;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name = "reclamo_unificado",
    joinColumns = @JoinColumn(name = "id_reclamo"),
            inverseJoinColumns = @JoinColumn(name = "id_movimiento"))
    private List<MovimientoReclamo>movimientosDelReclamo;

    


}

package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "desperfectos")

@Getter
@Setter
@AllArgsConstructor //Constructor
@NoArgsConstructor //Constructor vacio para la persistencia
public class Desperfecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_desperfecto")
    private Integer idDesperfecto;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_rubro")
    private Rubro rubro;

    @Column(name = "descripcion")
    private String descripcion;

    //ToString

    @Override
    public String toString() {
        return "Desperfecto{" +
                "idDesperfecto=" + idDesperfecto +
                ", rubro=" + rubro +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}

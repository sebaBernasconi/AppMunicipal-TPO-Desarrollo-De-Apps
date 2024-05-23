package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rubros")
public class Rubro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rubro")
    private Integer idRubro;

    @Column(name = "descripcion")
    private String descripcion;

    //Constructor

    public Rubro(int idRubro, String descripcion) {
        this.idRubro = idRubro;
        this.descripcion = descripcion;
    }

    //Constructor vacio para la persistencia

    public Rubro() {
    }

    //Getters y Setters

    public int getIdRubro() {
        return idRubro;
    }

    public void setIdRubro(int idRubro) {
        this.idRubro = idRubro;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    //ToString

    @Override
    public String toString() {
        return "Rubro{" +
                "idRubro=" + idRubro +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}

package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "desperfectos")
public class Desperfecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_desperfecto")
    private int idDesperfecto;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "id_rubro")
    private Rubro rubro;

    @Column(name = "descripcion")
    private String descripcion;

    //Constructor
    public Desperfecto(int idDesperfecto, Rubro rubro, String descripcion) {
        this.idDesperfecto = idDesperfecto;
        this.rubro = rubro;
        this.descripcion = descripcion;
    }

    //Constructor vacio para la persistencia
    public Desperfecto() {
    }

    //Getters y Setters

    public int getIdDesperfecto() {
        return idDesperfecto;
    }

    public void setIdDesperfecto(int idDesperfecto) {
        this.idDesperfecto = idDesperfecto;
    }

    public Rubro getRubro() {
        return rubro;
    }

    public void setRubro(Rubro rubro) {
        this.rubro = rubro;
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
        return "Desperfecto{" +
                "idDesperfecto=" + idDesperfecto +
                ", rubro=" + rubro +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }
}

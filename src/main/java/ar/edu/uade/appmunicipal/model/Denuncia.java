package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "denuncias")
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_denuncia")
    private int idDenuncia;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "dni_vecino")
    private Vecino vecino;

    @ManyToOne(cascade = CascadeType.ALL)
    @Column(name = "id_sitio")
    private Sitio sitio;

    @Column(name = "descripcion")
    private String descripcion;

    //Transformar en enumeracion(?
    //Patron state?(jodaaaa)
    @Column(name = "estado")
    private String estado;

    @Column(name = "acepta_responsabilidad")
    private boolean aceptaResponsabilidad;

    //Constructor
    public Denuncia(int idDenuncia, Vecino vecino, Sitio sitio, String descripcion,
                    String estado, boolean aceptaResponsabilidad) {
        this.idDenuncia = idDenuncia;
        this.vecino = vecino;
        this.sitio = sitio;
        this.descripcion = descripcion;
        this.estado = estado;
        this.aceptaResponsabilidad = aceptaResponsabilidad;
    }

    //Constructor vacio para la persistencia

    public Denuncia() {
    }

    //Getters y Setters

    public int getIdDenuncia() {
        return idDenuncia;
    }

    public void setIdDenuncia(int idDenuncia) {
        this.idDenuncia = idDenuncia;
    }

    public Vecino getVecino() {
        return vecino;
    }

    public void setVecino(Vecino vecino) {
        this.vecino = vecino;
    }

    public Sitio getSitio() {
        return sitio;
    }

    public void setSitio(Sitio sitio) {
        this.sitio = sitio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public boolean isAceptaResponsabilidad() {
        return aceptaResponsabilidad;
    }

    public void setAceptaResponsabilidad(boolean aceptaResponsabilidad) {
        this.aceptaResponsabilidad = aceptaResponsabilidad;
    }

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

package ar.edu.uade.appmunicipal.model;

import jakarta.persistence.*;

@Entity
@Table(name = "local")
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_local")
    private Integer idLocal;

    @ManyToOne
    @JoinColumn(name = "id_vecino")
    private Vecino vecino;

    @ManyToOne
    @JoinColumn(name = "id_rubro")
    private Rubro rubro;

    @OneToOne
    @JoinColumn(name = "id_sitio")
    private Sitio sitio;

    @OneToOne
    @Column(name = "id_promocion")
    private Promocion promocion;

    @Column(name = "contacto")
    private String contacto;




    //Constructor

    public Local(Integer idLocal, Vecino vecino, Rubro rubro, Sitio sitio, Promocion promocion,
                 String contacto) {
        this.idLocal = idLocal;
        this.vecino = vecino;
        this.rubro = rubro;
        this.sitio = sitio;
        this.promocion = promocion;
        this.contacto = contacto;

    }

    //Constructor vacio para la persistencia

    public Local() {
    }

    //Getters y Setters

    public Integer getIdLocal() {
        return idLocal;
    }

    public void setIdLocal(Integer idLocal) {
        this.idLocal = idLocal;
    }

    public Vecino getVecino() {
        return vecino;
    }

    public void setVecino(Vecino vecino) {
        this.vecino = vecino;
    }

    public Rubro getRubro() {
        return rubro;
    }

    public void setRubro(Rubro rubro) {
        this.rubro = rubro;
    }

    public Sitio getSitio() {
        return sitio;
    }

    public void setSitio(Sitio sitio) {
        this.sitio = sitio;
    }

    public Promocion getPromocion() {
        return promocion;
    }

    public void setPromocion(Promocion promocion) {
        this.promocion = promocion;
    }

    public String getContacto() {
        return contacto;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    //ToString

    @Override
    public String toString() {
        return "Local{" +
                "idLocal=" + idLocal +
                ", vecino=" + vecino +
                ", rubro=" + rubro +
                ", sitio=" + sitio +
                ", contacto='" + contacto + '\'' +
                '}';
    }
}

package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Reclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReclamoRepository extends JpaRepository<Reclamo,Integer> {

    List<Reclamo>findReclamoByVecino(int dni);
    List<Reclamo>findReclamoByPersonalMunicipal(int legajo);
    List<Reclamo>findReclamoBySitio(int idSitio);
    List<Reclamo>findReclamoByDesperfecto(int idDesperfecto);
    List<Reclamo>findReclamoByEstado(String estado);

}

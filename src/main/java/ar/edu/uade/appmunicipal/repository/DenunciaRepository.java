package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia,Integer> {

    List<Denuncia>findDenunciaByVecino(int dni);
    List<Denuncia>findDenunciaBySitio(int idSitio);
    List<Denuncia>findDenunciaByEstado(String estado);
}

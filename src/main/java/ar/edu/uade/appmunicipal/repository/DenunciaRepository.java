package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Denuncia;
import ar.edu.uade.appmunicipal.model.Vecino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia,Integer> {

    List<Denuncia>findAllByVecino(Vecino vecino);

}

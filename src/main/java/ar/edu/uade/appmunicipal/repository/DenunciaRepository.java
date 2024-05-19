package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia,Integer> {
}

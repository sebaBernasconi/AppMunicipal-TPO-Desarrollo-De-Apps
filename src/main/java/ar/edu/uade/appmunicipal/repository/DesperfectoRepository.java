package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Desperfecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesperfectoRepository extends JpaRepository<Desperfecto, Integer> {
}

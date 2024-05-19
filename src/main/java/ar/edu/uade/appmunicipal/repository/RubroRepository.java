package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Rubro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RubroRepository extends JpaRepository<Rubro,Integer> {
}

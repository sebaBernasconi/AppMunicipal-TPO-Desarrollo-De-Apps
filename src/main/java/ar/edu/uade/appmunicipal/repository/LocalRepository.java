package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends JpaRepository<Local,Integer> {
}

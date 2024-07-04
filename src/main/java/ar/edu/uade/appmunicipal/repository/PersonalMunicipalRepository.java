package ar.edu.uade.appmunicipal.repository;

import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalMunicipalRepository extends JpaRepository<PersonalMunicipal,Integer> {
    Optional<PersonalMunicipal> findPersonalMunicipalByDni(Integer dni);
}

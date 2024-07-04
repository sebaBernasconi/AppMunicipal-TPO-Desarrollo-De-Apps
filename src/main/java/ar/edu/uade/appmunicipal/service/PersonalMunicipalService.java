package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.repository.PersonalMunicipalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class PersonalMunicipalService {

    @Autowired
    PersonalMunicipalRepository personalMunicipalRepository;

    public List<PersonalMunicipal>listarPersonalMunicipal(){
        return personalMunicipalRepository.findAll();
    }

    public PersonalMunicipal buscarEmpleadoMunicipal(Integer dni){
        Optional<PersonalMunicipal>empleado = personalMunicipalRepository.findPersonalMunicipalByDni(dni);
        return empleado.orElse(null);
    }
}

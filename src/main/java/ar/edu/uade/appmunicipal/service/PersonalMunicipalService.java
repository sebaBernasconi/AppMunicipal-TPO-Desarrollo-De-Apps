package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.repository.PersonalMunicipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalMunicipalService {

    @Autowired
    PersonalMunicipalRepository personalMunicipalRepository;

    public List<PersonalMunicipal>listarPersonalMunicipal(){
        return personalMunicipalRepository.findAll();
    }

    public PersonalMunicipal buscarEmpleadoMunicipal(int legajo){
        Optional<PersonalMunicipal>empleado = personalMunicipalRepository.findById(legajo);
        return empleado.orElse(null);
    }
}

package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.DTOs.ReclamoDTO;
import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.model.Reclamo;
import ar.edu.uade.appmunicipal.model.Sitio;
import ar.edu.uade.appmunicipal.model.Vecino;
import ar.edu.uade.appmunicipal.repository.PersonalMunicipalRepository;
import ar.edu.uade.appmunicipal.repository.ReclamoRepository;
import ar.edu.uade.appmunicipal.repository.SitioRepository;
import ar.edu.uade.appmunicipal.repository.VecinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamoService {

    @Autowired
    ReclamoRepository reclamoRepository;

    @Autowired
    VecinoRepository vecinoRepository;

    @Autowired
    PersonalMunicipalRepository personalMunicipalRepository;

    @Autowired
    SitioRepository sitioRepository;

    public List<Reclamo>listarReclamos(){
        return reclamoRepository.findAll();
    }

    /*
  public List<Reclamo>listarReclamosPorVecino(int dni){
      return reclamoRepository.findReclamoByVecino(dni);
  }


  public List<Reclamo>listarReclamosPorEmpleadoMunicipal(int legajo){
      return reclamoRepository.findReclamoByPersonalMunicipal(legajo);
  }

  public List<Reclamo>listarReclamosPorSitio(int idSitio){
      return reclamoRepository.findReclamoBySitio(idSitio);
  }

  public List<Reclamo>listarReclamosPorDesperfecto(int idDesperfecto){
      return reclamoRepository.findReclamoByDesperfecto(idDesperfecto);
  }

  public List<Reclamo>listarReclamosPorEstado(String estado){
      return reclamoRepository.findReclamoByEstado(estado);
  }
  */
    public Reclamo buscarReclamo(int idReclamo){
        Optional<Reclamo>reclamo = reclamoRepository.findById(idReclamo);
        return reclamo.orElse(null);
    }

    public Reclamo guardarReclamo(ReclamoDTO reclamoDTO){
        Optional<Vecino> vecinoOptional = vecinoRepository.findById(reclamoDTO.getVecino().getDni());
        Optional<PersonalMunicipal> personalMunicipalOptional =
                personalMunicipalRepository.findById(reclamoDTO.getPersonalMunicipal().getDni());
        Reclamo reclamo = new Reclamo();

        reclamo.setVecino(vecinoOptional.get());
        reclamo.setPersonalMunicipal(personalMunicipalOptional.get());
        reclamo.setSitio(reclamoDTO.getSitio());
        reclamo.setDesperfecto(reclamoDTO.getDesperfecto());
        reclamo.setDescripcion(reclamoDTO.getDescripcion());
        reclamo.setEstado(reclamoDTO.getEstado());

        return  reclamo;
    }

    public Reclamo actualizarEstado(Integer idReclamo, String nuevoEstado){
        Optional<Reclamo>reclamoParaActualizar = reclamoRepository.findById(idReclamo);
        reclamoParaActualizar.orElse(null).actualizarEstado(nuevoEstado);
        reclamoRepository.save(reclamoParaActualizar.orElse(null));

        return reclamoParaActualizar.orElse(null);
    }

    public Reclamo asignarPersonalMunicipal(Integer idReclamo, PersonalMunicipal personalMunicipal){
        Optional<Reclamo>reclamoParaActualizar = reclamoRepository.findById(idReclamo);
        reclamoParaActualizar.orElse(null).asignarPersonalMunicipal(personalMunicipal);
        reclamoRepository.save(reclamoParaActualizar.orElse(null));
        return reclamoParaActualizar.orElse(null);
    }
}

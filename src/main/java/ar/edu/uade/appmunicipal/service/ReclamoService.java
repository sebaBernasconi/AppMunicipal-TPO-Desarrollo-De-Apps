package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.*;
import ar.edu.uade.appmunicipal.model.DTOs.ReclamoDTO;
import ar.edu.uade.appmunicipal.repository.PersonalMunicipalRepository;
import ar.edu.uade.appmunicipal.repository.ReclamoRepository;
import ar.edu.uade.appmunicipal.repository.SitioRepository;
import ar.edu.uade.appmunicipal.repository.VecinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    SitioService sitioService;

    @Autowired
    private DesperfectoService desperfectoService;

    public List<Reclamo>listarReclamos(){
        return reclamoRepository.findAll();
    }

    public Reclamo buscarReclamo(int idReclamo){
        Optional<Reclamo>reclamo = reclamoRepository.findById(idReclamo);
        return reclamo.orElse(null);
    }

    public Reclamo guardarReclamo(ReclamoDTO reclamoDTO, MultipartFile archivo) throws Exception {
        Optional<Vecino> vecinoOptional = vecinoRepository.findById(reclamoDTO.getIdVecino());
        Optional<PersonalMunicipal> personalMunicipalOptional =
                personalMunicipalRepository.findById(reclamoDTO.getIdPersonalMunicipal());

        if (vecinoOptional.isEmpty()) {
            throw new Exception("No se encontro un vecino con ese DNI");
        }

        if (personalMunicipalOptional.isEmpty()) {
            throw new Exception("No se encontro un empleado municipal con ese DNI");
        }

        if (archivo.isEmpty()) {
            throw new Exception("No hay imagen asociada con el reclamo");
        }

        byte[] imagenReclamo = archivo.getBytes();

        Sitio nuevoSitio = sitioService.guardarSitio(reclamoDTO.getSitio());
        Desperfecto nuevoDesperfecto = desperfectoService.guardarDesperfecto(reclamoDTO.getDesperfecto());

        Reclamo reclamo = new Reclamo();

        reclamo.setVecino(vecinoOptional.get());
        reclamo.setPersonalMunicipal(personalMunicipalOptional.get());
        reclamo.setSitio(nuevoSitio);
        reclamo.setDesperfecto(nuevoDesperfecto);
        reclamo.setDescripcion(reclamoDTO.getDescripcion());
        reclamo.setEstado(reclamoDTO.getEstado());
        reclamo.setImagenReclamo(imagenReclamo);

        return reclamoRepository.save(reclamo);
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

package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.*;
import ar.edu.uade.appmunicipal.model.DTOs.ReclamoDTO;
import ar.edu.uade.appmunicipal.repository.PersonalMunicipalRepository;
import ar.edu.uade.appmunicipal.repository.ReclamoRepository;
import ar.edu.uade.appmunicipal.repository.VecinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReclamoService {

    @Autowired
    ReclamoRepository reclamoRepository;

    @Autowired
    VecinoRepository vecinoRepository;

    @Autowired
    SitioService sitioService;

    @Autowired
    private DesperfectoService desperfectoService;

    @Autowired
    private PersonalMunicipalService personalMunicipalService;

    public List<Reclamo>listarReclamos(){
        return reclamoRepository.findAll();
    }

    public Reclamo buscarReclamo(int idReclamo){
        Optional<Reclamo>reclamo = reclamoRepository.findById(idReclamo);
        return reclamo.orElse(null);
    }

    public Reclamo guardarReclamo(ReclamoDTO reclamoDTO, MultipartFile archivo) throws Exception {
        Optional<Vecino> vecinoOptional = vecinoRepository.findById(reclamoDTO.getIdVecino());

        if (archivo.isEmpty()) {
            throw new Exception("No hay imagen asociada con el reclamo");
        }

        byte[] imagenReclamo = archivo.getBytes();

        Sitio nuevoSitio = sitioService.guardarSitio(reclamoDTO.getSitio());
        Desperfecto nuevoDesperfecto = desperfectoService.guardarDesperfecto(reclamoDTO.getDesperfecto());

        Reclamo reclamo = new Reclamo();

        reclamo.setVecino(vecinoOptional.orElse(null));
        reclamo.setSitio(nuevoSitio);
        reclamo.setDesperfecto(nuevoDesperfecto);
        reclamo.setDescripcion(reclamoDTO.getDescripcion());
        reclamo.setEstado("Pendiente");
        reclamo.setImagenReclamo(imagenReclamo);

        return reclamoRepository.save(reclamo);
    }

    public Reclamo actualizarEstado(Integer idReclamo, String nuevoEstado){
        Optional<Reclamo>reclamoParaActualizar = reclamoRepository.findById(idReclamo);
        reclamoParaActualizar.orElse(null).setEstado(nuevoEstado);
        reclamoRepository.save(reclamoParaActualizar.orElse(null));

        return reclamoParaActualizar.orElse(null);
    }

    public Reclamo actualizarMovimientos(Integer idReclamo, MovimientoReclamo movimientoReclamo){
        Optional<Reclamo>reclamoOptional = reclamoRepository.findById(idReclamo);
        List<MovimientoReclamo>movimientosDelReclamo = reclamoOptional.orElse(null).getMovimientosDelReclamo();
        movimientosDelReclamo.add(movimientoReclamo);
        return reclamoRepository.save(reclamoOptional.orElse(null));
    }

    public Reclamo asignarPersonalMunicipal(Integer idReclamo, PersonalMunicipal personalMunicipal){
        Optional<Reclamo>reclamoParaActualizar = reclamoRepository.findById(idReclamo);
        reclamoParaActualizar.orElse(null).setPersonalMunicipal(personalMunicipal);
        reclamoRepository.save(reclamoParaActualizar.orElse(null));
        return reclamoParaActualizar.orElse(null);
    }

    public List<Reclamo>obtenerReclamosDeUnVecino(Integer dni){
        Optional<Vecino> vecinoOptional = vecinoRepository.findById(dni);
        if (vecinoOptional.isPresent()){
            List<Reclamo>reclamosDelVecino = reclamoRepository.findAllByVecino(vecinoOptional.get());
            return reclamosDelVecino;
        }else {
            return null;
        }

    }

    public List<Reclamo>obtenerReclamosPorRubro(Integer idRubro){
        List<Reclamo>reclamos = reclamoRepository.findAll();

        List<Reclamo>reclamosDelRubro = new ArrayList<>();

        for (Reclamo r :
                 reclamos) {
            if (r.getDesperfecto().getRubro().getIdRubro() == idRubro){
                reclamosDelRubro.add(r);
            }
        }

        return reclamosDelRubro;
    }
}

package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.DTOs.MovimientoReclamoDTO;
import ar.edu.uade.appmunicipal.model.MovimientoReclamo;
import ar.edu.uade.appmunicipal.model.PersonalMunicipal;
import ar.edu.uade.appmunicipal.model.Reclamo;
import ar.edu.uade.appmunicipal.repository.MovimientoReclamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoReclamoService {

    @Autowired
    MovimientoReclamoRepository movimientoReclamoRepository;

    @Autowired
    PersonalMunicipalService personalMunicipalService;

    @Autowired
    ReclamoService reclamoService;

    public List<MovimientoReclamo>listarMovimientosEnTodosLosReclamos(){
        return movimientoReclamoRepository.findAll();
    }
  /*
    public List<MovimientoReclamo>listarMovimientosEnReclamosPorEmpleadoMunicipal(int legajo){
        return movimientoReclamoRepository.findMovimientoReclamoByPersonalMunicipal(legajo);
    }

    public List<MovimientoReclamo>listarMovimientosEnReclamosPorReclamo(Reclamo reclamo){
        return movimientoReclamoRepository.findMovimientoReclamoByReclamo(reclamo.getIdReclamo());
    }

    public List<MovimientoReclamo>listarMovimientosEnReclamosPorFechaMovimiento(Date fecha){
        return movimientoReclamoRepository.findMovimientoReclamoByFechaMovimiento(fecha);
    }

    public MovimientoReclamo buscarMovimentoEnUnReclamo(int idMovimiento){
        Optional<MovimientoReclamo>movimientoReclamo = movimientoReclamoRepository.findById(idMovimiento);
        return movimientoReclamo.orElse(null);
    }*/

    public MovimientoReclamo guardarMovmientoReclamo(MovimientoReclamoDTO movimientoReclamoDTO){

        Reclamo reclamoActualizado =
                reclamoService.actualizarEstado(movimientoReclamoDTO.getIdReclamo(),movimientoReclamoDTO.getNuevoEstado());

        PersonalMunicipal empleadoMunicipal =
                personalMunicipalService.buscarEmpleadoMunicipal(movimientoReclamoDTO.getLegajoPersonalMunicipal());

        MovimientoReclamo movimientoReclamo = new MovimientoReclamo();
        movimientoReclamo.setReclamo(reclamoActualizado);
        movimientoReclamo.setPersonalMunicipal(empleadoMunicipal);
        movimientoReclamo.setCausa(movimientoReclamoDTO.getCausa());
        movimientoReclamo.setFechaMovimiento(Date.valueOf(LocalDate.now()));

        reclamoActualizado = reclamoService.actualizarMovmientos(movimientoReclamoDTO.getIdReclamo(),movimientoReclamo);

        movimientoReclamo.setReclamo(reclamoActualizado);

        return movimientoReclamoRepository.save(movimientoReclamo);
    }
}

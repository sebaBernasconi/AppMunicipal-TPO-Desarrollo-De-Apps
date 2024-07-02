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
import java.util.ArrayList;
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

    public List<MovimientoReclamo>listarMovimientosDeUnReclamo(Integer idReclamo){
        List<MovimientoReclamo> todosLosMovmientos = movimientoReclamoRepository.findAll();
        List<MovimientoReclamo> movimientosDelReclamo = new ArrayList<>();

        for (MovimientoReclamo m :
                todosLosMovmientos) {
            if (m.getReclamo().getIdReclamo() == idReclamo) {
                movimientosDelReclamo.add(m);
            }
        }
        return movimientosDelReclamo;
    }

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

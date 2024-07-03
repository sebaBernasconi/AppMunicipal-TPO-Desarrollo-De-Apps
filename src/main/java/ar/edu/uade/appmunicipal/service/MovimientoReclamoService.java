package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.*;
import ar.edu.uade.appmunicipal.model.DTOs.MovimientoReclamoDTO;
import ar.edu.uade.appmunicipal.repository.MovimientoReclamoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class MovimientoReclamoService {

    @Autowired
    MovimientoReclamoRepository movimientoReclamoRepository;

    @Autowired
    PersonalMunicipalService personalMunicipalService;

    @Autowired
    ReclamoService reclamoService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    SitioService sitioService;

    public List<MovimientoReclamo>listarMovimientosDeUnReclamo(Integer idReclamo){
        Reclamo reclamo = this.reclamoService.buscarReclamo(idReclamo);
        if (reclamo.getMovimientosDelReclamo() != null) {
            return reclamo.getMovimientosDelReclamo();
        }
        return null;
    }

    public MovimientoReclamo guardarMovimientoReclamo(MovimientoReclamoDTO movimientoReclamoDTO){
        // actualizamos el estado del reclamo
        this.reclamoService.actualizarEstado(movimientoReclamoDTO.getIdReclamo(),movimientoReclamoDTO.getNuevoEstado());

        PersonalMunicipal empleadoMunicipal =
                personalMunicipalService.buscarEmpleadoMunicipal(movimientoReclamoDTO.getLegajoPersonalMunicipal());

        // Actualizamos el personal municipal del reclamo
        Reclamo reclamoActualizado = reclamoService.asignarPersonalMunicipal(movimientoReclamoDTO.getIdReclamo(),
                                                                            empleadoMunicipal);

        // Actualizamos el personal municipal del sitio
        Sitio sitio = this.sitioService.buscarSitio(reclamoActualizado.getSitio().getIdSitio());
        sitio.setPersonalMunicipal(empleadoMunicipal);
        this.sitioService.guardarSitio(sitio);

        MovimientoReclamo movimientoReclamo = new MovimientoReclamo();
        movimientoReclamo.setPersonalMunicipal(empleadoMunicipal);
        movimientoReclamo.setCausa(movimientoReclamoDTO.getCausa());
        movimientoReclamo.setFechaMovimiento(Date.valueOf(LocalDate.now()));
        movimientoReclamo.setReclamo(reclamoActualizado);

        Usuario usr = usuarioService.getUsuario(String.valueOf(reclamoActualizado.getVecino().getDni()));
        usuarioService.actualizarCambiosEnReclamoUsuario(usr);


        return movimientoReclamoRepository.save(movimientoReclamo);
    }

}

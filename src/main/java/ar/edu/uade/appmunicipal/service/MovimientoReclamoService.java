package ar.edu.uade.appmunicipal.service;

import ar.edu.uade.appmunicipal.model.MovimientoReclamo;
import ar.edu.uade.appmunicipal.model.Reclamo;
import ar.edu.uade.appmunicipal.repository.MovimientoReclamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoReclamoService {

    @Autowired
    MovimientoReclamoRepository movimientoReclamoRepository;

    public List<MovimientoReclamo>listarMovimientosEnTodosLosReclamos(){
        return movimientoReclamoRepository.findAll();
    }

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
    }

    public MovimientoReclamo guardarMovmientoReclamo(MovimientoReclamo movimientoReclamo){
        return movimientoReclamoRepository.save(movimientoReclamo);
    }
}

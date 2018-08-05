package com.ant.bsm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.TransportUnit;
import com.ant.bsm.repository.TransportUnitRepository;
import com.ant.bsm.web.rest.errors.BadRequestAlertException;
import com.ant.bsm.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TransportUnit.
 */
@RestController
@RequestMapping("/api")
public class TransportUnitResource {

    private final Logger log = LoggerFactory.getLogger(TransportUnitResource.class);

    private static final String ENTITY_NAME = "transportUnit";

    private final TransportUnitRepository transportUnitRepository;

    public TransportUnitResource(TransportUnitRepository transportUnitRepository) {
        this.transportUnitRepository = transportUnitRepository;
    }

    /**
     * POST  /transport-units : Create a new transportUnit.
     *
     * @param transportUnit the transportUnit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportUnit, or with status 400 (Bad Request) if the transportUnit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transport-units")
    @Timed
    public ResponseEntity<TransportUnit> createTransportUnit(@RequestBody TransportUnit transportUnit) throws URISyntaxException {
        log.debug("REST request to save TransportUnit : {}", transportUnit);
        if (transportUnit.getId() != null) {
            throw new BadRequestAlertException("A new transportUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportUnit result = transportUnitRepository.save(transportUnit);
        return ResponseEntity.created(new URI("/api/transport-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transport-units : Updates an existing transportUnit.
     *
     * @param transportUnit the transportUnit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportUnit,
     * or with status 400 (Bad Request) if the transportUnit is not valid,
     * or with status 500 (Internal Server Error) if the transportUnit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transport-units")
    @Timed
    public ResponseEntity<TransportUnit> updateTransportUnit(@RequestBody TransportUnit transportUnit) throws URISyntaxException {
        log.debug("REST request to update TransportUnit : {}", transportUnit);
        if (transportUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportUnit result = transportUnitRepository.save(transportUnit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportUnit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transport-units : get all the transportUnits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportUnits in body
     */
    @GetMapping("/transport-units")
    @Timed
    public List<TransportUnit> getAllTransportUnits() {
        log.debug("REST request to get all TransportUnits");
        return transportUnitRepository.findAll();
    }

    /**
     * GET  /transport-units/:id : get the "id" transportUnit.
     *
     * @param id the id of the transportUnit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportUnit, or with status 404 (Not Found)
     */
    @GetMapping("/transport-units/{id}")
    @Timed
    public ResponseEntity<TransportUnit> getTransportUnit(@PathVariable Long id) {
        log.debug("REST request to get TransportUnit : {}", id);
        Optional<TransportUnit> transportUnit = transportUnitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transportUnit);
    }

    /**
     * DELETE  /transport-units/:id : delete the "id" transportUnit.
     *
     * @param id the id of the transportUnit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transport-units/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportUnit(@PathVariable Long id) {
        log.debug("REST request to delete TransportUnit : {}", id);

        transportUnitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

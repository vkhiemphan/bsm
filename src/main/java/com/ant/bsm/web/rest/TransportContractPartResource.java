package com.ant.bsm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.TransportContractPart;
import com.ant.bsm.repository.TransportContractPartRepository;
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
 * REST controller for managing TransportContractPart.
 */
@RestController
@RequestMapping("/api")
public class TransportContractPartResource {

    private final Logger log = LoggerFactory.getLogger(TransportContractPartResource.class);

    private static final String ENTITY_NAME = "transportContractPart";

    private final TransportContractPartRepository transportContractPartRepository;

    public TransportContractPartResource(TransportContractPartRepository transportContractPartRepository) {
        this.transportContractPartRepository = transportContractPartRepository;
    }

    /**
     * POST  /transport-contract-parts : Create a new transportContractPart.
     *
     * @param transportContractPart the transportContractPart to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportContractPart, or with status 400 (Bad Request) if the transportContractPart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transport-contract-parts")
    @Timed
    public ResponseEntity<TransportContractPart> createTransportContractPart(@RequestBody TransportContractPart transportContractPart) throws URISyntaxException {
        log.debug("REST request to save TransportContractPart : {}", transportContractPart);
        if (transportContractPart.getId() != null) {
            throw new BadRequestAlertException("A new transportContractPart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportContractPart result = transportContractPartRepository.save(transportContractPart);
        return ResponseEntity.created(new URI("/api/transport-contract-parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transport-contract-parts : Updates an existing transportContractPart.
     *
     * @param transportContractPart the transportContractPart to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportContractPart,
     * or with status 400 (Bad Request) if the transportContractPart is not valid,
     * or with status 500 (Internal Server Error) if the transportContractPart couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transport-contract-parts")
    @Timed
    public ResponseEntity<TransportContractPart> updateTransportContractPart(@RequestBody TransportContractPart transportContractPart) throws URISyntaxException {
        log.debug("REST request to update TransportContractPart : {}", transportContractPart);
        if (transportContractPart.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportContractPart result = transportContractPartRepository.save(transportContractPart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportContractPart.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transport-contract-parts : get all the transportContractParts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportContractParts in body
     */
    @GetMapping("/transport-contract-parts")
    @Timed
    public List<TransportContractPart> getAllTransportContractParts() {
        log.debug("REST request to get all TransportContractParts");
        return transportContractPartRepository.findAll();
    }

    /**
     * GET  /transport-contract-parts/:id : get the "id" transportContractPart.
     *
     * @param id the id of the transportContractPart to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportContractPart, or with status 404 (Not Found)
     */
    @GetMapping("/transport-contract-parts/{id}")
    @Timed
    public ResponseEntity<TransportContractPart> getTransportContractPart(@PathVariable Long id) {
        log.debug("REST request to get TransportContractPart : {}", id);
        Optional<TransportContractPart> transportContractPart = transportContractPartRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transportContractPart);
    }

    /**
     * DELETE  /transport-contract-parts/:id : delete the "id" transportContractPart.
     *
     * @param id the id of the transportContractPart to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transport-contract-parts/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportContractPart(@PathVariable Long id) {
        log.debug("REST request to delete TransportContractPart : {}", id);

        transportContractPartRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

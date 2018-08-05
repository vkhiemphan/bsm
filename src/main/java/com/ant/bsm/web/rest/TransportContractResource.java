package com.ant.bsm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.TransportContract;
import com.ant.bsm.repository.TransportContractRepository;
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
 * REST controller for managing TransportContract.
 */
@RestController
@RequestMapping("/api")
public class TransportContractResource {

    private final Logger log = LoggerFactory.getLogger(TransportContractResource.class);

    private static final String ENTITY_NAME = "transportContract";

    private final TransportContractRepository transportContractRepository;

    public TransportContractResource(TransportContractRepository transportContractRepository) {
        this.transportContractRepository = transportContractRepository;
    }

    /**
     * POST  /transport-contracts : Create a new transportContract.
     *
     * @param transportContract the transportContract to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportContract, or with status 400 (Bad Request) if the transportContract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transport-contracts")
    @Timed
    public ResponseEntity<TransportContract> createTransportContract(@RequestBody TransportContract transportContract) throws URISyntaxException {
        log.debug("REST request to save TransportContract : {}", transportContract);
        if (transportContract.getId() != null) {
            throw new BadRequestAlertException("A new transportContract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportContract result = transportContractRepository.save(transportContract);
        return ResponseEntity.created(new URI("/api/transport-contracts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transport-contracts : Updates an existing transportContract.
     *
     * @param transportContract the transportContract to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportContract,
     * or with status 400 (Bad Request) if the transportContract is not valid,
     * or with status 500 (Internal Server Error) if the transportContract couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transport-contracts")
    @Timed
    public ResponseEntity<TransportContract> updateTransportContract(@RequestBody TransportContract transportContract) throws URISyntaxException {
        log.debug("REST request to update TransportContract : {}", transportContract);
        if (transportContract.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportContract result = transportContractRepository.save(transportContract);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportContract.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transport-contracts : get all the transportContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportContracts in body
     */
    @GetMapping("/transport-contracts")
    @Timed
    public List<TransportContract> getAllTransportContracts() {
        log.debug("REST request to get all TransportContracts");
        return transportContractRepository.findAll();
    }

    /**
     * GET  /transport-contracts/:id : get the "id" transportContract.
     *
     * @param id the id of the transportContract to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportContract, or with status 404 (Not Found)
     */
    @GetMapping("/transport-contracts/{id}")
    @Timed
    public ResponseEntity<TransportContract> getTransportContract(@PathVariable Long id) {
        log.debug("REST request to get TransportContract : {}", id);
        Optional<TransportContract> transportContract = transportContractRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transportContract);
    }

    /**
     * DELETE  /transport-contracts/:id : delete the "id" transportContract.
     *
     * @param id the id of the transportContract to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transport-contracts/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportContract(@PathVariable Long id) {
        log.debug("REST request to delete TransportContract : {}", id);

        transportContractRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

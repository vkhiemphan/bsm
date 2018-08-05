package com.ant.bsm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.TransportHistory;
import com.ant.bsm.repository.TransportHistoryRepository;
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
 * REST controller for managing TransportHistory.
 */
@RestController
@RequestMapping("/api")
public class TransportHistoryResource {

    private final Logger log = LoggerFactory.getLogger(TransportHistoryResource.class);

    private static final String ENTITY_NAME = "transportHistory";

    private final TransportHistoryRepository transportHistoryRepository;

    public TransportHistoryResource(TransportHistoryRepository transportHistoryRepository) {
        this.transportHistoryRepository = transportHistoryRepository;
    }

    /**
     * POST  /transport-histories : Create a new transportHistory.
     *
     * @param transportHistory the transportHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportHistory, or with status 400 (Bad Request) if the transportHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transport-histories")
    @Timed
    public ResponseEntity<TransportHistory> createTransportHistory(@RequestBody TransportHistory transportHistory) throws URISyntaxException {
        log.debug("REST request to save TransportHistory : {}", transportHistory);
        if (transportHistory.getId() != null) {
            throw new BadRequestAlertException("A new transportHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportHistory result = transportHistoryRepository.save(transportHistory);
        return ResponseEntity.created(new URI("/api/transport-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transport-histories : Updates an existing transportHistory.
     *
     * @param transportHistory the transportHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportHistory,
     * or with status 400 (Bad Request) if the transportHistory is not valid,
     * or with status 500 (Internal Server Error) if the transportHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transport-histories")
    @Timed
    public ResponseEntity<TransportHistory> updateTransportHistory(@RequestBody TransportHistory transportHistory) throws URISyntaxException {
        log.debug("REST request to update TransportHistory : {}", transportHistory);
        if (transportHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportHistory result = transportHistoryRepository.save(transportHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transport-histories : get all the transportHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportHistories in body
     */
    @GetMapping("/transport-histories")
    @Timed
    public List<TransportHistory> getAllTransportHistories() {
        log.debug("REST request to get all TransportHistories");
        return transportHistoryRepository.findAll();
    }

    /**
     * GET  /transport-histories/:id : get the "id" transportHistory.
     *
     * @param id the id of the transportHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportHistory, or with status 404 (Not Found)
     */
    @GetMapping("/transport-histories/{id}")
    @Timed
    public ResponseEntity<TransportHistory> getTransportHistory(@PathVariable Long id) {
        log.debug("REST request to get TransportHistory : {}", id);
        Optional<TransportHistory> transportHistory = transportHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transportHistory);
    }

    /**
     * DELETE  /transport-histories/:id : delete the "id" transportHistory.
     *
     * @param id the id of the transportHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transport-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportHistory(@PathVariable Long id) {
        log.debug("REST request to delete TransportHistory : {}", id);

        transportHistoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

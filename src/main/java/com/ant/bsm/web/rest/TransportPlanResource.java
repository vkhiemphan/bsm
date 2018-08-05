package com.ant.bsm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.TransportPlan;
import com.ant.bsm.repository.TransportPlanRepository;
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
 * REST controller for managing TransportPlan.
 */
@RestController
@RequestMapping("/api")
public class TransportPlanResource {

    private final Logger log = LoggerFactory.getLogger(TransportPlanResource.class);

    private static final String ENTITY_NAME = "transportPlan";

    private final TransportPlanRepository transportPlanRepository;

    public TransportPlanResource(TransportPlanRepository transportPlanRepository) {
        this.transportPlanRepository = transportPlanRepository;
    }

    /**
     * POST  /transport-plans : Create a new transportPlan.
     *
     * @param transportPlan the transportPlan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportPlan, or with status 400 (Bad Request) if the transportPlan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transport-plans")
    @Timed
    public ResponseEntity<TransportPlan> createTransportPlan(@RequestBody TransportPlan transportPlan) throws URISyntaxException {
        log.debug("REST request to save TransportPlan : {}", transportPlan);
        if (transportPlan.getId() != null) {
            throw new BadRequestAlertException("A new transportPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportPlan result = transportPlanRepository.save(transportPlan);
        return ResponseEntity.created(new URI("/api/transport-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transport-plans : Updates an existing transportPlan.
     *
     * @param transportPlan the transportPlan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportPlan,
     * or with status 400 (Bad Request) if the transportPlan is not valid,
     * or with status 500 (Internal Server Error) if the transportPlan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transport-plans")
    @Timed
    public ResponseEntity<TransportPlan> updateTransportPlan(@RequestBody TransportPlan transportPlan) throws URISyntaxException {
        log.debug("REST request to update TransportPlan : {}", transportPlan);
        if (transportPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportPlan result = transportPlanRepository.save(transportPlan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportPlan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transport-plans : get all the transportPlans.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transportPlans in body
     */
    @GetMapping("/transport-plans")
    @Timed
    public List<TransportPlan> getAllTransportPlans() {
        log.debug("REST request to get all TransportPlans");
        return transportPlanRepository.findAll();
    }

    /**
     * GET  /transport-plans/:id : get the "id" transportPlan.
     *
     * @param id the id of the transportPlan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportPlan, or with status 404 (Not Found)
     */
    @GetMapping("/transport-plans/{id}")
    @Timed
    public ResponseEntity<TransportPlan> getTransportPlan(@PathVariable Long id) {
        log.debug("REST request to get TransportPlan : {}", id);
        Optional<TransportPlan> transportPlan = transportPlanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transportPlan);
    }

    /**
     * DELETE  /transport-plans/:id : delete the "id" transportPlan.
     *
     * @param id the id of the transportPlan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transport-plans/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportPlan(@PathVariable Long id) {
        log.debug("REST request to delete TransportPlan : {}", id);

        transportPlanRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

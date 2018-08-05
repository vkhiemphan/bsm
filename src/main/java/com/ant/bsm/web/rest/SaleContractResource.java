package com.ant.bsm.web.rest;

import com.ant.bsm.domain.SaleContract;
import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.repository.SaleContractRepository;
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
 * REST controller for managing SaleContract.
 */
@RestController
@RequestMapping("/api")
public class SaleContractResource {

    private final Logger log = LoggerFactory.getLogger(SaleContractResource.class);

    private static final String ENTITY_NAME = "saleContract";

    private final SaleContractRepository saleContractRepository;

    public SaleContractResource(SaleContractRepository saleContractRepository) {
        this.saleContractRepository = saleContractRepository;
    }

    /**
     * POST  /sale-contracts : Create a new saleContract.
     *
     * @param saleContract the saleContract to create
     * @return the ResponseEntity with status 201 (Created) and with body the new saleContract, or with status 400 (Bad Request) if the saleContract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sale-contracts")
    @Timed
    public ResponseEntity<SaleContract> createSaleContract(@RequestBody SaleContract saleContract) throws URISyntaxException {
        log.debug("REST request to save SaleContract : {}", saleContract);
        if (saleContract.getId() != null) {
            throw new BadRequestAlertException("A new saleContract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SaleContract result = saleContractRepository.save(saleContract);
        return ResponseEntity.created(new URI("/api/sale-contracts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sale-contracts : Updates an existing saleContract.
     *
     * @param saleContract the saleContract to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated saleContract,
     * or with status 400 (Bad Request) if the saleContract is not valid,
     * or with status 500 (Internal Server Error) if the saleContract couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sale-contracts")
    @Timed
    public ResponseEntity<SaleContract> updateSaleContract(@RequestBody SaleContract saleContract) throws URISyntaxException {
        log.debug("REST request to update SaleContract : {}", saleContract);
        if (saleContract.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SaleContract result = saleContractRepository.save(saleContract);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, saleContract.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sale-contracts : get all the saleContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of saleContracts in body
     */
    @GetMapping("/sale-contracts")
    @Timed
    public List<SaleContract> getAllSaleContracts() {
        log.debug("REST request to get all SaleContracts");
        return saleContractRepository.findAll();
    }

    /**
     * GET  /sale-contracts/:id : get the "id" saleContract.
     *
     * @param id the id of the saleContract to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the saleContract, or with status 404 (Not Found)
     */
    @GetMapping("/sale-contracts/{id}")
    @Timed
    public ResponseEntity<SaleContract> getSaleContract(@PathVariable Long id) {
        log.debug("REST request to get SaleContract : {}", id);
        Optional<SaleContract> saleContract = saleContractRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(saleContract);
    }

    /**
     * DELETE  /sale-contracts/:id : delete the "id" saleContract.
     *
     * @param id the id of the saleContract to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sale-contracts/{id}")
    @Timed
    public ResponseEntity<Void> deleteSaleContract(@PathVariable Long id) {
        log.debug("REST request to delete SaleContract : {}", id);

        saleContractRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

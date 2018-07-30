package com.ant.bsm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.SaleContact;
import com.ant.bsm.repository.SaleContactRepository;
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
 * REST controller for managing SaleContact.
 */
@RestController
@RequestMapping("/api")
public class SaleContactResource {

    private final Logger log = LoggerFactory.getLogger(SaleContactResource.class);

    private static final String ENTITY_NAME = "saleContact";

    private final SaleContactRepository saleContactRepository;

    public SaleContactResource(SaleContactRepository saleContactRepository) {
        this.saleContactRepository = saleContactRepository;
    }

    /**
     * POST  /sale-contacts : Create a new saleContact.
     *
     * @param saleContact the saleContact to create
     * @return the ResponseEntity with status 201 (Created) and with body the new saleContact, or with status 400 (Bad Request) if the saleContact has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sale-contacts")
    @Timed
    public ResponseEntity<SaleContact> createSaleContact(@RequestBody SaleContact saleContact) throws URISyntaxException {
        log.debug("REST request to save SaleContact : {}", saleContact);
        if (saleContact.getId() != null) {
            throw new BadRequestAlertException("A new saleContact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SaleContact result = saleContactRepository.save(saleContact);
        return ResponseEntity.created(new URI("/api/sale-contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sale-contacts : Updates an existing saleContact.
     *
     * @param saleContact the saleContact to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated saleContact,
     * or with status 400 (Bad Request) if the saleContact is not valid,
     * or with status 500 (Internal Server Error) if the saleContact couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sale-contacts")
    @Timed
    public ResponseEntity<SaleContact> updateSaleContact(@RequestBody SaleContact saleContact) throws URISyntaxException {
        log.debug("REST request to update SaleContact : {}", saleContact);
        if (saleContact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SaleContact result = saleContactRepository.save(saleContact);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, saleContact.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sale-contacts : get all the saleContacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of saleContacts in body
     */
    @GetMapping("/sale-contacts")
    @Timed
    public List<SaleContact> getAllSaleContacts() {
        log.debug("REST request to get all SaleContacts");
        return saleContactRepository.findAll();
    }

    /**
     * GET  /sale-contacts/:id : get the "id" saleContact.
     *
     * @param id the id of the saleContact to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the saleContact, or with status 404 (Not Found)
     */
    @GetMapping("/sale-contacts/{id}")
    @Timed
    public ResponseEntity<SaleContact> getSaleContact(@PathVariable Long id) {
        log.debug("REST request to get SaleContact : {}", id);
        Optional<SaleContact> saleContact = saleContactRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(saleContact);
    }

    /**
     * DELETE  /sale-contacts/:id : delete the "id" saleContact.
     *
     * @param id the id of the saleContact to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sale-contacts/{id}")
    @Timed
    public ResponseEntity<Void> deleteSaleContact(@PathVariable Long id) {
        log.debug("REST request to delete SaleContact : {}", id);

        saleContactRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

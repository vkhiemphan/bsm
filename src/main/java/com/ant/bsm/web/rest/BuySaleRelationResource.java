package com.ant.bsm.web.rest;

import com.ant.bsm.domain.BuyContract;
import com.ant.bsm.domain.SaleContract;
import com.ant.bsm.repository.BuyContractRepository;
import com.ant.bsm.repository.SaleContractRepository;
import com.ant.bsm.web.rest.dto.BuyContractForSaleDTO;
import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.BuySaleRelation;
import com.ant.bsm.repository.BuySaleRelationRepository;
import com.ant.bsm.web.rest.errors.BadRequestAlertException;
import com.ant.bsm.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BuySaleRelation.
 */
@RestController
@RequestMapping("/api")
public class BuySaleRelationResource {

    private final Logger log = LoggerFactory.getLogger(BuySaleRelationResource.class);

    private static final String ENTITY_NAME = "buySaleRelation";

    private final BuySaleRelationRepository buySaleRelationRepository;

    @Autowired
    private SaleContractRepository saleContractRepository;

    @Autowired
    private BuyContractRepository buyContractRepository;

    public BuySaleRelationResource(BuySaleRelationRepository buySaleRelationRepository) {
        this.buySaleRelationRepository = buySaleRelationRepository;
    }

    /**
     * POST  /buy-sale-relations : Create a new buySaleRelation.
     *
     * @param buySaleRelation the buySaleRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new buySaleRelation, or with status 400 (Bad Request) if the buySaleRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/buy-sale-relations")
    @Timed
    public ResponseEntity<BuySaleRelation> createBuySaleRelation(@RequestBody BuySaleRelation buySaleRelation) throws URISyntaxException {
        log.debug("REST request to save BuySaleRelation : {}", buySaleRelation);
        if (buySaleRelation.getId() != null) {
            throw new BadRequestAlertException("A new buySaleRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BuySaleRelation result = buySaleRelationRepository.save(buySaleRelation);
        return ResponseEntity.created(new URI("/api/buy-sale-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/buy-sale-relations/save-selected-good-resources/{saleId}")
    @Timed
    public List<BuySaleRelation> createBuySaleRelations(@PathVariable Long saleId, @RequestBody List<BuyContractForSaleDTO> buyContractsForSale) throws URISyntaxException {
        log.debug("REST request to save BuySaleRelation for: {}", saleId);

        List<BuySaleRelation> buySaleRelations = buySaleRelationRepository.findAllBySaleContractId(saleId);
        List<BuySaleRelation> result = new ArrayList<>();

        if(buyContractsForSale != null && !buyContractsForSale.isEmpty()) {
            Long totalSale = 0L;
            for (BuyContractForSaleDTO bcfs: buyContractsForSale) {
                if((buyContractRepository.findById(bcfs.getId()).get().getAmount() - buySaleRelationRepository.sumAmountByBuyContract(bcfs.getId(), saleId)) < bcfs.getAmountSaleInContract()) {
                    return null;
                }
                totalSale += bcfs.getAmountSaleInContract();
            }
            if(saleContractRepository.findById(saleId).get().getAmount() >= totalSale) {
                for (BuyContractForSaleDTO bcfs: buyContractsForSale) {
                    BuySaleRelation bsr = new BuySaleRelation();
                    bsr.setAmount(bcfs.getAmountSaleInContract());
                    BuyContract buyContract = new BuyContract();
                    buyContract.setId(bcfs.getId());
                    SaleContract saleContract = new SaleContract();
                    saleContract.setId(saleId);
                    bsr.setBuyContract(buyContract);
                    bsr.setSaleContract(saleContract);
                    buySaleRelationRepository.save(bsr);
                }

                if(buySaleRelations != null && !buySaleRelations.isEmpty()) {
                    for (BuySaleRelation bsr: buySaleRelations) {
                        buySaleRelationRepository.deleteById(bsr.getId());
                    }
                }
                result = buySaleRelationRepository.findAllBySaleContractId(saleId);
            } else {
                return null;
            }
        }
        return result;
    }

    /**
     * PUT  /buy-sale-relations : Updates an existing buySaleRelation.
     *
     * @param buySaleRelation the buySaleRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated buySaleRelation,
     * or with status 400 (Bad Request) if the buySaleRelation is not valid,
     * or with status 500 (Internal Server Error) if the buySaleRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/buy-sale-relations")
    @Timed
    public ResponseEntity<BuySaleRelation> updateBuySaleRelation(@RequestBody BuySaleRelation buySaleRelation) throws URISyntaxException {
        log.debug("REST request to update BuySaleRelation : {}", buySaleRelation);
        if (buySaleRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BuySaleRelation result = buySaleRelationRepository.save(buySaleRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, buySaleRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /buy-sale-relations : get all the buySaleRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of buySaleRelations in body
     */
    @GetMapping("/buy-sale-relations")
    @Timed
    public List<BuySaleRelation> getAllBuySaleRelations() {
        log.debug("REST request to get all BuySaleRelations");
        return buySaleRelationRepository.findAllByOrOrderByBuyContractAsc();
    }

    @GetMapping("/buy-sale-relations/get-all-by-sale-contract/{scId}")
    @Timed
    public List<BuySaleRelation> getAllBuySaleRelationsOfSaleContract(@PathVariable Long scId) {
        log.debug("REST request to get all BuySaleRelations");
        return buySaleRelationRepository.findAllBySaleContractId(scId);
    }

    @GetMapping("/buy-sale-relations/get-all-by-buy-contract/{bcId}")
    @Timed
    public List<BuySaleRelation> getAllBuySaleRelationsOfBuyContract(@PathVariable Long bcId) {
        log.debug("REST request to get all BuySaleRelations");
        return buySaleRelationRepository.findAllByBuyContractId(bcId);
    }

    /**
     * GET  /buy-sale-relations/:id : get the "id" buySaleRelation.
     *
     * @param id the id of the buySaleRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the buySaleRelation, or with status 404 (Not Found)
     */
    @GetMapping("/buy-sale-relations/{id}")
    @Timed
    public ResponseEntity<BuySaleRelation> getBuySaleRelation(@PathVariable Long id) {
        log.debug("REST request to get BuySaleRelation : {}", id);
        Optional<BuySaleRelation> buySaleRelation = buySaleRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(buySaleRelation);
    }

    /**
     * DELETE  /buy-sale-relations/:id : delete the "id" buySaleRelation.
     *
     * @param id the id of the buySaleRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/buy-sale-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteBuySaleRelation(@PathVariable Long id) {
        log.debug("REST request to delete BuySaleRelation : {}", id);

        buySaleRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

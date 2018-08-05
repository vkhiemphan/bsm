package com.ant.bsm.web.rest;

import com.ant.bsm.domain.BuyContract;
import com.ant.bsm.domain.SaleContract;
import com.ant.bsm.repository.BuySaleRelationRepository;
import com.ant.bsm.repository.SaleContractRepository;
import com.ant.bsm.service.BuySaleContractService;
import com.ant.bsm.web.rest.dto.BuyContractForSaleDTO;
import com.ant.bsm.web.rest.dto.BuyContractWithSaleData;
import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.repository.BuyContractRepository;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BuyContract.
 */
@RestController
@RequestMapping("/api")
public class BuyContractResource {

    private final Logger log = LoggerFactory.getLogger(BuyContractResource.class);

    private static final String ENTITY_NAME = "buyContract";

    private final BuyContractRepository buyContractRepository;

    @Autowired
    private SaleContractRepository saleContractRepository;

    @Autowired
    private BuySaleRelationRepository buySaleRelationRepository;

    @Autowired
    private BuySaleContractService buySaleContractService;

    public BuyContractResource(BuyContractRepository buyContractRepository) {
        this.buyContractRepository = buyContractRepository;
    }

    /**
     * POST  /buy-contracts : Create a new buyContract.
     *
     * @param buyContract the buyContract to create
     * @return the ResponseEntity with status 201 (Created) and with body the new buyContract, or with status 400 (Bad Request) if the buyContract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/buy-contracts")
    @Timed
    public ResponseEntity<BuyContract> createBuyContract(@RequestBody BuyContract buyContract) throws URISyntaxException {
        log.debug("REST request to save BuyContract : {}", buyContract);
        if (buyContract.getId() != null) {
            throw new BadRequestAlertException("A new buyContract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BuyContract result = buyContractRepository.save(buyContract);
        return ResponseEntity.created(new URI("/api/buy-contracts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /buy-contracts : Updates an existing buyContract.
     *
     * @param buyContract the buyContract to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated buyContract,
     * or with status 400 (Bad Request) if the buyContract is not valid,
     * or with status 500 (Internal Server Error) if the buyContract couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/buy-contracts")
    @Timed
    public ResponseEntity<BuyContract> updateBuyContract(@RequestBody BuyContract buyContract) throws URISyntaxException {
        log.debug("REST request to update BuyContract : {}", buyContract);
        if (buyContract.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BuyContract result = buyContractRepository.save(buyContract);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, buyContract.getId().toString()))
            .body(result);
    }

    /**
     * GET  /buy-contracts : get all the buyContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of buyContracts in body
     */
    @GetMapping("/buy-contracts")
    @Timed
    public List<BuyContract> getAllBuyContracts() {
        log.debug("REST request to get all BuyContracts");
        return buyContractRepository.findAll();
    }

    @GetMapping("/buy-contracts/get-all-with-sale-data")
    @Timed
    public List<BuyContractWithSaleData> getAllBuyContractsWithSaleData() {
        log.debug("REST request to get all BuyContracts");
        return buySaleContractService.getAllBuyContractWithSaleData();
    }

    @GetMapping("/buy-contracts/for-sale-contract/{scId}")
    @Timed
    public List<BuyContractForSaleDTO> getAllBuyContractsForSaleContract(@PathVariable Long scId) {
        log.debug("REST request to get all BuyContracts");
        Optional<SaleContract> saleContract = saleContractRepository.findById(scId);
        LocalDate deliveryDate = saleContract.get().getDeliveryDate();
        List<BuyContract> list = buyContractRepository.findForSale(deliveryDate);
        List<BuyContractForSaleDTO> result = new ArrayList<>();
        if(list != null && !list.isEmpty()) {
            for (BuyContract buyContract : list) {
                Long amount = buySaleRelationRepository.sumAmountByBuyContract(buyContract.getId(), scId);
                if(amount == null || buyContract.getAmount() > amount) {
                    BuyContractForSaleDTO dto = new BuyContractForSaleDTO(buyContract);
                    dto.setRemainAmount(buyContract.getAmount() - (amount != null? amount: 0));
                    result.add(dto);
                }
            }
        }
        return result;
    }

    /**
     * GET  /buy-contracts/:id : get the "id" buyContract.
     *
     * @param id the id of the buyContract to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the buyContract, or with status 404 (Not Found)
     */
    @GetMapping("/buy-contracts/{id}")
    @Timed
    public ResponseEntity<BuyContract> getBuyContract(@PathVariable Long id) {
        log.debug("REST request to get BuyContract : {}", id);
        Optional<BuyContract> buyContract = buyContractRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(buyContract);
    }

    /**
     * DELETE  /buy-contracts/:id : delete the "id" buyContract.
     *
     * @param id the id of the buyContract to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/buy-contracts/{id}")
    @Timed
    public ResponseEntity<Void> deleteBuyContract(@PathVariable Long id) {
        log.debug("REST request to delete BuyContract : {}", id);

        buyContractRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

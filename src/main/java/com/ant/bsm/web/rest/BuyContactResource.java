package com.ant.bsm.web.rest;

import com.ant.bsm.domain.SaleContact;
import com.ant.bsm.repository.BuySaleRelationRepository;
import com.ant.bsm.repository.SaleContactRepository;
import com.ant.bsm.service.BuySaleContractService;
import com.ant.bsm.web.rest.dto.BuyContactForSaleDTO;
import com.ant.bsm.web.rest.dto.BuyContactWithSaleData;
import com.codahale.metrics.annotation.Timed;
import com.ant.bsm.domain.BuyContact;
import com.ant.bsm.repository.BuyContactRepository;
import com.ant.bsm.web.rest.errors.BadRequestAlertException;
import com.ant.bsm.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BuyContact.
 */
@RestController
@RequestMapping("/api")
public class BuyContactResource {

    private final Logger log = LoggerFactory.getLogger(BuyContactResource.class);

    private static final String ENTITY_NAME = "buyContact";

    private final BuyContactRepository buyContactRepository;

    @Autowired
    private SaleContactRepository saleContactRepository;

    @Autowired
    private BuySaleRelationRepository buySaleRelationRepository;

    @Autowired
    private BuySaleContractService buySaleContractService;

    public BuyContactResource(BuyContactRepository buyContactRepository) {
        this.buyContactRepository = buyContactRepository;
    }

    /**
     * POST  /buy-contacts : Create a new buyContact.
     *
     * @param buyContact the buyContact to create
     * @return the ResponseEntity with status 201 (Created) and with body the new buyContact, or with status 400 (Bad Request) if the buyContact has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/buy-contacts")
    @Timed
    public ResponseEntity<BuyContact> createBuyContact(@RequestBody BuyContact buyContact) throws URISyntaxException {
        log.debug("REST request to save BuyContact : {}", buyContact);
        if (buyContact.getId() != null) {
            throw new BadRequestAlertException("A new buyContact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BuyContact result = buyContactRepository.save(buyContact);
        return ResponseEntity.created(new URI("/api/buy-contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /buy-contacts : Updates an existing buyContact.
     *
     * @param buyContact the buyContact to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated buyContact,
     * or with status 400 (Bad Request) if the buyContact is not valid,
     * or with status 500 (Internal Server Error) if the buyContact couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/buy-contacts")
    @Timed
    public ResponseEntity<BuyContact> updateBuyContact(@RequestBody BuyContact buyContact) throws URISyntaxException {
        log.debug("REST request to update BuyContact : {}", buyContact);
        if (buyContact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BuyContact result = buyContactRepository.save(buyContact);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, buyContact.getId().toString()))
            .body(result);
    }

    /**
     * GET  /buy-contacts : get all the buyContacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of buyContacts in body
     */
    @GetMapping("/buy-contacts")
    @Timed
    public List<BuyContact> getAllBuyContacts() {
        log.debug("REST request to get all BuyContacts");
        return buyContactRepository.findAll();
    }

    @GetMapping("/buy-contacts/get-all-with-sale-data")
    @Timed
    public List<BuyContactWithSaleData> getAllBuyContactsWithSaleData() {
        log.debug("REST request to get all BuyContacts");
        return buySaleContractService.getAllBuyContractWithSaleData();
    }

    @GetMapping("/buy-contacts/for-sale-contact/{scId}")
    @Timed
    public List<BuyContactForSaleDTO> getAllBuyContactsForSaleContact(@PathVariable Long scId) {
        log.debug("REST request to get all BuyContacts");
        Optional<SaleContact> saleContact = saleContactRepository.findById(scId);
        LocalDate deliveryDate = saleContact.get().getDeliveryDate();
        List<BuyContact> list = buyContactRepository.findForSale(deliveryDate);
        List<BuyContactForSaleDTO> result = new ArrayList<>();
        if(list != null && !list.isEmpty()) {
            for (BuyContact buyContact: list) {
                Long amount = buySaleRelationRepository.sumAmountByBuyContact(buyContact.getId(), scId);
                if(amount == null || buyContact.getAmount() > amount) {
                    BuyContactForSaleDTO dto = new BuyContactForSaleDTO(buyContact);
                    dto.setRemainAmount(buyContact.getAmount() - (amount != null? amount: 0));
                    result.add(dto);
                }
            }
        }
        return result;
    }

    /**
     * GET  /buy-contacts/:id : get the "id" buyContact.
     *
     * @param id the id of the buyContact to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the buyContact, or with status 404 (Not Found)
     */
    @GetMapping("/buy-contacts/{id}")
    @Timed
    public ResponseEntity<BuyContact> getBuyContact(@PathVariable Long id) {
        log.debug("REST request to get BuyContact : {}", id);
        Optional<BuyContact> buyContact = buyContactRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(buyContact);
    }

    /**
     * DELETE  /buy-contacts/:id : delete the "id" buyContact.
     *
     * @param id the id of the buyContact to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/buy-contacts/{id}")
    @Timed
    public ResponseEntity<Void> deleteBuyContact(@PathVariable Long id) {
        log.debug("REST request to delete BuyContact : {}", id);

        buyContactRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package com.ant.bsm.web.rest;

import com.ant.bsm.BuySaleManagerApp;

import com.ant.bsm.domain.BuyContact;
import com.ant.bsm.repository.BuyContactRepository;
import com.ant.bsm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.ant.bsm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BuyContactResource REST controller.
 *
 * @see BuyContactResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BuySaleManagerApp.class)
public class BuyContactResourceIntTest {

    private static final String DEFAULT_BUY_CONTACT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_BUY_CONTACT_CODE = "BBBBBBBBBB";

    private static final Long DEFAULT_NUMBER = 1L;
    private static final Long UPDATED_NUMBER = 2L;

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final String DEFAULT_PRICE = "AAAAAAAAAA";
    private static final String UPDATED_PRICE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CONTACT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CONTACT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private BuyContactRepository buyContactRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBuyContactMockMvc;

    private BuyContact buyContact;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BuyContactResource buyContactResource = new BuyContactResource(buyContactRepository);
        this.restBuyContactMockMvc = MockMvcBuilders.standaloneSetup(buyContactResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BuyContact createEntity(EntityManager em) {
        BuyContact buyContact = new BuyContact()
            .buyContactCode(DEFAULT_BUY_CONTACT_CODE)
            .number(DEFAULT_NUMBER)
            .amount(DEFAULT_AMOUNT)
            .price(DEFAULT_PRICE)
            .contactDate(DEFAULT_CONTACT_DATE)
            .note(DEFAULT_NOTE)
            .status(DEFAULT_STATUS);
        return buyContact;
    }

    @Before
    public void initTest() {
        buyContact = createEntity(em);
    }

    @Test
    @Transactional
    public void createBuyContact() throws Exception {
        int databaseSizeBeforeCreate = buyContactRepository.findAll().size();

        // Create the BuyContact
        restBuyContactMockMvc.perform(post("/api/buy-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyContact)))
            .andExpect(status().isCreated());

        // Validate the BuyContact in the database
        List<BuyContact> buyContactList = buyContactRepository.findAll();
        assertThat(buyContactList).hasSize(databaseSizeBeforeCreate + 1);
        BuyContact testBuyContact = buyContactList.get(buyContactList.size() - 1);
        assertThat(testBuyContact.getBuyContactCode()).isEqualTo(DEFAULT_BUY_CONTACT_CODE);
        assertThat(testBuyContact.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testBuyContact.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBuyContact.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testBuyContact.getContactDate()).isEqualTo(DEFAULT_CONTACT_DATE);
        assertThat(testBuyContact.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testBuyContact.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createBuyContactWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = buyContactRepository.findAll().size();

        // Create the BuyContact with an existing ID
        buyContact.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBuyContactMockMvc.perform(post("/api/buy-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyContact)))
            .andExpect(status().isBadRequest());

        // Validate the BuyContact in the database
        List<BuyContact> buyContactList = buyContactRepository.findAll();
        assertThat(buyContactList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBuyContacts() throws Exception {
        // Initialize the database
        buyContactRepository.saveAndFlush(buyContact);

        // Get all the buyContactList
        restBuyContactMockMvc.perform(get("/api/buy-contacts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buyContact.getId().intValue())))
            .andExpect(jsonPath("$.[*].buyContactCode").value(hasItem(DEFAULT_BUY_CONTACT_CODE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.toString())))
            .andExpect(jsonPath("$.[*].contactDate").value(hasItem(DEFAULT_CONTACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getBuyContact() throws Exception {
        // Initialize the database
        buyContactRepository.saveAndFlush(buyContact);

        // Get the buyContact
        restBuyContactMockMvc.perform(get("/api/buy-contacts/{id}", buyContact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(buyContact.getId().intValue()))
            .andExpect(jsonPath("$.buyContactCode").value(DEFAULT_BUY_CONTACT_CODE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.toString()))
            .andExpect(jsonPath("$.contactDate").value(DEFAULT_CONTACT_DATE.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBuyContact() throws Exception {
        // Get the buyContact
        restBuyContactMockMvc.perform(get("/api/buy-contacts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBuyContact() throws Exception {
        // Initialize the database
        buyContactRepository.saveAndFlush(buyContact);

        int databaseSizeBeforeUpdate = buyContactRepository.findAll().size();

        // Update the buyContact
        BuyContact updatedBuyContact = buyContactRepository.findById(buyContact.getId()).get();
        // Disconnect from session so that the updates on updatedBuyContact are not directly saved in db
        em.detach(updatedBuyContact);
        updatedBuyContact
            .buyContactCode(UPDATED_BUY_CONTACT_CODE)
            .number(UPDATED_NUMBER)
            .amount(UPDATED_AMOUNT)
            .price(UPDATED_PRICE)
            .contactDate(UPDATED_CONTACT_DATE)
            .note(UPDATED_NOTE)
            .status(UPDATED_STATUS);

        restBuyContactMockMvc.perform(put("/api/buy-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBuyContact)))
            .andExpect(status().isOk());

        // Validate the BuyContact in the database
        List<BuyContact> buyContactList = buyContactRepository.findAll();
        assertThat(buyContactList).hasSize(databaseSizeBeforeUpdate);
        BuyContact testBuyContact = buyContactList.get(buyContactList.size() - 1);
        assertThat(testBuyContact.getBuyContactCode()).isEqualTo(UPDATED_BUY_CONTACT_CODE);
        assertThat(testBuyContact.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testBuyContact.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBuyContact.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testBuyContact.getContactDate()).isEqualTo(UPDATED_CONTACT_DATE);
        assertThat(testBuyContact.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testBuyContact.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBuyContact() throws Exception {
        int databaseSizeBeforeUpdate = buyContactRepository.findAll().size();

        // Create the BuyContact

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBuyContactMockMvc.perform(put("/api/buy-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buyContact)))
            .andExpect(status().isBadRequest());

        // Validate the BuyContact in the database
        List<BuyContact> buyContactList = buyContactRepository.findAll();
        assertThat(buyContactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBuyContact() throws Exception {
        // Initialize the database
        buyContactRepository.saveAndFlush(buyContact);

        int databaseSizeBeforeDelete = buyContactRepository.findAll().size();

        // Get the buyContact
        restBuyContactMockMvc.perform(delete("/api/buy-contacts/{id}", buyContact.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BuyContact> buyContactList = buyContactRepository.findAll();
        assertThat(buyContactList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BuyContact.class);
        BuyContact buyContact1 = new BuyContact();
        buyContact1.setId(1L);
        BuyContact buyContact2 = new BuyContact();
        buyContact2.setId(buyContact1.getId());
        assertThat(buyContact1).isEqualTo(buyContact2);
        buyContact2.setId(2L);
        assertThat(buyContact1).isNotEqualTo(buyContact2);
        buyContact1.setId(null);
        assertThat(buyContact1).isNotEqualTo(buyContact2);
    }
}
